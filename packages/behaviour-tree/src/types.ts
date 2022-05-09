import { Entity } from 'excalibur';
import { State } from 'mistreevous';

export type BehaviourTreeBlackBoard = Record<
  string | symbol,
  (
    entity: Entity,
    ...args: (string | boolean | number)[]
  ) => State | string | boolean | number
>;
