import { ViewOptions } from '@decorators/view/view.decorator';
import { maker } from '@helpers';
import { Type } from '@nestjs/common';
import { arraySchema } from './array-schema';
import { propSchema } from './prop-schema';

/**
 * Create schema with a view
 *
 * @param view View class
 * @param pattern If a view Have a pattern put the return schema object inside a pattern schema
 * @returns Schema object of a view
 */
export function viewToSchema(
  view: Type | (Type | Type[])[],
  pattern?: keyof ViewOptions
) {
  const viewObject = maker(view);
  if (Array.isArray(viewObject)) return arraySchema(viewObject);
  return propSchema(viewObject);
}
