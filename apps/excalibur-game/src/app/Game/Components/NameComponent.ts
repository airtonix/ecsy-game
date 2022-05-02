import { Component } from 'excalibur';

type NameComponentType = 'name';
export class NameComponent extends Component<NameComponentType> {
  readonly type: NameComponentType = 'name';

  constructor(
    public salutation: string,
    public firstName: string,
    public lastName: string
  ) {
    super();
  }
}
