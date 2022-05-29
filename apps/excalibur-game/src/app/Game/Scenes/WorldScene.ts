import { Engine, Entity, Scene } from 'excalibur';

import { BehaviourTreeSystem } from '@ecsygame/behaviour-tree';
import {
  LDtkEntitySpawnerSystem,
  LDtkOrthogonalColliderSystem,
  LDtkOrthogonalSystem,
  LDtkOrthogonalTilemap,
} from '@ecsygame/excalibur-ldtk';

import { Game } from '../../Core/Game';
import { World } from '../Resources';
import {
  CameraFocusSystem,
  PlayerControlSystem,
  RenderIdleActorsSystem,
  RenderMovingActorsSystem,
} from '../Systems';
import { EntityFactory } from '../Entities';

export const WorldSceneKey = 'world';
export class WorldScene extends Scene {
  public tilemap!: Entity;

  constructor(public game: Game) {
    super();
  }

  public onInitialize(_engine: Engine): void {
    return;
  }

  public onActivate() {
    this.world.systemManager.addSystem(new PlayerControlSystem());
    this.world.systemManager.addSystem(new RenderIdleActorsSystem());
    this.world.systemManager.addSystem(new RenderMovingActorsSystem());
    this.world.systemManager.addSystem(new CameraFocusSystem());
    this.world.systemManager.addSystem(new BehaviourTreeSystem());
    this.world.systemManager.addSystem(new LDtkOrthogonalSystem());
    this.world.systemManager.addSystem(
      new LDtkOrthogonalColliderSystem((world, level, layer, tile) => {
        const tileIndex = layer.autoLayerTiles.indexOf(tile);
        const intGridCSV = layer.intGridCSV || [];
        return intGridCSV[tileIndex] ? intGridCSV[tileIndex] === 3 : false;
      })
    );
    this.world.systemManager.addSystem(
      new LDtkEntitySpawnerSystem(EntityFactory)
    );

    this.tilemap = LDtkOrthogonalTilemap(World, 'Level_1');
    this.add(this.tilemap);
  }
}
