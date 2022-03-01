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
export type constructors =
  | StringConstructor
  | BooleanConstructor
  | NumberConstructor
  | DateConstructor;
export interface PropViewOptions extends Omit<SchemaObject, exclude> {
  type: constructors | Type | (constructors | Type)[];
  path?: string | string[];
  required?: boolean;
}

/**
 * Decorate a prop to make a data object or a Schema object of a view
 *
 * @param options Options to create a prop
 * @returns Decorator that return type and configuration of a prop
 */
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
