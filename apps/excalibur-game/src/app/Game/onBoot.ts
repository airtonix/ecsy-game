import { Input } from 'excalibur';

import { Game, zoomToActor } from '../Core/Game';

import { WorldSceneKey } from './Scenes';
import { Tilemap } from './Resources';
import { PlayerEntity } from './Entities';
import { prepareMap } from './prepareMap';
export const onBoot = (game: Game) => {
  const isIsometric = false;
  const player = PlayerEntity({ name: 'player1' });
  prepareMap({ player, game, map: Tilemap });

  setTimeout(() => {
    game.currentScene.camera.x = player.pos.x;
    game.currentScene.camera.y = player.pos.y;
    game.currentScene.camera.zoom = 2;
  });

  zoomToActor(game, player);

  game.goToScene(WorldSceneKey);
  game.add(player);
  Tilemap.addTiledMapToScene(game.currentScene);
  player.onPostUpdate = () => {
    player.vel.setTo(0, 0);
    const speed = isIsometric ? 64 * 2 : 64;
    if (game.input.keyboard.isHeld(Input.Keys.Right)) {
      player.vel.x = speed;
      if (isIsometric) {
        player.vel.y = speed;
      }
    }
    if (game.input.keyboard.isHeld(Input.Keys.Left)) {
      player.vel.x = -speed;
      if (isIsometric) {
        player.vel.y = -speed;
      }
    }
    if (game.input.keyboard.isHeld(Input.Keys.Up)) {
      player.vel.y = -speed;
      if (isIsometric) {
        player.vel.x = speed;
      }
    }
    if (game.input.keyboard.isHeld(Input.Keys.Down)) {
      player.vel.y = speed;
      if (isIsometric) {
        player.vel.x = -speed;
      }
    }
    game.zoomToActor(player);
  };
  return;
};
