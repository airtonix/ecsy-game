import { Actor, vec } from 'excalibur';

import { LDtkEntity } from '@ecsygame/excalibur-ldtk';

import { NpcEntity } from './NpcEntity';
import { PlayerEntity } from './PlayerEntity';
import { PortalEntity } from './PortalEntity';

export const EntityFactory = new Map<string, (entity: LDtkEntity) => Actor>();

EntityFactory.set('Portal', (entity: LDtkEntity) => {
  const [x, y] = entity.px;
  const position = vec(x, y);
  const target = entity.getFieldValue<object>('To', {});

  return PortalEntity({
    position,
    target,
  });
});

EntityFactory.set('Npc', (entity: LDtkEntity) => {
  const [x, y] = entity.px;
  const position = vec(x, y);
  const firstName = entity.getFieldValue<string>('name', 'Unnamed');
  return NpcEntity({
    firstName,
    position,
  });
});

EntityFactory.set('Player', (entity: LDtkEntity) => {
  const [x, y] = entity.px;
  const position = vec(x, y);
  return PlayerEntity({
    firstName: 'Player1',
    position,
  });
});
