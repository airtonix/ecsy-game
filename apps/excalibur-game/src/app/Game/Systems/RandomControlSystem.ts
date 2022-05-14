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

import { seed } from '../../Core/Game';
import { MovementToTargetComponent } from '../Components';
import { WorldScene } from '../Scenes';

export class RandomControlSystem extends System<
  MovementToTargetComponent | BodyComponent
> {
  systemType: SystemType = SystemType.Update;
  types = ['game.movement.totarget', 'ex.body'] as const;

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

    const movement = entity.get(MovementToTargetComponent);
    const transform = entity.get(TransformComponent);
    const motion = entity.get(MotionComponent);

    if (!transform || !motion || !movement) return;
    const map = this.scene.tileMaps[0];
    const bounds = {
      topleft: vec(0, 0),
      bottomright: vec(map.cellWidth * map.cols, map.cellHeight * map.rows),
    };

    const { target, speed } = movement;
    const started = !!target && target instanceof Vector;
    const start = new Vector(transform.pos.x, transform.pos.y);

    /**
     * 🏃‍♂️has target
     */
    if (started) {
      const distance = (started && start.distance(target)) || Infinity;
      const direction = (started && target.sub(start).normalize()) || 0;
      motion.vel = direction.scale(speed);
      const isComplete =
        new Vector(transform.pos.x, transform.pos.y).distance(start) >=
        distance - 20;

      if (isComplete) {
        motion.vel.setTo(0, 0);
        movement.target = undefined;
      }
    } else if (!movement.target) {
      /**
       * Pick a new destination
       */
      const target = vec(
        seed.integer(bounds.topleft.x, bounds.bottomright.x),
        seed.integer(bounds.topleft.y, bounds.bottomright.y)
      )
        .sub(transform.pos)
        .scale(0.1);

      movement.target = transform.pos.add(target);
    }
  }

  notify() {
    return;
  }
}
