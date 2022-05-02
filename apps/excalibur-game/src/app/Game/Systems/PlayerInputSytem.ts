import {
  AddedEntity,
  Entity,
  RemovedEntity,
  System,
  SystemType,
} from 'excalibur';

export class PlayerInputSytem extends System {
  systemType: SystemType = SystemType.Draw;
  types: readonly string[] = [];
  update(entities: Entity[], delta: number): void {
    return;
  }
  notify(_entityAddedOrRemoved: AddedEntity | RemovedEntity): void {
    return;
  }
}
