import {
  AddedEntity,
  BodyComponent,
  Entity,
  GraphicsComponent,
  MotionComponent,
  RemovedEntity,
  System,
  SystemType,
} from 'excalibur';

import { CharacterRenderMovementComponent } from '../Components';

export enum DirectionInput {
  Left = 'Left',

  Right = 'Right',

  Up = 'Up',

  Down = 'Down',
}

export class RenderMovingActorsSystem extends System<
  CharacterRenderMovementComponent | GraphicsComponent | MotionComponent
> {
  types = ['game.render_movement', 'ex.graphics', 'ex.motion'] as const;
  systemType = SystemType.Draw;
  notify(_entityAddedOrRemoved: AddedEntity | RemovedEntity) {
    const { data: entity } = _entityAddedOrRemoved;
    const renderMovement = entity.get(CharacterRenderMovementComponent);
    const graphics = entity.get(GraphicsComponent);
    if (!graphics || !renderMovement) return;

    graphics.add('move_left', renderMovement.move_left);
    graphics.add('move_right', renderMovement.move_right);
    graphics.add('move_down', renderMovement.move_down);
    graphics.add('move_up', renderMovement.move_up);
    graphics.add('idle_left', renderMovement.idle_left);
    graphics.add('idle_right', renderMovement.idle_right);
    graphics.add('idle_down', renderMovement.idle_down);
    graphics.add('idle_up', renderMovement.idle_up);

    graphics.use('idle_down');
  }
  update(entities: Entity[]): void {
    entities.forEach((entity) => {
      const body = entity.get(BodyComponent);
      const graphics = entity.get(GraphicsComponent);
      const renderMovement = entity.get(CharacterRenderMovementComponent);

      if (!body || !graphics || !renderMovement) return;

      const direction = [
        body.vel.y > 0 && 'down',
        body.vel.x < 0 && 'left',
        body.vel.x > 0 && 'right',
        body.vel.y < 0 && 'up',
      ].filter(Boolean);

      if (direction.includes('left')) {
        graphics.use('move_left');
        renderMovement.last_direction = 'left';
      } else if (direction.includes('right')) {
        graphics.use('move_right');
        renderMovement.last_direction = 'right';
      } else if (direction.includes('up')) {
        graphics.use('move_up');
        renderMovement.last_direction = 'up';
      } else if (direction.includes('down')) {
        graphics.use('move_down');
        renderMovement.last_direction = 'down';
      } else {
        graphics.use(`idle_${renderMovement.last_direction}`);
      }
    });
  }
}
