import { symbols as viewSymbols } from './enums/view-symbols';
import { Type } from '@nestjs/common';
import { arrayMaker } from './array-maker';
import { viewMaker } from './view-maker';
import { constructors, PropViewOptions } from '@decorators/view';

export type propMaker = {
  type: constructors | Record<string, propMaker> | Record<string, propMaker>[];
  config: Omit<PropViewOptions, 'type'>;
};

//Make normalized variable with gived prop options
export function propMaker(prop: PropViewOptions) {
  const { type, ...config } = prop;
  if (Array.isArray(type))
    return {
      type: arrayMaker(type),
      config,
    };

  if (Reflect.getMetadata(viewSymbols.view, type)) {
    return {
      type: viewMaker(type as Type),
      config,
    };
  }

  return {
    type: type as constructors,
    config,
  };
}
