import { World } from 'ecstra';

import { MovableSystem } from './MoveableSystem';
import { RendererSystem } from './RenderableSystem';
import { ZombieFollowSystem } from './ZombieFollowSystem';
export const world = new World()
  .register(MovableSystem)
  .register(RendererSystem)
  .register(ZombieFollowSystem);
