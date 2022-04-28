import { System, queries } from 'ecstra';

import { ZombieTag } from './ZombieTagComponent';
import { FollowTarget } from './FollowTargetComponent';
import { Position2D } from './Position2DComponent';

@queries({
  zombies: [ZombieTag, FollowTarget, Position2D],
})
export class ZombieFollowSystem extends System {
  execute(delta: number): void {
    this.queries.zombies.execute((entity) => {
      const option = entity.read(FollowTarget);
      if (!option) return;
      const { speed, target } = option;

      const position = entity.write(Position2D);
      if (!position) return;

      const deltaX = target.x - position.x;
      const deltaY = target.y - position.y;
      const len = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (len >= 0.00001) {
        position.x += speed * delta * (deltaX / len);
        position.y += speed * delta * (deltaY / len);
      }
    });
  }
}
