import {
  Actor,
  AddedEntity,
  Entity,
  RemovedEntity,
  Scene,
  System,
  SystemType,
} from 'excalibur';

import {
  LDtkOrthogonalComponent,
  LDtkOrthogonalComponentKey,
} from './LDtkOrthogonalComponent';
import { generateEntities } from './generateEntities';
import { LDtkEntity } from './LDtkEntity';

export class LDtkEntitySpawnerSystem extends System<
  LDtkOrthogonalComponent,
  Scene
> {
  systemType: SystemType = SystemType.Update;
  types = [LDtkOrthogonalComponentKey];
  scene!: Scene;
  constructor(public factory: Map<string, (data: LDtkEntity) => Actor>) {
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
      const entities = generateEntities(this.scene, level, this.factory);
    }

    if (_entityAddedOrRemoved.type === 'Entity Removed') {
      return;
    }
  }

  update(entities: Entity[], delta: number): void {
    return;
  }
}
