import { Game, zoomToActor } from '../Core/Game';

import { WorldSceneKey } from './Scenes';
import { Tilemap } from './Resources';
import { PlayerEntity } from './Entities';
import { prepareMap } from './prepareMap';
import { RenderableAvatarSystem } from './Systems/RenderableSystem';
import { PlayerInputSytem } from './Systems/PlayerInputSytem';
export const onBoot = (game: Game) => {
  const player = PlayerEntity({ firstName: 'player1' });
  prepareMap({ player, game, map: Tilemap });

  zoomToActor(game.currentScene, player);
  game.goToScene(WorldSceneKey);
  game.currentScene.world.systemManager.addSystem(new RenderableAvatarSystem());
  game.currentScene.world.systemManager.addSystem(new PlayerInputSytem());

  game.add(player);
  Tilemap.addTiledMapToScene(game.currentScene);

  setTimeout(() => {
    game.currentScene.camera.x = player.pos.x;
    game.currentScene.camera.y = player.pos.y;
    game.currentScene.camera.zoom = 2;
  });

  return;
};
