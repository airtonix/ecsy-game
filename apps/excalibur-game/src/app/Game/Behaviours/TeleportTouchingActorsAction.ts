import { State } from 'mistreevous';

import { BehaviourAction } from '@ecsygame/behaviour-tree';

type TeleportTouchingActorsProps = {
  target: string;
};
/**
 * Indicates to the Tree that the entity is still moving nor not
 */
export const TeleportTouchingActors =
  ({ target }: TeleportTouchingActorsProps): BehaviourAction =>
  (entity, scene) => {
    // eslint-disable-next-line no-console
    scene.loadLevel(target.levelIid);
    return State.SUCCEEDED;
  };
