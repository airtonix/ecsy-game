import { Vector } from 'excalibur';

export function hashPosition(position: Vector) {
  return `${position.x}_${position.y}`;
}
