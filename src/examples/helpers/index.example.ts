import { PropView, View } from '../../decorators/view';
import { rawView } from '../../utils/raw-view';
@View()
class ArrayMakerAux {
  @PropView({ type: String })
  test: string;
}

@View()
export class Example {
  @PropView({ type: ArrayMakerAux })
  test1: ArrayMakerAux;
  @PropView(rawView({ test1: { type: Boolean }, test2: { type: Boolean } }))
  test2: Record<'test' | 'test2', boolean>;
  @PropView({ type: String })
  test3: string;
  @PropView({ type: [Number] })
  test4: number[];
}

export const testResult = {
  config: {},
  type: {
    test1: {
      config: {},
      type: {
        test: {
          config: {},
          type: String,
        },
      },
    },
    test2: {
      config: {},
      type: {
        test1: {
          config: {},
          type: Boolean,
        },
        test2: {
          config: {},
          type: Boolean,
        },
      },
    },
    test3: {
      config: {},
      type: String,
    },
    test4: {
      config: {},
      type: [
        {
          config: {},
          type: Number,
        },
      ],
    },
  },
};
