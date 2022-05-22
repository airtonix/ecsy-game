import { BodyComponent } from 'excalibur';
import { State } from 'mistreevous';

import { BehaviourAction } from '@ecsygame/behaviour-tree';

import { TouchableComponent } from '../Components';

/**
 * Indicates to the Tree that the entity is still moving nor not
 */
export const IsBeingTouched: BehaviourAction = (entity, scene) => {
  const touchable = entity.get(TouchableComponent);
  if (!touchable?.touchedBy?.size) return State.FAILED;
  // eslint-disable-next-line no-console
  console.log(touchable.touchedBy.values());
  return State.SUCCEEDED;
};
