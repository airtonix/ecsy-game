import { Animation, Component } from 'excalibur';

export class CharacterRenderIdleComponent extends Component<'game.render_idle'> {
  readonly type = 'game.render_idle';

  constructor(public idle: Animation) {
    super();
  }
}
