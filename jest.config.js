module.exports = {
  automock: false,
  setupFiles: ['./setupJest.ts'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/src/'],
};
