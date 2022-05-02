import { Scene, World } from 'excalibur';

import { PlayerEntity } from '../Entities';

export class WorldScene extends Scene {
  player!: ReturnType<typeof PlayerEntity>;

  public onActivate() {
    this.player = PlayerEntity({ name: 'Player1' });
  }
}

export const WorldSceneKey = 'world';
