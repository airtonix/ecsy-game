import {
  AddedEntity,
  Entity,
  GraphicsComponent,
  MotionComponent,
  RemovedEntity,
  System,
  SystemType,
} from 'excalibur';

import { CharacterAvatarComponent } from '../Components/CharacterAvatarComponent';

export enum DirectionInput {
  Left = 'Left',
  Right = 'Right',

  Up = 'Up',

  Down = 'Down',
}

export class RenderableAvatarSystem extends System<
  CharacterAvatarComponent | GraphicsComponent | MotionComponent
> {
  types = ['avatar', 'ex.graphics'] as const;
  systemType = SystemType.Draw;
  notify(_entityAddedOrRemoved: AddedEntity | RemovedEntity) {
    const { data: entity } = _entityAddedOrRemoved;
    const avatar = entity.get(CharacterAvatarComponent);
    const graphics = entity.get(GraphicsComponent);
    if (!avatar || !graphics) return;

    graphics.add('move_left', avatar.move_left);
    graphics.add('move_right', avatar.move_right);
    graphics.add('move_down', avatar.move_left);
    graphics.add('move_up', avatar.move_up);
    graphics.add('idle', avatar.idle);

    graphics.use('idle');
  }
  update(entities: Entity[], delta: number): void {
    return;
  }
}
