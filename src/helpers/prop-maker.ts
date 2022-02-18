import { symbols as viewSymbols } from './enums/view-symbols';
import { Type } from '@nestjs/common';
import { arrayMaker } from './array-maker';
import { viewMaker } from './view-maker';
import { possibleTypes, PropViewOptions } from '@decorators/view';

export type propMaker = {
  type: possibleTypes | Record<string, propMaker> | Record<string, propMaker>[];
  config: Omit<PropViewOptions, 'type'>;
};

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
    type: type as possibleTypes,
    config,
  };
}
