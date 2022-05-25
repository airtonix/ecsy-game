import { Component } from 'excalibur';

import { LDtkWorldResource } from './LDtkWorldResource';

const LDtkOrthogonalComponentKey = 'ldtk.orthogonaltilemap' as const;
type LDtkOrthogonalComponentType = typeof LDtkOrthogonalComponentKey;
export class LDtkOrthogonalComponent extends Component<LDtkOrthogonalComponentType> {
  readonly type = LDtkOrthogonalComponentKey;
  constructor(public world: LDtkWorldResource, public levelId: string) {
    super();
  }
}
