import { Color, DisplayMode, Engine } from 'excalibur';
import { Actor, Font, FontUnit, Label, Vector, vec } from 'excalibur';

export class Game extends Engine {
  constructor(public canvasElement: HTMLCanvasElement) {
    super({
      displayMode: DisplayMode.FillContainer,
      backgroundColor: Color.Black,
      canvasElement,
    });
  }
}

type CreateGameProps = {
  canvas: HTMLCanvasElement;
};
export function createGame({ canvas }: CreateGameProps) {
  const game = new Game(canvas);
  return game;
}

export function zoomToActor(game: Game, actor: Actor) {
  game.currentScene.camera.strategy.elasticToActor(actor, 0.2, 0.2);
  game.currentScene.camera.zoomOverTime(2, 200);
}

export function resetCamera(game: Game) {
  game.currentScene.camera.clearAllStrategies();
  game.currentScene.camera.x = game.drawWidth;
  game.currentScene.camera.y = game.drawHeight;
  game.currentScene.camera.zoomOverTime(1, 200);
}
