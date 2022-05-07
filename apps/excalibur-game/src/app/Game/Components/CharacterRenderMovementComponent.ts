import { Animation, Component } from 'excalibur';

export class CharacterRenderMovementComponent extends Component<'game.render_movement'> {
  readonly type = 'game.render_movement';
  public last_direction: 'up' | 'down' | 'left' | 'right' = 'down';

  constructor(
    public idle_up: Animation,
    public idle_down: Animation,
    public idle_left: Animation,
    public idle_right: Animation,
    public move_up: Animation,
    public move_down: Animation,
    public move_left: Animation,
    public move_right: Animation
  ) {
    super();
  }
}
