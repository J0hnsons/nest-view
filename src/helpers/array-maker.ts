import { possibleTypes } from '@decorators/view/prop-view.decorator';
import { Type } from '@nestjs/common';
import { propMaker } from './prop-maker';

export function arrayMaker(array: (possibleTypes | Type)[]) {
  return array.map((item) => propMaker({ type: item }));
}
