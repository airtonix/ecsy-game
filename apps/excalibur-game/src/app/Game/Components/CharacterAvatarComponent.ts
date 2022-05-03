import { Animation, Component } from 'excalibur';

export class CharacterAvatarComponent extends Component<'avatar'> {
  readonly type = 'avatar';

  constructor(
    public idle: Animation,
    public move_up: Animation,
    public move_down: Animation,
    public move_left: Animation,
    public move_right: Animation
  ) {
    super();
  }
}
