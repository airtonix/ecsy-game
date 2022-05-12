import { MotionComponent, TransformComponent, vec } from 'excalibur';
import { State } from 'mistreevous';

import type { BehaviourAction } from '@ecsygame/behaviour-tree';

import { MovementToTargetComponent } from '../Components';
import { seed } from '../../Core/Game';

/**
 * Indicates to the Tree that the entity is still moving nor not
 */
export const PickRandomTarget: BehaviourAction = (entity, scene) => {
  const moveTo = entity.get(MovementToTargetComponent);
  const transform = entity.get(TransformComponent);
  const motion = entity.get(MotionComponent);

  if (!transform || !motion || !moveTo) return State.FAILED;

  const map = scene.tileMaps[0];
  const bounds = {
    topleft: vec(0, 0),
    bottomright: vec(map.cellWidth * map.cols, map.cellHeight * map.rows),
  };

  moveTo.target = transform.pos.add(
    vec(
      seed.integer(bounds.topleft.x, bounds.bottomright.x),
      seed.integer(bounds.topleft.y, bounds.bottomright.y)
    )
      .sub(transform.pos)
      .scale(0.1)
  );

  return State.SUCCEEDED;
};
