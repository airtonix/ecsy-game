import { Scene, vec } from 'excalibur';

import { BehaviourTreeSystem } from '@ecsygame/behaviour-tree';

import { Game, getMapStart, placeActor, zoomToActor } from '../../Core/Game';
import { NpcEntity, PlayerEntity } from '../Entities';
import { WorldTilemap } from '../Resources';
import {
  CameraFocusSystem,
  NavMeshSystem,
  PlayerControlSystem,
  RenderIdleActorsSystem,
  RenderMovingActorsSystem,
} from '../Systems';
import { GeneralBehaviourBlackBoard } from '../Behaviours';

export class WorldScene extends Scene {
  map = WorldTilemap;
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
    const navmeshsystem = new NavMeshSystem(this);
    this.world.systemManager.addSystem(navmeshsystem);

    this.map.addTiledMapToScene(this);

    const actorLayer = this.map.data.getObjectLayerByName('Actors');
    const actorZindex = actorLayer.getProperty<number>('zIndex');
    this.tileMaps.forEach((tilemap, index) => {
      const tilemapLayer = this.map.data.layers[index];
      tilemap.z = tilemapLayer.getProperty<number>('zIndex')?.value || 0;
    });
    const navmesh = navmeshsystem.buildMeshFromTiled(
      'npc',
      this.map.data.getObjectLayerByName('navmesh'),
      10
    );
    this.add(navmesh);
    placeActor(navmesh, vec(0, 0), 100);

    const playerStart = getMapStart({
      map: this.map,
      name: 'player-start',
    });
    const npcStart = getMapStart({
      map: this.map,
      name: 'npc-start',
    });
    this.player = PlayerEntity({ firstName: 'Player1', position: playerStart });
    this.npcs = [NpcEntity({ firstName: 'Mark', position: npcStart })];

    this.add(this.player);
    this.npcs.forEach((npc) => {
      this.add(npc);
      placeActor(
        npc,
        vec(npcStart.x + 20, npcStart.y + 20),
        actorZindex?.value || 1
      );
    });
    placeActor(this.player, playerStart, actorZindex?.value || 1);
    zoomToActor(this, this.player);
  }
}

export const WorldSceneKey = 'world';
