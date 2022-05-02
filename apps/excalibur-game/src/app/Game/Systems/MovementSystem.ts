import { Entity, System, SystemType } from 'excalibur';

export class MovementSystem extends System {
  systemType: SystemType = SystemType.Draw;
  types: readonly string[] = ['transform'];
  update(entities: Entity[], delta: number): void {
    for (const entity of entities) {
      this.moveEntity(entity, delta);
    }
  }

  moveEntity(entity: Entity, delta: number) {
    const movement = entity.getComponents();

    return;
  }
  notify() {
    return;
  }
}
