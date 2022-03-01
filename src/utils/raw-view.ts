import { PropViewOptions } from '@decorators/view/prop-view.decorator';
import { symbols } from '@helpers/enums/view-symbols';
import { propMaker } from '@helpers/prop-maker';

/**
 * Another options to create a view pass a object of prop options
 *
 * @param object object of prop view
 * @param config Extra view configs
 * @returns Normalized object to create object or schema
 */
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
