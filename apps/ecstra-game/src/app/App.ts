import { SPEED_MULTIPLIER } from './constants';
import { FollowTarget } from './FollowTargetComponent';
import { PlayerTag } from './PlayerTagComponent';
import { Position2D } from './Position2DComponent';
import { Renderable } from './RenderableComponent';
import { Shape } from './ShapeComponent';
import { world } from './World';
import { ZombieTag } from './ZombieTagComponent';
import { canvas } from './Canvas';
import { Velocity } from './VelocityComponent';

function getRandomVelocity(): { x: number; y: number } {
  return {
    x: SPEED_MULTIPLIER * (2 * Math.random() - 1),
    y: SPEED_MULTIPLIER * (2 * Math.random() - 1),
  };
}
function getRandomPosition(): { x: number; y: number } {
  return {
    x: Math.random() * canvas.canvasWidth,
    y: Math.random() * canvas.canvasHeight,
  };
}
function getRandomShape(): { primitive: string } {
  return {
    primitive: Math.random() >= 0.5 ? 'circle' : 'box',
  };
}

export const App = () => {
  const playerEntity = world
    .create()
    .add(PlayerTag)
    .add(Velocity, getRandomVelocity())
    .add(Position2D, getRandomPosition())
    .add(Renderable)
    .add(Shape, {
      primitive: 'circle',
    });

  const playerPosition = playerEntity.read(Position2D);
  // Creates 100 zombies at random positions with a `FollowTarget` component that
  // will make them follow our player.
  for (let i = 0; i < 4; ++i) {
    world
      .create()
      .add(ZombieTag)
      .add(Renderable)
      .add(Velocity, getRandomVelocity())
      .add(Shape, { primitive: 'box' })
      .add(Position2D, {
        x: Math.floor(Math.random() * 50.0) - 100.0,
        y: Math.floor(Math.random() * 50.0) - 100.0,
      })
      .add(FollowTarget, { target: playerPosition });
  }

  // Runs the animation loop and execute all systems every frame.

  let lastTime = 0.0;
  function loop() {
    const currTime = performance.now();
    const deltaTime = currTime - lastTime;
    lastTime = currTime;
    world.execute(deltaTime);
    requestAnimationFrame(loop);
  }
  lastTime = performance.now();
  loop();
};
