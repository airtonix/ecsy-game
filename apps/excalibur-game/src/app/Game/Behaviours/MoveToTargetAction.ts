import { MotionComponent, TransformComponent, Vector, vec } from 'excalibur';
import { State } from 'mistreevous';

import type { BehaviourAction } from '@ecsygame/behaviour-tree';

import { MovementToTargetComponent } from '../Components';

/**
 * Indicates to the Tree that the entity is still moving nor not
 */
export const MoveToTarget: BehaviourAction = (entity, scene, ...args) => {
  const moveTo = entity.get(MovementToTargetComponent);
  const transform = entity.get(TransformComponent);
  const motion = entity.get(MotionComponent);

  if (!transform || !motion || !moveTo?.target) return State.FAILED;

  const start = new Vector(transform.pos.x, transform.pos.y);
  const distance = start.distance(moveTo.target);
  const direction = moveTo.target.sub(start).normalize() || 0;
  motion.vel = direction.scale(moveTo.speed);

  const isComplete =
    new Vector(transform.pos.x, transform.pos.y).distance(start) >=
    distance - 20;

  if (isComplete) {
    motion.vel.setTo(0, 0);
    moveTo.target = undefined;
    return State.SUCCEEDED;
  }
};
