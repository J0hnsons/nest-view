import { Example, data, testResult } from '@examples/view/index.example';
import { view } from '.';

describe('Testing maker...', () => {
  test('Test object maker', () => {
    expect(view(Example, data)).toMatchObject(testResult);
  });
});
