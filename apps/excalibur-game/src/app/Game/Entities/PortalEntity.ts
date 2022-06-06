import { Actor, CollisionType, Shape, Vector } from 'excalibur';

import { BehaviourTreeComponent } from '@ecsygame/behaviour-tree';

import { PortalIdleAnimation } from '../Resources';
import {
  CharacterRenderIdleComponent,
  PropTagComponent,
  TouchableComponent,
} from '../Components';
import { IsBeingTouched, TeleportTouchingActors } from '../Behaviours';

/**
 * As more Data Components  are used, join their initialising props here
 */
type PortalEntityProps = {
  position: Vector;
  target: any;
};
export const PortalEntity = ({ position, target }: PortalEntityProps) => {
  const actor = new Actor({
    name: 'prop',
    pos: position,
    collider: Shape.Box(16, 16),
    collisionType: CollisionType.Fixed,
  });

  actor.on('collisionstart', (event) => {
    const { target, other } = event;
    const touchable = target.get(TouchableComponent);
    if (!touchable) return;
    if (touchable.touchedBy.has(other.id.toString())) return;
    touchable.touchedBy.set(other.id.toString(), other);
  });
  actor.on('collisionend', (event) => {
    const { target, other } = event;
    const touchable = target.get(TouchableComponent);
    if (!touchable) return;
    if (!touchable.touchedBy.has(other.id.toString())) return;
    touchable.touchedBy.delete(other.id.toString());
  });

  actor
    .addComponent(new PropTagComponent())
    .addComponent(new CharacterRenderIdleComponent(PortalIdleAnimation))
    .addComponent(new TouchableComponent())
    .addComponent(
      new BehaviourTreeComponent(
        `root {
      sequence while(IsBeingTouched) {
        action [TeleportTouchingActors]
      }
    }`,
        {
          IsBeingTouched,
          TeleportTouchingActors: TeleportTouchingActors({
            target,
          }),
        }
      )
    );

  return actor;
};
