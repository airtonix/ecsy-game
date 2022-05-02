import { Actor, CollisionType, Color, vec } from 'excalibur';

import { NameComponent, PlayerTagComponent } from '../Components';
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
    width: 8,
    height: 8,
    collisionType: CollisionType.Active,
  });
  actor.addComponent(PlayerTagComponent);
  actor.addComponent(new NameComponent('Mr', name, ''));

  const baseLayer = actor.graphics.layers.create({
    name: 'base',
    order: 10,
    offset: vec(0, -8),
  });
  actor.graphics.add('move_down', BaseImageDownAnimation);
  actor.graphics.add('idle_down', BaseImageIdleDownAnimation);
  actor.graphics.add('move_up', BaseImageUpAnimation);
  actor.graphics.add('move_left', BaseImageLeftAnimation);
  actor.graphics.add('move_right', BaseImageLeftAnimation);

  baseLayer.use('idle_down');

  return actor;
};
