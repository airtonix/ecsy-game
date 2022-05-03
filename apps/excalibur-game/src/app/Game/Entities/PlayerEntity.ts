import { Actor, CollisionType, vec } from 'excalibur';

import {
  CharacterAvatarComponent,
  CharacterInputComponent,
  NameComponent,
  PlayerTagComponent,
} from '../Components';
import {
  BaseImageDownAnimation,
  BaseImageIdleDownAnimation,
  BaseImageLeftAnimation,
  BaseImageRightAnimation,
  BaseImageUpAnimation,
} from '../Resources/Character';

/**
 * As more Data Components  are used, join their initialising props here
 */
type PlayerEntityProps = ConstructorParameters<typeof NameComponent>['0'];
export const PlayerEntity = ({
  salutation,
  firstName,
  lastName,
}: PlayerEntityProps) => {
  const actor = new Actor({
    pos: vec(100, 100),
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
      new CharacterAvatarComponent(
        // TODO: move these to constructor params
        BaseImageIdleDownAnimation,
        BaseImageUpAnimation,
        BaseImageDownAnimation,
        BaseImageLeftAnimation,
        BaseImageRightAnimation
      )
    )
    .addComponent(new CharacterInputComponent());
  return actor;
};
