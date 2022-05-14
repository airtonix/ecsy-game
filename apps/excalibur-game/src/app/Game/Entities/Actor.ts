import {
  Actor,
  ActorArgs,
  CircleCollider,
  CollisionType,
  vec,
} from 'excalibur';

export class BaseActor extends Actor {
  constructor(options: ActorArgs) {
    super(
      Object.assign(
        {
          width: 8,
          height: 8,
          collisionType: CollisionType.Active,
          collider: new CircleCollider({ offset: vec(0, 8), radius: 8 }),
        },
        options
      )
    );
  }
}
