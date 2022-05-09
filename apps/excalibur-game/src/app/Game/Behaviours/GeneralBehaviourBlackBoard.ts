import debug from 'debug';
import { State } from 'mistreevous';

import { BehaviourTreeBlackBoard } from '@ecsygame/behaviour-tree';

const log = debug(import.meta.url);

export const GeneralBehaviourBlackBoard: BehaviourTreeBlackBoard = {
  IsWandering(entity) {
    return true;
  },

  Whistle(entity) {
    log(entity, 'whistles');
    return State.SUCCEEDED;
  },
};
