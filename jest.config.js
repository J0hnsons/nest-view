function moduleNameMapper() {
  const { paths } = require('./tsconfig.json').compilerOptions;
  const map = {};
  for (const [key, [value]] of Object.entries(paths)) {
    map[key.replace('/*', '/(.*)')] = `<rootDir>${value.replace('/*', '/$1')}`;
  }
  return map;
}
module.exports = {
  rootDir: '.',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: moduleNameMapper(),
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
