import { Actor, Logger, Scene } from 'excalibur';

import { LDtkEntity } from './LDtkEntity';
import { LDtkLevel } from './LDtkLevel';

export function generateEntities(
  scene: Scene,
  level: LDtkLevel,
  factory: Map<string, (data: LDtkEntity) => Actor>
) {
  const entities = new Map<number, Actor>();

  for (const layer of level.getEntityLayers()) {
    for (const entityId in layer.entities) {
      const entity = layer.entities[entityId];
      const spawner = factory.get(entity.identifier);

      if (!spawner) {
        Logger.getInstance().warn(
          `Provided entityMap does not have an entry for ${entity.identifier}`
        );
        continue;
      }

      try {
        const actor = spawner(entity);
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
