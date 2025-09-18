export default {
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.setup.js'], // aquí ponemos el polyfill
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
};
