import debug from 'debug';
import { State } from 'mistreevous';

import { BehaviourTreeBlackBoard } from '@ecsygame/behaviour-tree';

import { NameComponent } from '../Components';

const log = debug(import.meta.url);

export const GeneralBehaviourBlackBoard: BehaviourTreeBlackBoard = {
  IsWandering() {
    return true;
  },

  Whistle(entity) {
    const name = entity.get(NameComponent);

    log(entity, name?.firstName, 'whistles');
    return State.SUCCEEDED;
  },
};
