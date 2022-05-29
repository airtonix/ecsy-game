import {
  AddedEntity,
  Entity,
  RemovedEntity,
  Scene,
  System,
  SystemType,
} from 'excalibur';

import { LayerInstance, TileInstance } from './ldtk';
import { LDtkLevel } from './LDtkLevel';
import { LDtkOrthogonalComponent } from './LDtkOrthogonalComponent';
import { LDtkWorldResource } from './LDtkWorldResource';
import { ColliderMesh, meshRenderer } from './navmesh';
import { createOrthogonalSolidityMap } from './orthogonal';

export class LDtkOrthogonalColliderSystem extends System<
  LDtkOrthogonalComponent,
  Scene
> {
  systemType: SystemType = SystemType.Update;
  types = ['ldtk.orthogonaltilemap'] as const;
  scene!: Scene;
  constructor(
    /** Query for each intGrid to determine if this cell causes collision */
    public solidIntGridQuery: (
      world: LDtkWorldResource,
      level: LDtkLevel,
      layer: LayerInstance,
      intgrid: TileInstance
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

      const solidMap = createOrthogonalSolidityMap(level, (layer, tile) =>
        this.solidIntGridQuery(component.world, level, layer, tile)
      );

      for (const map of solidMap.values()) {
        const mesh = new ColliderMesh(map, 16);
        meshRenderer(mesh, this.scene);
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
