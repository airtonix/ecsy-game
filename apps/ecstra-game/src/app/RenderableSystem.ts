import { System, after } from 'ecstra';

import { MovableSystem } from './MoveableSystem';
import { Renderable } from './RenderableComponent';
import { Shape } from './ShapeComponent';
import { canvas } from './Canvas';
import { Position2D } from './Position2DComponent';
import { SHAPE_HALF_SIZE, SHAPE_SIZE } from './constants';

@after([MovableSystem])
export class RendererSystem extends System {
  // This is equivalent to using the `query` decorator.
  public static Queries = {
    // The `renderables` query looks for entities with both the
    // `Renderable` and `Shape` components.
    renderables: [Renderable, Shape],
  };

  public execute(): void {
    canvas.ctx.globalAlpha = 1;
    canvas.ctx.fillStyle = '#ffffff';
    canvas.ctx.fillRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);
    //ctx.globalAlpha = 0.6;

    // Iterate through all the entities on the query
    this.queries.renderables.execute((entity) => {
      const shape = entity.read(Shape);
      const position = entity.read(Position2D);
      if (!shape || !position) return;

      if (shape.primitive === 'box') {
        this.drawBox(position);
      } else {
        this.drawCircle(position);
      }
    });
  }

  drawCircle(position: Position2D) {
    const { ctx } = canvas;

    ctx.fillStyle = '#888';
    ctx.beginPath();
    ctx.arc(position.x, position.y, SHAPE_HALF_SIZE, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#222';
    ctx.stroke();
  }

  drawBox(position: Position2D) {
    const { ctx } = canvas;

    ctx.beginPath();
    ctx.rect(
      position.x - SHAPE_HALF_SIZE,
      position.y - SHAPE_HALF_SIZE,
      SHAPE_SIZE,
      SHAPE_SIZE
    );
    ctx.fillStyle = '#f28d89';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#800904';
    ctx.stroke();
  }
}
