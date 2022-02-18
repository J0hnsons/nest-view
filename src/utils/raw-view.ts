import { PropViewOptions } from '@decorators/view/prop-view.decorator';
import { symbols } from '@helpers/enums/view-symbols';
import { propMaker } from '@helpers/prop-maker';

export function rawView(
  object: Record<string, PropViewOptions>,
  config: Omit<PropViewOptions, 'type'> = {}
) {
  const type = {};
  for (const [key, prop] of Object.entries(object)) {
    type[key] = propMaker(prop);
  }
  return { type, config, [symbols.rawObject]: true };
}
