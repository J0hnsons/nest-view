import { Type } from '@nestjs/common';
import { symbols } from './enums/view-symbols';
import { propMaker } from './prop-maker';

// Make a normalized object with a View
export function viewMaker(_view: Type): Record<string, propMaker> {
  const view = new _view();
  const result = {};
  for (const key of view[symbols.propsKey]()) {
    result[key] = view[key]();
  }
  return result;
}
