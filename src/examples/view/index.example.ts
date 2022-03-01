import { PropView, View } from '@decorators/view';
import { rawView } from '@utils/raw-view';
@View()
class ArrayMakerAux {
  @PropView({ type: String })
  test: string;
}

@View()
export class Example {
  @PropView({ type: ArrayMakerAux, path: 'extra.data' })
  test1: ArrayMakerAux;
  @PropView(rawView({ test1: { type: Boolean }, test2: { type: Boolean } }))
  test2: Record<'test' | 'test2', boolean>;
  @PropView({ type: String })
  test3: string;
  @PropView({ type: [Number] })
  test4: number[];
}

export const data = {
  extra: {
    data: {
      test: true,
    },
  },
  test2: {
    test1: 'false',
    test2: 'true',
  },
  test3: false,
  test4: ['12', '151', '446', '4545'],
};

export const testResult = {
  test1: {
    test: 'true',
  },
  test2: {
    test1: false,
    test2: true,
  },
  test3: 'false',
  test4: [12, 151, 446, 4545],
};
