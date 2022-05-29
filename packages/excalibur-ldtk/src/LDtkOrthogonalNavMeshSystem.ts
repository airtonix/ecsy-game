import {
  AddedEntity,
  Entity,
  Logger,
  RemovedEntity,
  Scene,
  System,
  SystemType,
} from 'excalibur';

import { IntGridValueInstance, LayerInstance } from './ldtk';
import { LDtkLevel } from './LDtkLevel';
import { LDtkOrthogonalComponent } from './LDtkOrthogonalComponent';
import { createOrthogonalNavMesh } from './orthogonal';

export class LDtkOrthogonalNavMeshSystem extends System<
  LDtkOrthogonalComponent,
  Scene
> {
  systemType: SystemType = SystemType.Update;
  types = ['ldtk.orthogonaltilemap'] as const;
  scene!: Scene;

  constructor(
    public walkableIntGridQuery: (
      level: LDtkLevel,
      layer: LayerInstance,
      intgrid: IntGridValueInstance
    ) => boolean
  ) {
    super();
  }
  initialize(scene: Scene) {
    this.scene = scene;
    return;
  }
  notify(_entityAddedOrRemoved: AddedEntity | RemovedEntity): void {
    const component = _entityAddedOrRemoved.data.get(LDtkOrthogonalComponent);
    if (!component) return;

    if (_entityAddedOrRemoved.type === 'Entity Added') {
      const level = component.world.getLevelByIdentifier(component.levelId);
      if (!level) return;

      const polygons = createOrthogonalNavMesh(level, (layer, tile) =>
        this.walkableIntGridQuery(level, layer, tile)
      );

      for (const polygon of polygons.values()) {
        Logger.getInstance().info(`Would have created ${polygon.id}`);
      }
    }

    if (_entityAddedOrRemoved.type === 'Entity Removed') {
      return;
    }
  }
  update(entities: Entity[], delta: number): void {
    return;
  }
}
