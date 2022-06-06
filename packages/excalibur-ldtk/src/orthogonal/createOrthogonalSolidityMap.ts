import { LayerInstance, TileInstance } from '../ldtk';
import { LDtkLevel } from '../LDtkLevel';

import { chunk } from './chunk';

export function createOrthogonalSolidityMap(
  level: LDtkLevel,
  tileQuery: (layer: LayerInstance, tile: TileInstance) => boolean
) {
  const solidMap = new Map<string, number[][]>();
  const layers = level.getLayersByTypes('IntGrid');

  for (const layer of layers) {
    const tiles = layer.autoLayerTiles.map((tile) =>
      tileQuery(layer, tile) ? 0 : 1
    );
    const map = chunk(tiles, level.pxWid / layer.cWid);

    solidMap.set(layer.iid, map);
  }

  return solidMap;
}
