import { FollowTarget } from './FollowTargetComponent';
import { PlayerTag } from './PlayerTagComponent';
import { Position2D } from './Position2DComponent';
import { Renderable } from './RenderableComponent';
import { Shape } from './ShapeComponent';
import { world } from './World';
import { ZombieTag } from './ZombieTagComponent';

export const App = () => {
  const playerEntity = world
    .create()
    .add(PlayerTag)
    .add(Position2D)
    .add(Renderable)
    .add(Shape, {
      primitive: 'circle',
    });

  const playerPosition = playerEntity.read(Position2D);
  // Creates 100 zombies at random positions with a `FollowTarget` component that
  // will make them follow our player.
  for (let i = 0; i < 100; ++i) {
    world
      .create()
      .add(ZombieTag)
      .add(Renderable)
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
