import { Entity } from 'excalibur';

import { PerlinTileMapComponent } from './PerlinTileMapComponent';

export function PerlinTileMapEntity() {
  const entity = new Entity();
  entity.addComponent(new PerlinTileMapComponent());

  return entity;
}
