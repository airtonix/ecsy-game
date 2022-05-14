import {
  Actor,
  BodyComponent,
  Entity,
  Input,
  Scene,
  System,
  SystemType,
} from 'excalibur';

import { CharacterInputComponent } from '../Components';

export class PlayerControlSystem extends System<
  CharacterInputComponent | BodyComponent
> {
  systemType: SystemType = SystemType.Update;
  types = ['game.movement.controlled', 'ex.body'] as const;

  scene!: Scene;
  initialize(scene: Scene) {
    this.scene = scene;
  }
  update(entities: Entity[]) {
    entities.forEach((entity) => {
      if (!(entity instanceof Actor)) return;
      const characterControl = entity.get(CharacterInputComponent);
      const body = entity.get(BodyComponent);

      if (!body?.owner || !characterControl) return;

      const game = this.scene.engine;
      body.vel.setTo(0, 0);

      if (game.input.keyboard.isHeld(Input.Keys.Right)) {
        body.vel.x = characterControl.speed;
      }
      if (game.input.keyboard.isHeld(Input.Keys.Left)) {
        body.vel.x = -characterControl.speed;
      }
      if (game.input.keyboard.isHeld(Input.Keys.Up)) {
        body.vel.y = -characterControl.speed;
      }
      if (game.input.keyboard.isHeld(Input.Keys.Down)) {
        body.vel.y = characterControl.speed;
      }
    });
  }
}
