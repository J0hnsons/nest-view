import { Type } from '@nestjs/common';
import { arrayMaker } from './array-maker';
import { symbols } from './enums/view-symbols';
import { propMaker } from './prop-maker';
import { viewMaker } from './view-maker';

function verifyView(view: Type) {
  if (!Reflect.getMetadata(symbols.view, view)) {
    throw new Error(`"${view.name}" is not a view`);
  }
}

export function maker(view: Type | (Type | Type[])[]): propMaker | propMaker[] {
  if (Array.isArray(view)) {
    return view.map((item) => {
      if (Array.isArray(item)) return { type: arrayMaker(item), config: {} };
      verifyView(item);
      return { type: viewMaker(item), config: {} };
    });
  }
  verifyView(view);
  return { type: viewMaker(view), config: {} };
}
