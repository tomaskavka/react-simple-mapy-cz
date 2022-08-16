/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  rootDir: './',
  testEnvironment: 'jsdom',
  roots: ['./src'],
  transform: {'^.+\\.tsx?$': 'ts-jest'},
  testMatch: ['**/?(*.)+(test).ts(x)?'],
  testPathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  clearMocks: true,
  coverageDirectory: '.coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/index.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!**/node_modules/**',
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  verbose: true,
};
