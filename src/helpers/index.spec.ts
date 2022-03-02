import { Example, testResult } from '../examples/helpers/index.example';
import { maker } from '.';

describe('Testing maker...', () => {
  test('Test object maker', () => {
    expect(maker(Example)).toMatchObject(testResult);
  });
});
