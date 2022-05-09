import { Component } from 'excalibur';
import { BehaviourTree } from 'mistreevous';

import { BehaviourTreeBlackBoard } from './types';

export class BehaviourTreeComponent extends Component<'game.ai.behaviourtree'> {
  readonly type = 'game.ai.behaviourtree';

  /**
   * An instance of a Mistreevous BehaviourTree
   */
  tree?: BehaviourTree;

  /**
   * An object containing state and actions to be used in each tick of the BehaviourTree
   */
  blackboard?: BehaviourTreeBlackBoard;
  constructor(public definition: string) {
    super();
  }
}
