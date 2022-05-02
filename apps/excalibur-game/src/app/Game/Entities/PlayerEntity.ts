import { Actor, CollisionType, Color, vec } from 'excalibur';

import { PlayerTagComponent } from '../Components';
import {
  BaseImageDownAnimation,
  BaseImageIdleDownAnimation,
  BaseImageLeftAnimation,
  BaseImageUpAnimation,
} from '../Resources/Character';

type PlayerEntityProps = {
  name: string;
};
export const PlayerEntity = ({ name }: PlayerEntityProps) => {
  const actor = new Actor({
    pos: vec(100, 100),
    width: 32,
    height: 48,
    color: Color.Blue,
    collisionType: CollisionType.Active,
  });
  actor.addComponent(PlayerTagComponent);

  actor.graphics.layers.create({ name: 'base', order: -1 });
  actor.graphics.add('move_down', BaseImageDownAnimation);
  actor.graphics.add('idle_down', BaseImageIdleDownAnimation);
  actor.graphics.add('move_up', BaseImageUpAnimation);
  actor.graphics.add('move_left', BaseImageLeftAnimation);
  actor.graphics.add('move_right', BaseImageLeftAnimation);

  actor.graphics.layers.get('base').use('idle_down');
  actor.graphics.use('idle_down');
  return actor;
};
