import { FieldInstance, TilesetRectangle } from './ldtk';

type TypedFieldInstance<T> = FieldInstance & { value: T };

export const getField = <T>(
  fields: FieldInstance[],
  prop: string
): TypedFieldInstance<T> | undefined => {
  if (Array.isArray(fields)) {
    return fields?.find(
      (field) =>
        field.identifier?.toLocaleLowerCase() === prop.toLocaleLowerCase()
    ) as TypedFieldInstance<T>;
  }
  return;
};

export class LDtkFieldInstance implements FieldInstance {
  identifier: string;
  tile?: TilesetRectangle | null | undefined;
  type: string;
  value: any;
  defUid: number;
  realEditorValues: any[];

  constructor(field: FieldInstance) {
    this.identifier = field.identifier;
    this.tile = field.tile;
    this.type = field.type;
    this.value = field.value;
    this.defUid = field.defUid;
    this.realEditorValues = field.realEditorValues;
  }
}
