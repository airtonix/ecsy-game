import { Logger, PolygonCollider } from 'excalibur';

import { IntGridValueDefinition, LayerInstance } from '../ldtk';
import { LDtkLevel } from '../LDtkLevel';
import { ColliderMesh } from '../navmesh';

/**
 * Loops through the levels and creates tilemaps for each of its Tile and IntGrid layers
 */
export function createOrthogonalColliders(
  /** the level for which to create solid colliders */
  level: LDtkLevel,
  /** a filter predicate that determines if a block is solid or not */
  tileQuery: (layer: LayerInstance, tile: IntGridValueDefinition) => boolean
) {
  const colliderMap = new Map<string, Map<string, PolygonCollider>>();
  const layers = level.getLayersByTypes('IntGrid');

  for (const layer of layers) {
    const colliders = new Map<string, PolygonCollider>();
    Logger.getInstance().info(
      `Generated ${colliders.size}: colliders for @layer:${layer.identifier}`
    );
    colliderMap.set(layer.iid, colliders);
  }

  return colliderMap;
}
