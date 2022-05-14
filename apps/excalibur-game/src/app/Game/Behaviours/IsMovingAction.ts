import { Entity, Vector } from 'excalibur';

import { MovementToTargetComponent } from '../Components';

/**
 * Indicates to the Tree that the entity is still moving nor not
 */
export function IsMoving(entity: Entity) {
  const movement = entity.get(MovementToTargetComponent);
  return movement?.target && movement.target instanceof Vector;
}
