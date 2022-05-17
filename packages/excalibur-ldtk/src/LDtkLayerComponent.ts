import { Component } from 'excalibur';

import { LayerInstance } from './ldtk';

export class LDtkLayerComponent extends Component<'ldtk.layer'> {
  public readonly type = 'ldtk.layer';
  constructor(public layer: LayerInstance) {
    super();
  }
}
