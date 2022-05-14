import { Vector } from 'excalibur';

import { BehaviourTreeComponent } from '@ecsygame/behaviour-tree';

import {
  CharacterRenderMovementComponent,
  MovementToTargetComponent,
  NameComponent,
  NpcTagComponent,
} from '../Components';
import { getRandomHumanAnimation } from '../Resources';

import { BaseActor } from './Actor';

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
  const actor = new BaseActor({
    name: 'npc',
    pos: position,
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
    .addComponent(new MovementToTargetComponent(48))
    .addComponent(
      new BehaviourTreeComponent(`root {
        sequence {
          sequence {
            wait [2000,5000]
            action [PickRandomTarget]
          }
          sequence while(IsMoving) {
            action [MoveToTarget]
          }
        }
      }`)
    );
  return actor;
};
