import { ViewOptions } from '../decorators/view';
import { maker } from '../helpers';
import { Type } from '@nestjs/common';
import { arraySchema } from './array-schema';
import { propSchema } from './prop-schema';
import { symbols } from '../helpers/enums/view-symbols';

/**
 * Create schema with a view
 *
 * @param view View class
 * @param pattern If a view Have a pattern put the return schema object inside a pattern schema
 * @returns Schema object of a view
 */
export function viewToSchema(
  view: Type | (Type | Type[])[],
  pattern?: keyof ViewOptions,
) {
  const viewPatterns: ViewOptions = Reflect.getMetadata(symbols.options, view);
  const viewObject = maker(view);
  const schema = Array.isArray(viewObject)
    ? arraySchema(viewObject)
    : propSchema(viewObject);

  return viewPatterns?.[pattern] ? viewPatterns[pattern](schema) : schema;
}
