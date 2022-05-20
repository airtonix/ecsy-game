import { EntityInstance, FieldInstance, TilesetRectangle } from './ldtk';
import { LDtkFieldInstance, getField } from './LDtkFieldInstance';

export class LDtkEntity implements Omit<EntityInstance, 'fieldInstances'> {
  grid: number[];
  identifier: string;
  pivot: number[];
  smartColor: string;
  tags: string[];
  tile?: TilesetRectangle | null | undefined;
  defUid: number;
  height: number;
  iid: string;
  px: number[];
  width: number;

  fields: Record<string, LDtkFieldInstance>;

  constructor(entity: EntityInstance) {
    this.grid = entity.grid;
    this.identifier = entity.identifier;
    this.pivot = entity.pivot;
    this.smartColor = entity.smartColor;
    this.tags = entity.tags;
    this.tile = entity.tile;
    this.defUid = entity.defUid;
    this.height = entity.height;
    this.iid = entity.iid;
    this.px = entity.px;
    this.width = entity.width;

    this.fields = entity.fieldInstances.reduce<typeof this.fields>(
      (fields, field) => {
        fields[field.identifier] = new LDtkFieldInstance(field);
        return fields;
      },
      {}
    );
  }

  public getField<T = unknown>(prop: string) {
    return getField<T>(Object.values(this.fields), prop);
  }

  public hasField(key: string, value?: string | number | boolean) {
    const field = this.fields[key];
    return !!field && value && field.value === value;
  }
}
