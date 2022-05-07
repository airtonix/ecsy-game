import { Scene } from 'excalibur';

import { zoomToActor } from '../../Core/Game';
import { getMapStart, placeActor } from '../../Core/Game/Game';
import { PlayerEntity } from '../Entities';
import { WorldTilemap } from '../Resources';
import {
  PlayerInputSytem,
  RenderIdleActorsSystem,
  RenderMovingActorsSystem,
} from '../Systems';

export class WorldScene extends Scene {
  player!: ReturnType<typeof PlayerEntity>;

  public onActivate() {
    this.world.systemManager.addSystem(new RenderIdleActorsSystem());
    this.world.systemManager.addSystem(new PlayerInputSytem());
    this.world.systemManager.addSystem(new RenderMovingActorsSystem());

    WorldTilemap.addTiledMapToScene(this);
    const actorLayer = WorldTilemap.data.getObjectLayerByName('Actors');
    const actorZindex = actorLayer.getProperty<number>('zIndex');
    this.tileMaps.forEach((tilemap, index) => {
      const tilemapLayer = WorldTilemap.data.layers[index];
      tilemap.z = tilemapLayer.getProperty<number>('zIndex')?.value || 0;
    });

    const start = getMapStart({ map: WorldTilemap });
    this.player = PlayerEntity({ firstName: 'Player1', position: start });
    this.add(this.player);
    placeActor(this.player, start, actorZindex?.value || 1);
    zoomToActor(this, this.player);
  }
}

export const WorldSceneKey = 'world';
