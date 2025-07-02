module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testRegex: '.*\\.(spec|test)\\.(ts|js)$',
  collectCoverageFrom: ['src/**/*.{ts,js}', '!src/**/*.d.ts'],
};
