import { ViewOptions } from '@decorators/view/view.decorator';
import { maker } from '@helpers';
import { Type } from '@nestjs/common';
import { arraySchema } from './array-schema';
import { propSchema } from './prop-schema';

function normalize() {}

export function viewToSchema(
  view: Type | (Type | Type[])[],
  normalizer: keyof ViewOptions
) {
  const viewObject = maker(view);
  if (Array.isArray(viewObject)) return arraySchema(viewObject);
  return propSchema(viewObject);
}
