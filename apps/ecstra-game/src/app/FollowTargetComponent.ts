import { ComponentData, number, ref } from 'ecstra';

import { Position2D } from './Position2DComponent';

export class FollowTarget extends ComponentData {
  @ref<Position2D>()
  target!: Position2D;
  @number(1.0)
  speed = 0;
}
