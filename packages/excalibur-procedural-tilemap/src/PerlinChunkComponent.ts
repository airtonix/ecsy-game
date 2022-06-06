import { Component } from 'excalibur';

import { PerlinChunk } from './PerlinChunk';

export const PerlinChunkComponentType = 'ecsygame.perlinchunk' as const;
export class PerlinChunkComponent extends Component<
  typeof PerlinChunkComponentType
> {
  type = PerlinChunkComponentType;

  constructor(public chunk: PerlinChunk) {
    super();
  }
}
