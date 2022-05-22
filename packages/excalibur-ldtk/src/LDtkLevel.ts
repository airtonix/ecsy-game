import { Logger, Scene, TileMap, Vector } from 'excalibur';

import { LDtkLayerComponent } from './LDtkLayerComponent';
import {
  BgPos,
  LayerInstance,
  Level,
  LevelBackgroundPosition,
  NeighbourLevel,
} from './ldtk';
import { LDtkFieldInstance, getField } from './LDtkFieldInstance';
import { LDtkLayerInstance } from './LDtkLayerInstance';

function uniqueId(prefix: string) {
  return `${prefix}${uniqueId.count++}`;
}
uniqueId.count = 0;

export class LDtkLevel
  implements Omit<Level, 'fieldInstances' | 'levelInstances'>
{
  bgColor: string;
  bgPos?: LevelBackgroundPosition | null | undefined;
  neighbours: NeighbourLevel[];
  smartColor: string;
  levelBgColor?: string | null | undefined;
  bgPivotX: number;
  bgPivotY: number;
  levelBgPos?: BgPos | null | undefined;
  bgRelPath?: string | null | undefined;
  externalRelPath?: string | null | undefined;
  identifier: string;
  iid: string;
  layerInstances: LayerInstance[];
  layers: Record<string, LDtkLayerInstance>;
  fields: Record<string, LDtkFieldInstance>;
  pxHei: number;
  pxWid: number;
  uid: number;
  useAutoIdentifier: boolean;
  worldDepth: number;
  worldX: number;
  worldY: number;

  cameras: {
    pos: Vector;
    zoom: number;
    index: number;
  }[];
  constructor(level: Level) {
    this.bgColor = level.bgColor;
    this.bgPivotX = level.bgPivotX;
    this.bgPivotY = level.bgPivotY;
    this.bgPos = level.bgPos;
    this.neighbours = level.neighbours;
    this.smartColor = level.smartColor;
    this.bgRelPath = level.bgRelPath;
    this.externalRelPath = level.externalRelPath;
    this.identifier = level.identifier;
    this.iid = level.iid;
    this.pxHei = level.pxHei;
    this.pxWid = level.pxWid;
    this.uid = level.uid;
    this.useAutoIdentifier = level.useAutoIdentifier;
    this.worldDepth = level.worldDepth;
    this.worldX = level.worldX;
    this.worldY = level.worldY;

    this.fields = level.fieldInstances.reduce<typeof this.fields>(
      (fields, field) => {
        fields[field.identifier] = new LDtkFieldInstance(field);
        return fields;
      },
      {}
    );

    this.layerInstances = level.layerInstances || [];

    this.layers = !level.layerInstances
      ? {}
      : level.layerInstances.reduce<typeof this.layers>((layers, layer) => {
          layers[layer.iid] = new LDtkLayerInstance(layer);
          return layers;
        }, {});

    this.cameras = this.findCameraPositions();
  }

  public getField<T = unknown>(prop: string) {
    return getField<T>(Object.values(this.fields), prop);
  }

  public hasField(key: string, value?: string | number | boolean) {
    const field = this.fields[key];
    return !!field && value && field.value === value;
  }

  findCameraPositions() {
    return this.getEntityLayers()
      .reduce<typeof this.cameras>((cameras, layer, layerIndex) => {
        const entities = layer.getEntitiesByIdentifier('camera');
        if (entities.length) {
          return cameras?.concat(
            entities.map((entity, entityIndex) => {
              const zoom = entity.getField<number>('zoom');
              const index = entity.getField<number>('index');
              const [x, y] = entity.px;
              return {
                pos: new Vector(x, y),
                zoom: zoom ? zoom.value : 1,
                index: Number(index || layerIndex * entityIndex),
              };
            })
          );
        }
        return cameras;
      }, [])
      .sort((prev, next) => {
        if (prev.index < next.index) return -1;
        if (prev.index > next.index) return 1;
        return 0;
      });
  }

  /**
   * Returns a layer by its identifier
   * @param identifier
   * @returns
   */
  getLayerByIdentifier(identifier: string) {
    return Object.values(this.layers).find((layer) => {
      return layer.identifier === identifier;
    });
  }

  /**
   * Get layer by ID
   * @param id
   * @returns
   */
  getLayerById(id: string) {
    return this.layers[id];
  }

  getLayersByType(type: LayerInstance['type']) {
    return Object.values(this.layers).filter((layer) => layer.type === type);
  }
  getLayersByTypes(...types: LayerInstance['type'][]) {
    return Object.values(this.layers).filter((layer) =>
      types.includes(layer.type)
    );
  }

  getLayerZindex(layerId: string) {
    return this.layerInstances.findIndex((layer) => layer.iid === layerId);
  }

  getEntityLayers() {
    return Object.values(this.layers).filter((layer) => {
      return layer.type === 'Entities';
    });
  }

  zoomToCameraStart(scene: Scene) {
    const [camera] = this.cameras;
    if (camera) {
      scene.camera.x = camera.pos.x;
      scene.camera.y = camera.pos.y;
      scene.camera.zoom = camera.zoom;
    }
  }
}
