import { Logger, Polygon } from 'excalibur';

import { IntGridValueInstance, LayerInstance } from '../ldtk';
import { LDtkLevel } from '../LDtkLevel';

/**
 * Loops through the levels and creates tilemaps for each of its Tile and IntGrid layers
 */
export function createOrthogonalNavMesh(
  level: LDtkLevel,
  walkableQery: (layer: LayerInstance, tile: IntGridValueInstance) => boolean
) {
  const navmesh = new Map<string, Polygon>();
  const layers = level.getLayersByTypes('IntGrid');

  for (const layer of layers) {
    //   const tilesetUid = layer.overrideTilesetUid || layer.tilesetDefUid;
    //   if (!tilesetUid) {
    //     Logger.getInstance().warn(
    //       `layer ${layer.identifier} [${layer.iid}] has not defined a tileset`
    //     );
    //     continue;
    //   }
    //   tilemap.z = level.getLayerZindex(layer.iid);
    //   Logger.getInstance().info(
    //     `Generated tilemap: ${tilemap.id} @layer:${tilemap.z} for ${layer.identifier}`
    //   );
    //   navmesh.set(layer.iid, tilemap);
    //   const spritesheet = spritesheets.get(tilesetUid);
    //   createLayerTiles(layer, layer.autoLayerTiles, tilemap, spritesheet);
  }

  return navmesh;
}
