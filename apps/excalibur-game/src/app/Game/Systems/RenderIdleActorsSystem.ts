import {
  AddedEntity,
  Entity,
  GraphicsComponent,
  MotionComponent,
  RemovedEntity,
  System,
  SystemType,
} from 'excalibur';

import { CharacterRenderIdleComponent } from '../Components';

export class RenderIdleActorsSystem extends System<
  CharacterRenderIdleComponent | GraphicsComponent
> {
  types = ['game.render_idle', 'ex.graphics'] as const;
  systemType = SystemType.Draw;
  notify(_entityAddedOrRemoved: AddedEntity | RemovedEntity) {
    const { data: entity } = _entityAddedOrRemoved;
    const renderIdle = entity.get(CharacterRenderIdleComponent);
    const graphics = entity.get(GraphicsComponent);
    if (!graphics || !renderIdle) return;

    graphics.add('idle', renderIdle.idle);
    graphics.use('idle');
  }
  update(entities: Entity[], delta: number): void {
    return;
  }
}
