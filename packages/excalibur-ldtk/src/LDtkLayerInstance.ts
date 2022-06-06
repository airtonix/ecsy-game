import { Entity } from 'excalibur';

import {
  EntityInstance,
  IntGridValueInstance,
  LayerInstance,
  TileInstance,
} from './ldtk';
import { LDtkEntity } from './LDtkEntity';

export class LDtkLayerInstance implements LayerInstance {
  cHei: number;
  cWid: number;
  gridSize: number;
  identifier: string;
  opacity: number;
  pxTotalOffsetX: number;
  pxTotalOffsetY: number;
  tilesetDefUid?: number | null | undefined;
  tilesetRelPath?: string | null | undefined;
  type: 'IntGrid' | 'Entities' | 'Tiles' | 'AutoLayer';
  autoLayerTiles: TileInstance[];
  entityInstances: EntityInstance[];
  gridTiles: TileInstance[];
  iid: string;
  intGrid?: IntGridValueInstance[] | null | undefined;
  intGridCSV: number[];
  layerDefUid: number;
  levelID: number;
  optionalRules: number[];
  overrideTilesetUid?: number | null | undefined;
  pxOffsetX: number;
  pxOffsetY: number;
  seed: number;
  visible: boolean;

  entities: Record<string, LDtkEntity>;

  constructor(layer: LayerInstance) {
    this.cHei = layer.cHei;
    this.cWid = layer.cWid;
    this.gridSize = layer.gridSize;
    this.identifier = layer.identifier;
    this.opacity = layer.opacity;
    this.pxTotalOffsetX = layer.pxTotalOffsetX;
    this.pxTotalOffsetY = layer.pxTotalOffsetY;
    this.tilesetDefUid = layer.tilesetDefUid;
    this.tilesetRelPath = layer.tilesetRelPath;
    this.type = layer.type;
    this.autoLayerTiles = layer.autoLayerTiles;
    this.entityInstances = layer.entityInstances;
    this.gridTiles = layer.gridTiles;
    this.iid = layer.iid;
    this.intGrid = layer.intGrid;
    this.intGridCSV = layer.intGridCSV;
    this.layerDefUid = layer.layerDefUid;
    this.levelID = layer.levelID;
    this.optionalRules = layer.optionalRules;
    this.overrideTilesetUid = layer.overrideTilesetUid;
    this.pxOffsetX = layer.pxOffsetX;
    this.pxOffsetY = layer.pxOffsetY;
    this.seed = layer.seed;
    this.visible = layer.visible;

    this.entities = this.entityInstances.reduce<typeof this.entities>(
      (entities, entity) => {
        entities[entity.iid] = new LDtkEntity(entity);
        return entities;
      },
      {}
    );
  }

  getEntitiesByTags(tags: string[]) {
    return Object.values(this.entities).filter((entity) => {
      return tags.every((tag) => entity.tags.includes(tag));
    });
  }

  getEntitiesByField(key: string, value: string | number | boolean) {
    return Object.values(this.entities).filter((entity) => {
      return entity.hasField(key, value);
    });
  }

  /**
   * Returns an entity by its type identifier
   * @param identifier
   * @returns
   */
  getEntitiesByIdentifier(identifier: string) {
    return Object.values(this.entities).filter(
      (entity) => entity.identifier === identifier
    );
  }
  getEntitiesByType = this.getEntitiesByIdentifier.bind(this);
}
