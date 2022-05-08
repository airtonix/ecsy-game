import { TiledMapResource } from '@excaliburjs/plugin-tiled';
import {
  Actor,
  Color,
  DisplayMode,
  Engine,
  Input,
  Random,
  Scene,
  Vector,
  vec,
} from 'excalibur';

export class Game extends Engine {
  public seed!: Random;
  constructor(public canvasElement: HTMLCanvasElement, seed?: number) {
    super({
      displayMode: DisplayMode.FillContainer,
      backgroundColor: Color.Black,
      canvasElement,
      pointerScope: Input.PointerScope.Canvas,
      antialiasing: false,
      snapToPixel: true,
    });

    this.seed = new Random(seed);

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
    zoomToActor(this.currentScene, actor);
  }
}

type CreateGameProps = {
  canvas: HTMLCanvasElement;
};
export function createGame({ canvas }: CreateGameProps) {
  const game = new Game(canvas);
  return game;
}

export function zoomToActor(scene: Scene, actor: Actor) {
  scene.camera.strategy.elasticToActor(actor, 0.2, 0.2);
  scene.camera.zoomOverTime(2, 200);
}

type GetMapStartProps = {
  map: TiledMapResource;
  name: string;
};
export function getMapStart({ map, name }: GetMapStartProps) {
  const objects = map.data.getExcaliburObjects();
  const start = objects[0].getObjectByName(name);
  return vec(start?.x || 0, start?.y || 0);
}

export function placeActor(actor: Actor, position: Vector, zIndex?: number) {
  actor.pos.x = position.x;
  actor.pos.y = position.y;
  actor.z = zIndex || 1;
}

export function resetCamera(game: Game) {
  game.currentScene.camera.clearAllStrategies();
  game.currentScene.camera.x = game.drawWidth;
  game.currentScene.camera.y = game.drawHeight;
  game.currentScene.camera.zoomOverTime(2, 200);
}
