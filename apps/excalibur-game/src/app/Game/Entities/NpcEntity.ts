import { Actor, CollisionType, Vector } from 'excalibur';

import { BehaviourTreeComponent } from '@ecsygame/behaviour-tree';

import {
  CharacterRenderMovementComponent,
  NameComponent,
  NpcTagComponent,
  RandomMovementComponent,
} from '../Components';
import {
  JaneCharactorAnimations,
  JohnCharactorAnimations,
  KarenCharactorAnimations,
  KevinCharactorAnimations,
  MarkCharactorAnimations,
  MelCharactorAnimations,
  SallyCharactorAnimations,
  SamCharactorAnimations,
} from '../Resources';

const CHARACTER_ANIMATIONS = [
  JaneCharactorAnimations,
  JohnCharactorAnimations,
  KarenCharactorAnimations,
  KevinCharactorAnimations,
  MarkCharactorAnimations,
  MelCharactorAnimations,
  SallyCharactorAnimations,
  SamCharactorAnimations,
];

function pickCharacter() {
  const max = CHARACTER_ANIMATIONS.length;
  const min = 0;
  const index = Math.floor(Math.random() * (max - min) + min);
  return CHARACTER_ANIMATIONS[index];
}

/**
 * As more Data Components  are used, join their initialising props here
 */
type NpcEntityProps = ConstructorParameters<typeof NameComponent>['0'] & {
  position: Vector;
};
export const NpcEntity = ({
  position,
  salutation,
  firstName,
  lastName,
}: NpcEntityProps) => {
  const character = pickCharacter();
  const actor = new Actor({
    name: 'npc',
    pos: position,
    width: 8,
    height: 8,
    collisionType: CollisionType.Active,
  });
  const behaviour = `root {
    sequence while(IsWandering) {
      action [Whistle]
      wait [5000]
    }
  }`;

  actor
    .addComponent(new NpcTagComponent())
    .addComponent(
      new NameComponent({
        salutation,
        firstName,
        lastName,
      })
    )
    .addComponent(
      new CharacterRenderMovementComponent(
        character.idle_up,
        character.idle_down,
        character.idle_left,
        character.idle_right,
        character.move_up,
        character.move_down,
        character.move_left,
        character.move_right
      )
    )
    .addComponent(new RandomMovementComponent(64))
    .addComponent(new BehaviourTreeComponent(behaviour));
  return actor;
};
