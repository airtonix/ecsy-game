import { Vector, vec } from 'excalibur';

export function getChunkCoordinates(
  pos: Vector,
  chunkSize: number,
  tileSize: number
) {
  let snappedChunkX =
    chunkSize * tileSize * Math.round(pos.x / (chunkSize * tileSize));
  let snappedChunkY =
    chunkSize * tileSize * Math.round(pos.y / (chunkSize * tileSize));

  snappedChunkX = snappedChunkX / chunkSize / tileSize;
  snappedChunkY = snappedChunkY / chunkSize / tileSize;

  // const viewportX = pos.x;
  // const viewportY = pos.y;
  // const size = chunkSize * tileSize;
  // const boundary = chunkSize / tileSize;
  // const x = size * Math.round(viewportX / size);
  // const y = size * Math.round(viewportY / size);

  return {
    pos: vec(snappedChunkX, snappedChunkY),
  };
}
