import { Actor, CollisionType, Vector } from 'excalibur';

import {
  CharacterInputComponent,
  CharacterRenderMovementComponent,
  NameComponent,
  PlayerTagComponent,
} from '../Components';
import { SallyCharactorAnimations } from '../Resources';

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
  const actor = new Actor({
    pos: position,
    width: 8,
    height: 8,
    collisionType: CollisionType.Active,
  });

  actor
    .addComponent(new PlayerTagComponent())
    .addComponent(
      new NameComponent({
        salutation,
        firstName,
        lastName,
      })
    )
    .addComponent(
      new CharacterRenderMovementComponent(
        SallyCharactorAnimations.idle_up,
        SallyCharactorAnimations.idle_down,
        SallyCharactorAnimations.idle_left,
        SallyCharactorAnimations.idle_right,
        SallyCharactorAnimations.move_up,
        SallyCharactorAnimations.move_down,
        SallyCharactorAnimations.move_left,
        SallyCharactorAnimations.move_right
      )
    )
    .addComponent(new CharacterInputComponent());
  return actor;
};
