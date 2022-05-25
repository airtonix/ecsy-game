import {
  FieldType,
  FieldTypeRegex,
  isBoolArrayFieldValue,
  isBoolFieldValue,
  isColorArrayFieldValue,
  isColorFieldValue,
  isEnumArrayFieldValue,
  isEnumFieldValue,
  isFilePathArrayFieldValue,
  isFilePathFieldValue,
  isFloatArrayFieldValue,
  isFloatFieldValue,
  isIntArrayFieldValue,
  isIntFieldValue,
  isPointArrayFieldValue,
  isPointFieldValue,
  isStringArrayFieldValue,
} from './FieldTypes';
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
  type: FieldType;
  value: any;
  defUid: number;
  realEditorValues: any[];

  constructor(field: FieldInstance) {
    this.identifier = field.identifier;
    this.tile = field.tile;
    this.type = getFieldType(field);
    this.value = field.value;
    this.defUid = field.defUid;
    this.realEditorValues = field.realEditorValues;
  }
}

export function getFieldType(field: FieldInstance) {
  // search for type with format `(Array<)? (LocalEnum|ExternalEnum)? (.)? TYPE (>)?`
  // and capture $1 = (LocalEnum|ExternalEnum) and $2 = TYPE
  const result = FieldTypeRegex.exec(field.type);
  if (!result)
    throw new Error(
      `Error at field '${field.identifier}': Invalid type name ${field.type}`
    );

  // it's an array type if it's in the form Array<T>
  const isArray = field.type.startsWith('Array');
  // it's an enum type if capture $1 is not null
  const isEnum = result[1] !== null;

  // transform the type to fit our own definition
  // e.g. Array<Type> -> TypeArray
  /** @see {FieldType} */
  // all enum types are widened to just `Enum`
  const type = isEnum ? FieldType.Enum : (result[2] as FieldType);
  if (isArray) {
    if (type === FieldType.Bool) return FieldType.BoolArray;
    if (type === FieldType.Color) return FieldType.ColorArray;
    if (type === FieldType.Enum) return FieldType.EnumArray;
    if (type === FieldType.FilePath) return FieldType.FilePathArray;
    if (type === FieldType.Float) return FieldType.FloatArray;
    if (type === FieldType.Int) return FieldType.IntArray;
    if (type === FieldType.Point) return FieldType.PointArray;
    if (type === FieldType.String) return FieldType.StringArray;
  }
  return type;
}

export function parseField(field: FieldInstance) {
  const type = getFieldType(field);

  const id = field.identifier;

  if (isIntFieldValue(field.value, type)) {
    return {};
  } else if (isFloatFieldValue(field.value, type)) {
    return {};
  } else if (isBoolFieldValue(field.value, type)) {
    return {};
  } else if (isColorFieldValue(field.value, type)) {
    return {};
  } else if (isPointFieldValue(field.value, type)) {
    return field.value
      ? {
          id,
          type,
          value: {
            x: field.value.cx,
            y: field.value.cy,
          },
        }
      : {};
  } else if (isFilePathFieldValue(field.value, type)) {
    return {};
  } else if (isEnumFieldValue(field.value, type)) {
    // if the type is `Enum`, additionally append a reference to the enum
    // if (isEnum) output.ref = world.enumMap[typeName];
    return {};
  } else if (isIntArrayFieldValue(field.value, type)) {
    return {};
  } else if (isFloatArrayFieldValue(field.value, type)) {
    return {};
  } else if (isStringArrayFieldValue(field.value, type)) {
    return {};
  } else if (isBoolArrayFieldValue(field.value, type)) {
    return {};
  } else if (isColorArrayFieldValue(field.value, type)) {
    return {};
  } else if (isPointArrayFieldValue(field.value, type)) {
    const value = field.value.map(({ cx, cy }) => ({ x: cx, y: cy }));
    return {
      id,
      type,
      value,
    };
  } else if (isFilePathArrayFieldValue(field.value, type)) {
    return {};
  } else if (isEnumArrayFieldValue(field.value, type)) {
    // if the type is `Enum`, additionally append a reference to the enum
    // if (isEnum) output.ref = world.enumMap[typeName];
    return {};
  }
  return;
}
