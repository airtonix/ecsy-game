import { System, queries } from 'ecstra';

import { Velocity } from './VelocityComponent';
import { Position2D } from './Position2DComponent';
import { canvas } from './Canvas';
import { SHAPE_HALF_SIZE } from './constants';

@queries({
  // The `moving` query looks for entities with both the `Velocity` and
  // `Position` components.
  moving: [Velocity, Position2D],
})
export class MovableSystem extends System {
  public execute(delta: number) {
    this.queries.moving.execute((entity) => {
      const velocity = entity.read(Velocity);
      const position = entity.write(Position2D);
      if (!position || !velocity) return;

      position.x += velocity.x * delta;
      position.y += velocity.y * delta;

      if (position.x > canvas.canvasWidth + SHAPE_HALF_SIZE)
        position.x = -SHAPE_HALF_SIZE;
      if (position.x < -SHAPE_HALF_SIZE)
        position.x = canvas.canvasWidth + SHAPE_HALF_SIZE;
      if (position.y > canvas.canvasHeight + SHAPE_HALF_SIZE)
        position.y = -SHAPE_HALF_SIZE;
      if (position.y < -SHAPE_HALF_SIZE)
        position.y = canvas.canvasHeight + SHAPE_HALF_SIZE;
    });
  }
}
