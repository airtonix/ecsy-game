import { Scene, SpriteSheet } from 'excalibur';

import { LDtkLevel } from '../LDtkLevel';

import { createOrthognoalTileMaps } from './createOrthognoalTileMaps';

export class LDtkOrthognalLevelTilemap {
  private constructor(
    public level: LDtkLevel,
    public layers: ReturnType<typeof createOrthognoalTileMaps>
  ) {}

  addToScene(scene: Scene) {
    Array.from(this.layers.values()).forEach((layer, index) => {
      scene.add(layer);
      layer.z = index;
    });
    return this;
  }

  static create(level: LDtkLevel, spritesheets: Map<number, SpriteSheet>) {
    return new LDtkOrthognalLevelTilemap(
      level,
      createOrthognoalTileMaps(level, spritesheets)
    );
  }
}
