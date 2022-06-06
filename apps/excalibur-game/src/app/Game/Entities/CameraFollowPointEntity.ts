import { Color, Rectangle, Vector } from 'excalibur';

import { PerlinCameraPointComponent } from '@ecsygame/excalibur-procedural-tilemap';

import {
  CameraFocusedTagComponent,
  CharacterInputComponent,
} from '../Components';

import { BaseActor } from './Actor';

type PlayerEntityProps = {
  position: Vector;
};
export const CameraFollowPointrEntity = ({ position }: PlayerEntityProps) => {
  const actor = new BaseActor({
    name: 'camera-follow-point',
    pos: position,
  });

  actor
    .addComponent(new CameraFocusedTagComponent())
    .addComponent(new PerlinCameraPointComponent(actor.body.pos))
    .addComponent(new CharacterInputComponent(128));

  actor.graphics.use(new Rectangle({ width: 8, height: 8, color: Color.Rose }));

  actor.z = 100;
  return actor;
};
