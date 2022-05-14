import { BehaviourTreeBlackBoard } from '@ecsygame/behaviour-tree';

import { IsMoving } from './IsMovingAction';
import { MoveToTarget } from './MoveToTargetAction';
import { PickRandomTarget } from './PickRandomLocationToMoveToAction';

export const GeneralBehaviourBlackBoard: BehaviourTreeBlackBoard = {
  IsMoving,
  MoveToTarget,
  PickRandomTarget,
};
