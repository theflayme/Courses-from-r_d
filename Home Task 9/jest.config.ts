/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/test/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  clearMocks: true,

  transform: {
    '^.+\\.ts?$': ['ts-jest', { useESM: false }],
  },
};
