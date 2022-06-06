import { Actor, Color, Rectangle, Vector } from 'excalibur';

export function renderMeshNode(postion: Vector, solid: boolean) {
  const color = solid ? Color.Black : Color.LightGray;

  const node = new Actor({ x: postion.x, y: postion.y });
  node.graphics.anchor = Vector.Zero;
  node.graphics.add(
    new Rectangle({
      width: 4,
      height: 4,
      color,
    })
  );
  node.pos = postion;
  node.z = 1000;
  return node;
}
