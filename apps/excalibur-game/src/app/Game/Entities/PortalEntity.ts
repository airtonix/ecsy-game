import { Actor, CollisionType, Vector } from 'excalibur';

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
};
export const PortalEntity = ({ position }: PortalEntityProps) => {
  const actor = new Actor({
    name: 'prop',
    pos: position,
    collisionType: CollisionType.Passive,
  });

  actor.on('collisionstart', (event) => {
    const touchable = actor.get(TouchableComponent);
    if (!touchable) return;
    if (touchable.touchedBy.has(actor.id.toString())) return;
    touchable.touchedBy.set(event.actor.id.toString(), event.actor);
  });
  actor.on('collisionend', (event) => {
    const touchable = actor.get(TouchableComponent);
    if (!touchable) return;
    if (!touchable.touchedBy.has(actor.id.toString())) return;
    touchable.touchedBy.delete(event.actor.id.toString());
  });

  actor
    .addComponent(new PropTagComponent())
    .addComponent(new CharacterRenderIdleComponent(PortalIdleAnimation))
    .addComponent(new TouchableComponent())
    .addComponent(
      new BehaviourTreeComponent(
        `root {
      sequence until(IsBeingTouched) {
        action [TeleportTouchingActors]
      }
    }`,
        {
          IsBeingTouched,
          TeleportTouchingActors,
        }
      )
    );

  return actor;
};
