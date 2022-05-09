import { Actor, CollisionType, Vector } from 'excalibur';

import { BehaviourTreeComponent } from '@ecsygame/behaviour-tree';

import {
  CharacterRenderMovementComponent,
  NameComponent,
  NpcTagComponent,
  RandomMovementComponent,
} from '../Components';
import { getRandomHumanAnimation } from '../Resources';

/**
 * As more Data Components  are used, join their initialising props here
 */
type NpcEntityProps = ConstructorParameters<typeof NameComponent>['0'] & {
  position: Vector;
};
export const NpcEntity = ({
  position,
  salutation,
  lastName,
}: NpcEntityProps) => {
  const [name, animations] = getRandomHumanAnimation();
  const actor = new Actor({
    name: 'npc',
    pos: position,
    width: 8,
    height: 8,
    collisionType: CollisionType.Active,
  });

  actor
    .addComponent(new NpcTagComponent())
    .addComponent(
      new NameComponent({
        salutation,
        firstName: name,
        lastName,
      })
    )
    .addComponent(
      new CharacterRenderMovementComponent(
        animations.idle_up,
        animations.idle_down,
        animations.idle_left,
        animations.idle_right,
        animations.move_up,
        animations.move_down,
        animations.move_left,
        animations.move_right
      )
    )
    .addComponent(new RandomMovementComponent(64))
    .addComponent(
      new BehaviourTreeComponent(`root {
      sequence while(IsWandering) {
        action [Whistle]
        wait [5000]
      }
    }`)
    );
  return actor;
};
