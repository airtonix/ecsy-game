import { TagComponent } from 'excalibur';

const CameraFocusedTagComponentType = 'game.camera.focus' as const;
export class CameraFocusedTagComponent extends TagComponent<
  typeof CameraFocusedTagComponentType
> {
  constructor() {
    super(CameraFocusedTagComponentType);
  }
}
