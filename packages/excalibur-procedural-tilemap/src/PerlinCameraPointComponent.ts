import { Component, Vector } from 'excalibur';
export const PerlinCameraPointType = 'ecsygame.perlincamerapoint' as const;

export class PerlinCameraPointComponent extends Component<
  typeof PerlinCameraPointType
> {
  type = PerlinCameraPointType;
  constructor(public point: Vector) {
    super();
  }
}
