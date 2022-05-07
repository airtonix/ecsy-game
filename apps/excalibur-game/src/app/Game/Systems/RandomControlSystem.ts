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
        movement.cooldown = Date.now() + 2000;
      }
    } else if (
      !movement.destination &&
      (!movement.cooldown || movement.cooldown < Date.now())
    ) {
      const modifier = vec(
        this.scene.game.seed.integer(bounds.topleft.x, bounds.bottomright.x) /
          8,
        this.scene.game.seed.integer(bounds.topleft.y, bounds.bottomright.y) / 8
      );
      const target = modifier.add(transform.pos);

      movement.destination = vec(
        target.x < 0 ? 0 : Math.max(target.x, bounds.bottomright.x),
        target.y < 0 ? 0 : Math.max(target.y, bounds.bottomright.y)
      );
    }
  }

  notify() {
    return;
  }
}
