import { Vector } from 'excalibur';

import { hashPosition } from './hashPosition';
import { Perlin } from './PerlinNoise';

type ChunkOptions = {
  position: Vector;
  /** width and height of a chunk in tiles */
  chunkSize: number;
  /** px width and height of a tile */
  tileSize: number;
};

type PerlinTile = {
  x: number;
  y: number;
  value: number;
};

export class PerlinChunk {
  isLoaded?: boolean;
  tiles: PerlinTile[] = [];
  position: Vector;
  chunkSize: number;
  tileSize: number;

  constructor(public options: ChunkOptions) {
    this.position = options.position;
    this.chunkSize = options.chunkSize;
    this.tileSize = options.tileSize;
  }

  get id() {
    return hashPosition(this.position);
  }

  distance(to: Vector) {
    return this.position.distance(to);
  }

  generate() {
    if (this.isLoaded) return;
    const perlin = Perlin(Math.random);

    for (let x = 0; x < this.chunkSize; x++) {
      for (let y = 0; y < this.chunkSize; y++) {
        const tileX = x * this.tileSize;
        const tileY = y * this.tileSize;
        const absoluteTileX =
          this.position.x * (this.chunkSize * this.tileSize) + tileY;
        const absoluteTileY =
          this.position.y * (this.chunkSize * this.tileSize) + tileX;

        this.tiles.push({
          x: tileX,
          y: tileY,
          value: perlin.noise2D(absoluteTileX / 800, absoluteTileY / 800),
        });
      }
    }
    this.isLoaded = true;
  }
}
