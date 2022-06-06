import { Logger, TileMap, vec } from 'excalibur';

import { LDtkLayerComponent } from '../LDtkLayerComponent';
import { LDtkLayerInstance } from '../LDtkLayerInstance';

/**
 * Creates a tilemap from a layer
 */
export function createOrthogonalTileMapLayer(
  levelWidth: number,
  levelHeight: number,
  layer: LDtkLayerInstance
) {
  Logger.getInstance().info(
    `Creating Tilemap for level: ${layer.levelID} 👉 ${layer.identifier} [${layer.iid}]`
  );

  const tilemap = new TileMap({
    pos: vec(layer.pxTotalOffsetX, layer.pxTotalOffsetY),
    tileHeight: layer.gridSize,
    tileWidth: layer.gridSize,
    columns: Math.floor(levelWidth / layer.gridSize),
    rows: Math.floor(levelHeight / layer.gridSize),
  });

  tilemap.addComponent(new LDtkLayerComponent(layer));

  return tilemap;
}
