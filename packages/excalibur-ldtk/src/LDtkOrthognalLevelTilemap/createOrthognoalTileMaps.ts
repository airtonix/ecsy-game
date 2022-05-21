import { Logger, SpriteSheet, TileMap } from 'excalibur';

import { LDtkLevel } from '../LDtkLevel';

import { createLayerTiles } from './createLayerTiles';
import { createOrthogonalTileMapLayer } from './createOrthogonalTileMapLayer';

/**
 * Loops through the levels and creates tilemaps for each of its Tile and IntGrid layers
 */
export function createOrthognoalTileMaps(
  level: LDtkLevel,
  spritesheets: Map<number, SpriteSheet>
) {
  const tilemaps = new Map<string, TileMap>();
  const layers = level.getLayersByTypes('IntGrid', 'Tiles');
  for (const layer of layers) {
    const tilesetUid = layer.overrideTilesetUid || layer.tilesetDefUid;
    if (!tilesetUid) {
      Logger.getInstance().warn(
        `layer ${layer.identifier} [${layer.iid}] has not defined a tileset`
      );
      continue;
    }

    const tilemap = createOrthogonalTileMapLayer(
      level?.pxWid,
      level?.pxHei,
      layer
    );

    tilemaps.set(layer.iid, tilemap);
    const spritesheet = spritesheets.get(tilesetUid);
    createLayerTiles(layer, layer.autoLayerTiles, tilemap, spritesheet);
  }
  return tilemaps;
}
