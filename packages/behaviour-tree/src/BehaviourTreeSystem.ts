import {
  AddedEntity,
  Entity,
  RemovedEntity,
  System,
  SystemType,
} from 'excalibur';
import { BehaviourTree, State } from 'mistreevous';

import { BehaviourTreeComponent } from './BehaviourTreeComponent';
import { BehaviourTreeBlackBoard } from './types';

/**
 * A system to run behaviour trees
 *
 */
export class BehaviourTreeSystem extends System<BehaviourTreeComponent> {
  systemType = SystemType.Update;

  types = ['game.ai.behaviourtree'] as const;

  constructor(
    /**
     * This is where your actions are defined.
     *
     * Actions are wrapped in a proxy that on access - binds the action to the entity.
     */
    public blackboard: BehaviourTreeBlackBoard = {}
  ) {
    super();
  }
  notify(_entityAddedOrRemoved: AddedEntity | RemovedEntity) {
    const { data, type } = _entityAddedOrRemoved;
    if (type === 'Entity Removed') return;
    const behaviour = data.get(BehaviourTreeComponent);
    if (!behaviour) return;

    // create view into the blackboard that is scoped to the entity.
    behaviour.blackboard = new Proxy(this.blackboard, {
      get(target, prop) {
        if (!(prop in target)) return;
        const item = target[prop];
        const output = typeof item === 'function' ? item.bind(data) : item;
        return output;
      },
    });

    // create the tree
    behaviour.tree = new BehaviourTree(
      behaviour.definition,
      behaviour.blackboard
    );
  }
  update(entities: Entity[]) {
    entities.forEach((entity) => {
      const behaviour = entity.get(BehaviourTreeComponent);
      if (!behaviour?.tree) return;
      behaviour.tree.step();
    });
  }
}
