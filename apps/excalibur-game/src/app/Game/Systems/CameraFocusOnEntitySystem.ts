import {
  Actor,
  BodyComponent,
  Entity,
  Scene,
  System,
  SystemType,
} from 'excalibur';

import { zoomToActor } from '../../Core/Game';
import { CameraFocusedTagComponent } from '../Components';

export class CameraFocusOnEntitySystem extends System<
  CameraFocusedTagComponent | BodyComponent
> {
  systemType: SystemType = SystemType.Update;
  types = ['game.camera.focus', 'ex.body'] as const;

  scene!: Scene;
  initialize(scene: Scene) {
    this.scene = scene;
  }
  update(entities: Entity[]) {
    const entity = entities[0];

    if (!entity) return;

    if (!(entity instanceof Actor))
      throw new Error(
        `CameraFocusOnEntitySystem can only track an Actor with CameraFocusedTagComponent. The entity ${entity.id} is not an Actor`
      );

    if (entities.length > 1)
      throw new Error(
        `CameraFocusOnEntitySystem can only track one Actor. The following entities have CameraFocusedTagComponent: ${entities
          .map((entity) => entity.id)
          .join(',')}`
      );

    zoomToActor(this.scene, entity);
  }
}
