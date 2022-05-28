import { Entity } from 'excalibur';

import { LDtkOrthogonalComponent } from './LDtkOrthogonalComponent';
import { LDtkWorldResource } from './LDtkWorldResource';

export function LDtkOrthogonalTilemap(
  world: LDtkWorldResource,
  startingLevelId: string
) {
  const entity = new Entity();
  entity.addComponent(new LDtkOrthogonalComponent(world, startingLevelId));

  return entity;
}

// removeFromScene(scene: Scene) {
//   const tilemapIds = Array.from(this.layers.values()).map(
//     (layer) => layer.id
//   );
//   scene.tileMaps
//     .filter((tilemap) => tilemapIds.includes(tilemap.id))
//     .map((tilemap) => tilemap.kill());
// }

// addToScene(scene: Scene) {
//   Array.from(this.layers.values()).forEach((layer, index) => {
//     scene.add(layer);
//     layer.z = index;
//   });
//   return this;
// }
