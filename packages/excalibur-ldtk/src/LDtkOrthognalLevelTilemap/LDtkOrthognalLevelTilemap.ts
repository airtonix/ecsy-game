import { Class, Entity, Logger, Scene, SpriteSheet } from 'excalibur';

import { LDtkEntity } from '../LDtkEntity';
import { LDtkLevel } from '../LDtkLevel';

import { createOrthognoalTileMaps } from './createOrthognoalTileMaps';

export class LDtkOrthognalLevelTilemap {
  private constructor(
    public level: LDtkLevel,
    public layers: ReturnType<typeof createOrthognoalTileMaps>
  ) {}

  addToScene(scene: Scene) {
    for (const layer of this.layers.values()) {
      scene.add(layer);
    }
    return this;
  }

  static create(level: LDtkLevel, spritesheets: Map<number, SpriteSheet>) {
    return new LDtkOrthognalLevelTilemap(
      level,
      createOrthognoalTileMaps(level, spritesheets)
    );
  }
}
