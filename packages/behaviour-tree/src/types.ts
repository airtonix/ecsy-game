import { Entity, Scene } from 'excalibur';
import { State } from 'mistreevous';

export type BehaviourAction = (
  entity: Entity,
  scene: Scene,
  ...args: any[]
) => State | undefined | string | boolean | number;

export type BehaviourTreeBlackBoard = Record<string | symbol, BehaviourAction>;
