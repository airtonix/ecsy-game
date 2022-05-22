import { Scene } from 'excalibur';

import { BehaviourTreeSystem } from '@ecsygame/behaviour-tree';

import { Game } from '../../Core/Game';
import { World } from '../Resources';
import {
  CameraFocusSystem,
  PlayerControlSystem,
  RenderIdleActorsSystem,
  RenderMovingActorsSystem,
} from '../Systems';
import { EntityFactory } from '../Entities/factory';

export class WorldScene extends Scene {
  constructor(public game: Game) {
    super();
  }

  public onActivate() {
    this.world.systemManager.addSystem(new PlayerControlSystem());
    this.world.systemManager.addSystem(new RenderIdleActorsSystem());
    this.world.systemManager.addSystem(new RenderMovingActorsSystem());
    this.world.systemManager.addSystem(new CameraFocusSystem());
    this.world.systemManager.addSystem(new BehaviourTreeSystem());

    World.addToScene(this, 'Level_1');
    World.generateEntities(this, 'Level_1', EntityFactory);
  }
}

export const WorldSceneKey = 'world';
