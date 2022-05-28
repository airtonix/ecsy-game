import { Entity, Vector } from 'excalibur';

import { BehaviourCondition } from '@ecsygame/behaviour-tree';

import { MovementToTargetComponent } from '../Components';

/**
 * Indicates to the Tree that the entity is still moving nor not
 */
export const IsMoving: BehaviourCondition = (entity: Entity) => {
  const movement = entity.get(MovementToTargetComponent);
  return !!movement?.target && movement.target instanceof Vector;
};
