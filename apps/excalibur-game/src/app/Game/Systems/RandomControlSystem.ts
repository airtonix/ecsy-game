import {
  Actor,
  BodyComponent,
  Entity,
  MotionComponent,
  System,
  SystemType,
  TransformComponent,
  Vector,
  vec,
} from 'excalibur';

import { RandomMovementComponent } from '../Components';
import { WorldScene } from '../Scenes';

export class RandomControlSystem extends System<
  RandomMovementComponent | BodyComponent
> {
  systemType: SystemType = SystemType.Update;
  types = ['game.movement.random', 'ex.body'] as const;

  scene!: WorldScene;
  bounds!: { topleft: Vector; bottomright: Vector };
  initialize(scene: WorldScene) {
    this.scene = scene;
  }

  update(entities: Entity[], delta: number): void {
    for (const entity of entities) {
      this.moveEntity(entity, delta);
    }
  }

  moveEntity(entity: Entity, delta: number) {
    if (!(entity instanceof Actor)) return;

    const movement = entity.get(RandomMovementComponent);
    const transform = entity.get(TransformComponent);
    const motion = entity.get(MotionComponent);

    if (!transform || !motion || !movement) return;
    const map = this.scene.tileMaps[0];
    const bounds = {
      topleft: vec(0, 0),
      bottomright: vec(map.cellWidth * map.cols, map.cellHeight * map.rows),
    };

    const { destination, speed } = movement;
    const started = !!destination && destination instanceof Vector;
    const start = new Vector(transform.pos.x, transform.pos.y);

    /**
     * 🏃‍♂️has destination
     */
    if (started) {
      const distance = (started && start.distance(destination)) || Infinity;
      const direction = (started && destination.sub(start).normalize()) || 0;
      motion.vel = direction.scale(speed);
      const isComplete =
        new Vector(transform.pos.x, transform.pos.y).distance(start) >=
        distance - 20;

      if (isComplete) {
        motion.vel.setTo(0, 0);
        movement.destination = undefined;
        movement.cooldown = Date.now() + this.scene.game.seed.integer(0, 10000);
      }
    } else if (
      !movement.destination &&
      (!movement.cooldown || movement.cooldown < Date.now())
    ) {
      /**
       * Pick a new destination
       */
      const target = vec(
        this.scene.game.seed.integer(bounds.topleft.x, bounds.bottomright.x),
        this.scene.game.seed.integer(bounds.topleft.y, bounds.bottomright.y)
      )
        .sub(transform.pos)
        .scale(0.1);

      movement.destination = transform.pos.add(target);
    }
  }

  notify() {
    return;
  }
}
