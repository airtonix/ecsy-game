import { Logger, SpriteSheet, TileMap, vec } from 'excalibur';

import { TileInstance } from '../ldtk';
import { LDtkLayerInstance } from '../LDtkLayerInstance';

export function createLayerTiles(
  layer: LDtkLayerInstance,
  tiles: TileInstance[],
  tilemap: TileMap,
  spritesheet?: SpriteSheet
) {
  if (!spritesheet) {
    Logger.getInstance().warn(
      `layer ${layer.identifier} [${layer.iid}] has not defined a spritesheet`
    );
    return;
  }

  for (const tile of tiles) {
    Logger.getInstance().info(
      `Creating LayerTile for ${layer.levelID}:${layer.identifier}:${tile.t}`
    );
    const [srcTileX, srcTileY] = tile.src;
    const sprite = spritesheet.sprites.find(
      (sprite) =>
        sprite.sourceView.x === srcTileX && sprite.sourceView.y === srcTileY
    );

    if (!sprite) {
      Logger.getInstance().warn(
        `Cant find tile in spritesheet`,
        { srcTileX, srcTileY },
        spritesheet.sprites.filter((sprite) => sprite.sourceView.x === tileX)
      );
      continue;
    }

    const [tileX, tileY] = tile.px;
    const tileMapTile = tilemap.getTileByPoint(vec(tileX, tileY));
    if (!tileMapTile) {
      Logger.getInstance().warn(
        `Cant find tile in tilemap`,
        { tileX, tileY },
        spritesheet.sprites.filter((sprite) => sprite.sourceView.x === tileX)
      );
      continue;
    }

    tileMapTile.addGraphic(sprite);
  }
}
