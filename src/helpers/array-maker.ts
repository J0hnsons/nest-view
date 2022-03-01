import { constructors } from '@decorators/view/prop-view.decorator';
import { Type } from '@nestjs/common';
import { propMaker } from './prop-maker';

//Make normalized object with a array
export function arrayMaker(array: (constructors | Type)[]) {
  return array.map((item) => propMaker({ type: item }));
}
