import { Entity } from 'excalibur';

import { EnumDefinition, TilesetDefinition, World } from './ldtk';

/**
 * An Enum value
 */
export interface EnumValue {
  /**
   * Unique string identifier
   */
  id: string;
  /**
   * Pixel x,y coordinates and width/height into the parent {@link Enum.tileset}
   */
  tileSrcRect: { x: number; y: number; width: number; height: number };
}
/**
 * Enums are special value types for Entities. ({@link Entity})
 *
 * They could be for example the list of possible Enemy types, or a list of Item identifiers.
 *
 * Each Enum is made up of one or more values. ({@link EnumValue})
 *
 * Visit https://ldtk.io/docs/general/editor-components/enumerations-enums/ for more information.
 */
export class Enum {
  /**
   * A map of Enum value ids to Enum values.
   */
  readonly valueMap: Readonly<Record<string, EnumValue>>;
  /**
   * Array of this Enum's value ids
   */
  readonly valueIds: string[];
  /**
   * Array of this Enum's values
   */
  readonly values: EnumValue[];
  /**
   * Optional icon tileset
   */
  readonly tileset: TilesetDefinition | null = null;

  constructor(public readonly world: World, private data: EnumDefinition) {
    this.valueMap = {};
    for (let i = 0; i < data.values.length; ++i) {
      const v = data.values[i];
      if (!v.tileSrcRect) continue;

      (this.valueMap as Record<string, EnumValue>)[v.id] = {
        id: v.id,
        tileSrcRect: {
          x: v.tileSrcRect[0],
          y: v.tileSrcRect[1],
          width: v.tileSrcRect[2],
          height: v.tileSrcRect[3],
        },
      };
    }

    this.valueIds = Object.keys(this.valueMap);
    this.values = Object.values(this.valueMap);

    // if (this.data.iconTilesetUid !== null) {
    // this.tileset = world.findTilesetByUid(this.data.iconTilesetUid) ?? null;
    // }
  }

  /** Unique string identifier */
  get id(): string {
    return this.data.identifier;
  }
  /** Unique Int identifier */
  get uid(): number {
    return this.data.uid;
  }
}
