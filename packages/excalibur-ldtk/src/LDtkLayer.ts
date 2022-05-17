import { Vector } from 'excalibur';

import { LayerDefinition } from './ldtk';
import { LDtkEntity } from './LDtkEntity';

export class LDtkLayer extends LDtkEntity {
  /**
   * Array of gid's (global Tiled identifiers) that point to a unique tile
   *
   * Note: the most significant byte may have flipped data encoded making the gid appear like a negative
   * integer.
   *
   * * Use `getCanonicalGid(gid)` to strip the bit flags from the high order byte
   * * Check flipped flags with:
   *   * `isFlippedDiagonally(gid)`
   *   * `isFlippedVertically(gid)`
   *   * `isFlippedHorizontally(gid)`
   */
  public data!: number[];

  /**
   * Offset of the tile map
   */
  public offset: Vector = Vector.Zero;

  /**
   * Parallax Factor
   */
  public parallaxFactor: Vector | null = null;

  /**
   * Width of layer in tiles
   */
  public width!: number;

  /**
   * Height of layer in tiles
   */
  public height!: number;
  /**
   * Original order of the Tiled layer
   */
  public order!: number;

  /**
   * Reference to the raw tiled layer data
   */
  public raw!: LayerDefinition;

  public static parse(layer: LayerDefinition): LDtkLayer {
    if (layer.type !== 'Tiles')
      throw Error('Cannot parse a non tilelayer type layer');

    const instance = new LDtkLayer();

    instance.id = layer.uid;
    instance.name = layer.identifier;
    instance.offset = new Vector(layer.pxOffsetX ?? 0, layer.pxOffsetY ?? 0);
    instance.parallaxFactor =
      layer.parallaxFactorX || layer.parallaxFactorY
        ? new Vector(layer.parallaxFactorX ?? 1, layer.parallaxFactorY ?? 1)
        : null;
    instance.width = layer.guideGridWid;
    instance.height = layer.guideGridHei;

    instance.raw = layer;
    return instance;
  }
}
