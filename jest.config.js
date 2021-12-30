// eslint-disable-next-line no-undef
module.exports = {
  transform: {
    '\\.js$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.js$',
};
