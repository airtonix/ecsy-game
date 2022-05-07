import { Actor, CollisionType, Vector } from 'excalibur';

import {
  CharacterInputComponent,
  CharacterRenderMovementComponent,
  NameComponent,
  PlayerTagComponent,
} from '../Components';
import {
  BaseImageDownAnimation,
  BaseImageIdleDownAnimation,
  BaseImageIdleLeftAnimation,
  BaseImageIdleRightAnimation,
  BaseImageIdleUpAnimation,
  BaseImageLeftAnimation,
  BaseImageRightAnimation,
  BaseImageUpAnimation,
} from '../Resources/Character';

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
        BaseImageIdleUpAnimation,
        BaseImageIdleDownAnimation,
        BaseImageIdleLeftAnimation,
        BaseImageIdleRightAnimation,
        BaseImageUpAnimation,
        BaseImageDownAnimation,
        BaseImageLeftAnimation,
        BaseImageRightAnimation
      )
    )
    .addComponent(new CharacterInputComponent());
  return actor;
};
