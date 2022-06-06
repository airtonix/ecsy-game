import { BehaviourCondition } from '@ecsygame/behaviour-tree';

import { TouchableComponent } from '../Components';

/**
 * Indicates to the Tree that the entity is still moving nor not
 */
export const IsBeingTouched: BehaviourCondition = (entity, scene) => {
  const touchable = entity.get(TouchableComponent);
  return !!touchable?.touchedBy?.size;
};
