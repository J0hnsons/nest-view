import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
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

export const testResult: SchemaObject = {
  type: 'object',
  properties: {
    test1: {
      type: 'object',
      properties: {
        test: {
          type: 'string',
        },
      },
    },
    test2: {
      type: 'object',
      properties: {
        test1: {
          type: 'boolean',
        },
        test2: {
          type: 'boolean',
        },
      },
    },
    test3: {
      type: 'string',
    },
    test4: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
  },
};
