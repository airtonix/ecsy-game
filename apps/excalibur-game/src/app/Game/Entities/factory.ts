import { vec } from 'excalibur';

import { LDtkEntity } from '@ecsygame/excalibur-ldtk';

import { NpcEntity } from './NpcEntity';
import { PlayerEntity } from './PlayerEntity';
import { PortalEntity } from './PortalEntity';

export const EntityFactory = {
  Portal: (entity: LDtkEntity) => {
    const [x, y] = entity.px;
    const position = vec(x, y);
    return PortalEntity({
      position,
    });
  },
  Npc: (entity: LDtkEntity) => {
    const [x, y] = entity.px;
    const position = vec(x, y);
    const firstName = entity.getFieldValue<string>('name', 'Unnamed');
    return NpcEntity({
      firstName,
      position,
    });
  },
  Player: (entity: LDtkEntity) => {
    const [x, y] = entity.px;
    const position = vec(x, y);
    return PlayerEntity({
      firstName: 'Player1',
      position,
    });
  },
};
