import { Vector } from 'excalibur';

import {
  CameraFocusedTagComponent,
  CharacterInputComponent,
  CharacterRenderMovementComponent,
  NameComponent,
  PlayerTagComponent,
} from '../Components';
import { MarkCharactorAnimations } from '../Resources';

import { BaseActor } from './Actor';

/**
 * As more Data Components  are used, join their initialising props here
 */
type PlayerEntityProps = ConstructorParameters<typeof NameComponent>['0'] & {
  position: Vector;
};
export const PlayerEntity = ({
  position,
  salutation,
  firstName,
  lastName,
}: PlayerEntityProps) => {
  const character = MarkCharactorAnimations;
  const actor = new BaseActor({
    name: 'player',
    pos: position,
  });

  actor
    .addComponent(new PlayerTagComponent())
    .addComponent(new CameraFocusedTagComponent())
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
    .addComponent(new CharacterInputComponent(48));
  return actor;
};
