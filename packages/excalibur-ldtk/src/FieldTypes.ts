import { Enum } from './Enum';
import { FieldInstanceGridPoint } from './ldtk';

export const enum FieldType {
  /**
   * Value type: `number | null`
   *
   * Associated interface: {@link IntField}
   */
  Int = 'Int',
  /**
   * Value type: `number[]`
   *
   * Associated interface: {@link IntArrayField}
   */
  IntArray = 'IntArray',
  /**
   * Value type: `number | null`
   *
   * Associated interface: {@link Float}
   */
  Float = 'Float',
  /**
   * Value type: `number[]`
   *
   * Associated interface: {@link FloatArrayField}
   */
  FloatArray = 'FloatArray',
  /**
   * Value type: `string`
   *
   * Associated interface: {@link StringField}
   */
  String = 'String',
  /**
   * Value type: `string[]`
   *
   * Associated interface: {@link StringArrayField}
   */
  StringArray = 'StringArray',
  /**
   * Value type: `number`
   *
   * Associated interface: {@link BoolField}
   */
  Bool = 'Bool',
  /**
   * Value type: `number[]`
   *
   * Associated interface: {@link BoolArrayField}
   */
  BoolArray = 'BoolArray',
  /**
   * Value type: `string`
   *
   * Associated interface: {@Point}
   */
  Color = 'Color',
  /**
   * Value type: `string[]`
   *
   * Associated interface: {@link ColorArrayField}
   */
  ColorArray = 'ColorArray',
  /**
   * Value type: `number`
   *
   * Associated interface: {@link PointField}
   */
  Point = 'Point',
  /**
   * Value type: `number[]`
   *
   * Associated interface: {@link PointArrayField}
   */
  PointArray = 'PointArray',
  /**
   * Value type: `string`
   *
   * Associated interface: {@link FilePathField}
   */
  FilePath = 'FilePath',
  /**
   * Value type: `string[]`
   *
   * Associated interface: {@link FilePathField}
   */
  FilePathArray = 'FilePathArray',
  /**
   * Value type: `string`
   *
   * Associated interface: {@link EnumField}
   */
  Enum = 'Enum',
  /**
   * Value type: `string[]`
   *
   * Associated interface: {@link EnumArrayField}
   */
  EnumArray = 'EnumArray',
}
export interface IntField {
  id: string;
  type: FieldType.Int;
  value: number | null;
}
export interface FloatField {
  id: string;
  type: FieldType.Float;
  value: number | null;
}
export interface StringField {
  id: string;
  type: FieldType.String;
  value: string | null;
}
export interface BoolField {
  id: string;
  type: FieldType.Bool;
  value: boolean | null;
}
export interface ColorField {
  id: string;
  type: FieldType.Color;
  value: string | null;
}
export interface PointField {
  id: string;
  type: FieldType.Point;
  value: FieldInstanceGridPoint | null;
}
export interface FilePathField {
  id: string;
  type: FieldType.FilePath;
  value: string | null;
}
/** Enum fields contain a reference to the associated {@link Enum} */
export interface EnumField {
  id: string;
  type: FieldType.Enum;
  value: string | null;
  ref: Enum;
}
export interface IntArrayField {
  id: string;
  type: FieldType.IntArray;
  value: number[];
}
export interface FloatArrayField {
  id: string;
  type: FieldType.FloatArray;
  value: number[];
}
export interface StringArrayField {
  id: string;
  type: FieldType.StringArray;
  value: string[];
}
export interface BoolArrayField {
  id: string;
  type: FieldType.BoolArray;
  value: boolean[];
}
export interface ColorArrayField {
  id: string;
  type: FieldType.ColorArray;
  value: string[];
}
export interface PointArrayField {
  id: string;
  type: FieldType.PointArray;
  value: FieldInstanceGridPoint[];
}
export interface FilePathArrayField {
  id: string;
  type: FieldType.FilePathArray;
  value: string[];
}
/** Enum fields contain a reference to the associated {@link Enum} */
export interface EnumArrayField {
  id: string;
  type: FieldType.EnumArray;
  value: string[];
  ref: Enum;
}

/**
 * Represents a pre-parsed Entity field
 *
 * Examples:
 *
 * `Array<MyEnum.A>` will result in:
 * ```
 * { type: "Enum", value: "A", ref: MyEnum }
 * ```
 * Where `MyEnum` is not an identifier, but a
 * reference to the Enum:
 * ```
 * const entity = layer.entities[0];
 * entity.fields["enum_field"].ref.uid // you can access the enum properties
 * ```
 *
 * Having all the field interfaces in a union allows narrowing a generic
 * field type down to a specific field type:
 *
 * ```
 * const field: Field = // ...
 * if (field.type === FieldType.Int) {
 *     // value has type `number | null`
 *     const value = field.value;
 * }
 * ```
 */
export type Field =
  | IntField
  | FloatField
  | StringField
  | BoolField
  | ColorField
  | PointField
  | FilePathField
  | EnumField
  | IntArrayField
  | FloatArrayField
  | StringArrayField
  | BoolArrayField
  | ColorArrayField
  | PointArrayField
  | FilePathArrayField
  | EnumArrayField;

export const FieldTypeRegex = /(?:Array<)*(?:(\w+)Enum)*\.*(\w+)>*/;
export const isIntFieldValue = (
  value: any,
  type: FieldType
): value is IntField => value !== null && type === FieldType.Int;
export const isFloatFieldValue = (
  value: any,
  type: FieldType
): value is FloatField['value'] => value !== null && type === FieldType.Float;
export const isStringFieldValue = (
  value: any,
  type: FieldType
): value is StringField['value'] => value !== null && type === FieldType.String;
export const isBoolFieldValue = (
  value: any,
  type: FieldType
): value is BoolField['value'] => value !== null && type === FieldType.Bool;
export const isColorFieldValue = (
  value: any,
  type: FieldType
): value is ColorField['value'] => value !== null && type === FieldType.Color;
export const isPointFieldValue = (
  value: any,
  type: FieldType
): value is PointField['value'] => value !== null && type === FieldType.Point;
export const isFilePathFieldValue = (
  value: any,
  type: FieldType
): value is FilePathField['value'] =>
  value !== null && type === FieldType.FilePath;
export const isEnumFieldValue = (
  value: any,
  type: FieldType
): value is EnumField['value'] => value !== null && type === FieldType.Enum;
export const isIntArrayFieldValue = (
  value: any,
  type: FieldType
): value is IntArrayField['value'] =>
  value !== null && type === FieldType.IntArray;
export const isFloatArrayFieldValue = (
  value: any,
  type: FieldType
): value is FloatArrayField['value'] =>
  value !== null && type === FieldType.FloatArray;
export const isStringArrayFieldValue = (
  value: any,
  type: FieldType
): value is StringArrayField['value'] =>
  value !== null && type === FieldType.StringArray;
export const isBoolArrayFieldValue = (
  value: any,
  type: FieldType
): value is BoolArrayField['value'] =>
  value !== null && type === FieldType.BoolArray;
export const isColorArrayFieldValue = (
  value: any,
  type: FieldType
): value is ColorArrayField['value'] =>
  value !== null && type === FieldType.ColorArray;
export const isPointArrayFieldValue = (
  value: any,
  type: FieldType
): value is PointArrayField['value'] =>
  value !== null && type === FieldType.PointArray;
export const isFilePathArrayFieldValue = (
  value: any,
  type: FieldType
): value is FilePathArrayField['value'] =>
  value !== null && type === FieldType.FilePathArray;
export const isEnumArrayFieldValue = (
  value: any,
  type: FieldType
): value is EnumArrayField['value'] =>
  value !== null && type === FieldType.EnumArray;
