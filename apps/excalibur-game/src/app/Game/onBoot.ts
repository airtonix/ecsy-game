import { Game } from '../Core/Game';

import { WorldSceneKey } from './Scenes';
export const onBoot = (game: Game) => {
  game.goToScene(WorldSceneKey);
  return;
};
