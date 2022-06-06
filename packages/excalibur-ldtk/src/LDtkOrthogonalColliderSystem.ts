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
    }

    if (_entityAddedOrRemoved.type === 'Entity Removed') {
      return;
    }
  }
  update(entities: Entity[], delta: number): void {
    return;
  }
}
