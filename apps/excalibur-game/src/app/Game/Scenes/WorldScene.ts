import { Engine, Scene, vec } from 'excalibur';

import { BehaviourTreeSystem } from '@ecsygame/behaviour-tree';
// import {
//   LDtkEntitySpawnerSystem,
//   LDtkOrthogonalColliderSystem,
//   LDtkOrthogonalSystem,
//   LDtkOrthogonalTilemap,
// } from '@ecsygame/excalibur-ldtk';
import {
  PerlinChunkSystem,
  PerlinMapSystem,
  PerlinTileMapEntity,
} from '@ecsygame/excalibur-procedural-tilemap';

import { Game } from '../../Core/Game';
// import { World } from '../Resources';
import {
  CameraFocusOnEntitySystem,
  PlayerControlSystem,
  RenderIdleActorsSystem,
  RenderMovingActorsSystem,
} from '../Systems';
import { CameraFollowPointrEntity /* EntityFactory */ } from '../Entities';

export const WorldSceneKey = 'world';
export class WorldScene extends Scene {
  public map!: ReturnType<typeof PerlinTileMapEntity>;
  public cameraFocusOn!: ReturnType<typeof CameraFollowPointrEntity>;

  constructor(public game: Game) {
    super();
  }

  public onActivate() {
    this.world.systemManager.addSystem(new PlayerControlSystem());
    this.world.systemManager.addSystem(new RenderIdleActorsSystem());
    this.world.systemManager.addSystem(new RenderMovingActorsSystem());
    this.world.systemManager.addSystem(new CameraFocusOnEntitySystem());
    this.world.systemManager.addSystem(new BehaviourTreeSystem());
    const chunkSystem = new PerlinChunkSystem();
    this.world.systemManager.addSystem(chunkSystem);
    this.world.systemManager.addSystem(new PerlinMapSystem());

    // this.world.systemManager.addSystem(new LDtkOrthogonalSystem());
    // this.world.systemManager.addSystem(
    //   new LDtkOrthogonalColliderSystem((world, level, layer, tile) => {
    //     const tileIndex = layer.autoLayerTiles.indexOf(tile);
    //     const intGridCSV = layer.intGridCSV || [];
    //     return intGridCSV[tileIndex] ? intGridCSV[tileIndex] === 3 : false;
    //   })
    // );
    // this.world.systemManager.addSystem(
    //   new LDtkEntitySpawnerSystem(EntityFactory)
    // );
    // this.tilemap = LDtkOrthogonalTilemap(World, 'Level_1');
    // this.add(this.tilemap);

    this.cameraFocusOn = CameraFollowPointrEntity({ position: vec(0, 0) });
    this.add(this.cameraFocusOn);
    chunkSystem.camera = this.cameraFocusOn.pos;
  }
}
