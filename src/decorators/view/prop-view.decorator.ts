import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { Type } from '@nestjs/common';
import { propMaker } from '@helpers/prop-maker';
import { rawView } from '@utils/raw-view';
import { symbols } from '@helpers/enums/view-symbols';
type exclude =
  | 'type'
  | 'allOf'
  | 'oneOf'
  | 'anyOf'
  | 'items'
  | 'properties'
  | 'additionalProperties'
  | 'patternProperties'
  | 'required';
export type possibleTypes =
  | StringConstructor
  | BooleanConstructor
  | NumberConstructor
  | DateConstructor;
export interface PropViewOptions extends Omit<SchemaObject, exclude> {
  type: possibleTypes | Type | (possibleTypes | Type)[];
  path?: string | string[];
  required?: boolean;
}

export function PropView(
  options: PropViewOptions | ReturnType<typeof rawView>
) {
  return (target, propertieKey) => {
    Reflect.set(target, propertieKey, () => {
      if (options?.[symbols.rawObject]) {
        const { type, config } = options as ReturnType<typeof rawView>;
        return { type, config };
      }
      return propMaker(options as PropViewOptions);
    });
  };
}
