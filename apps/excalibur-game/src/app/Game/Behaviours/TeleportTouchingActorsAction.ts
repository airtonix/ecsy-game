import { State } from 'mistreevous';

import { BehaviourAction } from '@ecsygame/behaviour-tree';

/**
 * Indicates to the Tree that the entity is still moving nor not
 */
export const TeleportTouchingActors: BehaviourAction = (entity, scene) => {
  return State.SUCCEEDED;
};
