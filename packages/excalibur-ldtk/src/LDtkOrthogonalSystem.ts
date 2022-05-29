import {
  AddedEntity,
  Entity,
  RemovedEntity,
  Scene,
  System,
  SystemType,
} from 'excalibur';

import { LDtkOrthogonalComponent } from './LDtkOrthogonalComponent';
import { createOrthogonalTileMaps } from './orthogonal';

export class LDtkOrthogonalSystem extends System<
  LDtkOrthogonalComponent,
  Scene
> {
  systemType: SystemType = SystemType.Update;
  types = ['ldtk.orthogonaltilemap'] as const;
  scene!: Scene;
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

      const tilemaps = createOrthogonalTileMaps(
        level,
        component.world.spritesheets
      );

      for (const tilemap of tilemaps.values()) {
        this.scene.add(tilemap);
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