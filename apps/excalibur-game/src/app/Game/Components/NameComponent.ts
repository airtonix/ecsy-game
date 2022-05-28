import { Component } from 'excalibur';

type NameComponentType = 'game.name';
export class NameComponent extends Component<NameComponentType> {
  readonly type = 'game.name';
  public salutation!: string;
  public firstName!: string;
  public lastName!: string;

  constructor(
    public props: Partial<
      Pick<NameComponent, 'salutation' | 'firstName' | 'lastName'>
    >
  ) {
    super();
    Object.assign(this, props);
  }
}
