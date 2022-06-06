import { Actor, Color, Rectangle, vec } from 'excalibur';

import { PerlinChunk } from './PerlinChunk';
import { PerlinChunkComponent } from './PerlinChunkComponent';
type PerlinChunkEntityProps = {
  chunk: PerlinChunk;
  size: number;
  debug?: boolean;
};
const colors = [Color.Azure, Color.Blue, Color.Cyan, Color.Green, Color.Orange];
export function PerlinChunkEntity({
  chunk,
  size,
  debug,
}: PerlinChunkEntityProps) {
  const pos = vec(chunk.position.x + 1, chunk.position.y + 1);
  const entity = new Actor({
    pos,
    z: 20,
  });
  entity.addComponent(new PerlinChunkComponent(chunk));
  if (debug)
    entity.graphics.add(
      new Rectangle({
        height: size - 2,
        width: size - 2,
        lineWidth: 2,
        color: undefined,
        strokeColor: colors[Math.floor(Math.random() * colors.length)],
      })
    );

  return entity;
}
