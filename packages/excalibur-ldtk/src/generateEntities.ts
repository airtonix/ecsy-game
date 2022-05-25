import { Actor, Logger, Scene } from 'excalibur';

import { LDtkEntity } from './LDtkEntity';
import { LDtkWorldResource } from './LDtkWorldResource';

export function generateEntities(
  scene: Scene,
  world: LDtkWorldResource,
  levelIID: string,
  entityMap: Record<string, (entity: LDtkEntity) => Actor>
) {
  const entities = new Map<number, Actor>();
  const level = world.getLevelByIID(levelIID);
  if (!level) throw new Error(`No level by IID of ${levelIID}`);

  for (const layer of level.getEntityLayers()) {
    for (const entityId in layer.entities) {
      const entity = layer.entities[entityId];
      const entityFactory = entityMap[entity.identifier] || entityMap.default;
      if (!entityFactory) {
        Logger.getInstance().warn(
          `Provided entityMap does not have an entry for ${entity.identifier}`
        );
        continue;
      }
      try {
        const actor = entityFactory(entity);
        actor.z = level.getLayerZindex(layer.iid);
        scene.add(actor);
        entities.set(actor.id, actor);
        Logger.getInstance().info(
          `Generated entity: ${entity.identifier} on layer ${actor.z}`,
          entity,
          actor
        );
      } catch (error) {
        Logger.getInstance().error(
          `Problem creating Entity from provided entityMap for ${entity.identifier}`
        );
      }
    }
  }
  return entities;
}
