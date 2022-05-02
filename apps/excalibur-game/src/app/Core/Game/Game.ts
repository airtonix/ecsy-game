import {
  Actor,
  Color,
  DisplayMode,
  Engine,
  Input,
  Resolution,
} from 'excalibur';

export class Game extends Engine {
  constructor(public canvasElement: HTMLCanvasElement) {
    super({
      displayMode: DisplayMode.FillContainer,
      backgroundColor: Color.Black,
      canvasElement,
      pointerScope: Input.PointerScope.Canvas,

      antialiasing: false,
    });

    this.input.keyboard.on('press', (evt) => {
      if (evt.key === Input.Keys.D) {
        this.toggleDebug();
      }
    });
  }

  reset() {
    this.stop();
    resetCamera(this);
    this.currentScene.tileMaps.forEach((t) => {
      this.currentScene.remove(t);
    });
    this.currentScene.entities.forEach((a) => {
      this.currentScene.remove(a);
    });
    this.start();
  }

  zoomToActor(actor: Actor) {
    zoomToActor(this, actor);
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
