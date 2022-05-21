import { Scene, vec } from 'excalibur';

import { BehaviourTreeSystem } from '@ecsygame/behaviour-tree';

import { Game, placeActor } from '../../Core/Game';
import { NpcEntity, PlayerEntity } from '../Entities';
import { World } from '../Resources';
import {
  CameraFocusSystem,
  PlayerControlSystem,
  RenderIdleActorsSystem,
  RenderMovingActorsSystem,
} from '../Systems';
import { GeneralBehaviourBlackBoard } from '../Behaviours';

export class WorldScene extends Scene {
  player!: ReturnType<typeof PlayerEntity>;
  npcs!: ReturnType<typeof NpcEntity>[];

  constructor(public game: Game) {
    super();
  }

  public onActivate() {
    this.world.systemManager.addSystem(new PlayerControlSystem());
    this.world.systemManager.addSystem(new RenderIdleActorsSystem());
    this.world.systemManager.addSystem(new RenderMovingActorsSystem());
    this.world.systemManager.addSystem(new CameraFocusSystem());
    this.world.systemManager.addSystem(
      new BehaviourTreeSystem(GeneralBehaviourBlackBoard, this)
    );

    World.addToScene(this, 'Level_1');
    World.generateEntities('Level_1', {
      default: (entity) => {
        const [x, y] = entity.px;
        const position = vec(x, y);
        const firstName = entity.getFieldValue<string>('name', 'Unnamed');
        const npc = NpcEntity({
          firstName,
          position,
        });
        placeActor(npc, position);
      },
      player: (entity) => {
        const [x, y] = entity.px;
        const position = vec(x, y);
        const player = PlayerEntity({
          firstName: 'Player1',
          position,
        });
        placeActor(player, position);
      },
    });
  }
}

export const WorldSceneKey = 'world';
