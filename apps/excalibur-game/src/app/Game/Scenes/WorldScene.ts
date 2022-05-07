import { Scene, vec } from 'excalibur';

import { Game, getMapStart, placeActor, zoomToActor } from '../../Core/Game';
import { NpcEntity, PlayerEntity } from '../Entities';
import { WorldTilemap } from '../Resources';
import {
  CameraFocusSystem,
  PlayerControlSystem,
  RandomControlSystem,
  RenderIdleActorsSystem,
  RenderMovingActorsSystem,
} from '../Systems';

export class WorldScene extends Scene {
  player!: ReturnType<typeof PlayerEntity>;
  npcs!: ReturnType<typeof NpcEntity>[];

  constructor(public game: Game) {
    super();
  }

  public onActivate() {
    this.world.systemManager.addSystem(new PlayerControlSystem());
    this.world.systemManager.addSystem(new RandomControlSystem());
    this.world.systemManager.addSystem(new RenderIdleActorsSystem());
    this.world.systemManager.addSystem(new RenderMovingActorsSystem());
    this.world.systemManager.addSystem(new CameraFocusSystem());

    WorldTilemap.addTiledMapToScene(this);
    const actorLayer = WorldTilemap.data.getObjectLayerByName('Actors');
    const actorZindex = actorLayer.getProperty<number>('zIndex');
    this.tileMaps.forEach((tilemap, index) => {
      const tilemapLayer = WorldTilemap.data.layers[index];
      tilemap.z = tilemapLayer.getProperty<number>('zIndex')?.value || 0;
    });

    const start = getMapStart({ map: WorldTilemap });
    this.player = PlayerEntity({ firstName: 'Player1', position: start });
    this.npcs = [NpcEntity({ firstName: 'Mark', position: start })];

    this.add(this.player);
    this.npcs.forEach((npc) => {
      this.add(npc);
      placeActor(npc, vec(start.x + 20, start.y + 20), actorZindex?.value || 1);
    });
    placeActor(this.player, start, actorZindex?.value || 1);
    zoomToActor(this, this.player);
  }
}

export const WorldSceneKey = 'world';
