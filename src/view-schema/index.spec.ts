import { Example, testResult } from '@examples/view-schema/index.example';
import { viewToSchema } from '.';

describe('Testing maker...', () => {
  test('Test object maker', () => {
    expect(viewToSchema(Example)).toMatchObject(testResult);
  });
});
