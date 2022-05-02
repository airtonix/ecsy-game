import { Game } from '../Core/Game';

import { WorldScene, WorldSceneKey } from './Scenes';

export const init = async (game: Game) => {
  game?.addScene(WorldSceneKey, new WorldScene());
};
