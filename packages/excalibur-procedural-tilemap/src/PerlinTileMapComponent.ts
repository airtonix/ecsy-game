import { Component, Sprite } from 'excalibur';

import { PerlinChunk } from './PerlinChunk';

type PerlinTileMapComponentOptions = {
  chunkSize?: number;
  tileSize?: number;
  radius?: number;
  spriteForPerlinValue?: (perlinValue: number) => Sprite | void;
};
export const PerlinTileMapComponentType = 'ecsygame.perlinmap' as const;
export class PerlinTileMapComponent extends Component<
  typeof PerlinTileMapComponentType
> {
  type = PerlinTileMapComponentType;
  chunks = new Map<string, PerlinChunk>();
  chunkSize: Required<PerlinTileMapComponentOptions>['chunkSize'];
  tileSize: Required<PerlinTileMapComponentOptions>['tileSize'];
  radius: Required<PerlinTileMapComponentOptions>['radius'];

  constructor(public options: PerlinTileMapComponentOptions = {}) {
    super();
    this.tileSize = options.tileSize || 16;
    this.chunkSize = options.chunkSize || 16;
    this.radius = options.radius || 3;
  }
}
