import {
  Actor,
  BodyComponent,
  Engine,
  Entity,
  Input,
  Scene,
  System,
  SystemType,
} from 'excalibur';

import { zoomToActor } from '../../Core/Game';
import { PlayerTagComponent } from '../Components';

export class PlayerInputSytem extends System<
  PlayerTagComponent | BodyComponent
> {
  systemType: SystemType = SystemType.Update;
  types = ['player', 'ex.body'] as const;

  scene!: Scene;
  initialize(scene: Scene) {
    this.scene = scene;
  }
  update(entities: Entity[], delta: number): void {
    entities.forEach((entity) => {
      if (!(entity instanceof Actor)) return;

      const body = entity.get(BodyComponent);
      if (!body?.owner) return;
      const game = this.scene.engine;
      body.vel.setTo(0, 0);
      const speed = 64;

      if (game.input.keyboard.isHeld(Input.Keys.Right)) {
        body.vel.x = speed;
      }
      if (game.input.keyboard.isHeld(Input.Keys.Left)) {
        body.vel.x = -speed;
      }
      if (game.input.keyboard.isHeld(Input.Keys.Up)) {
        body.vel.y = -speed;
      }
      if (game.input.keyboard.isHeld(Input.Keys.Down)) {
        body.vel.y = speed;
      }
      zoomToActor(game.currentScene, entity);
    });
  }
}
