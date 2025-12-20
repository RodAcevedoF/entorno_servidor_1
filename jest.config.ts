import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  verbose: true,
  // Map ESM-only 'uuid' to a small TypeScript manual mock so we don't need extra bundlers
  moduleNameMapper: {
    '^uuid$': '<rootDir>/__mocks__/uuid.ts',
  },
  transformIgnorePatterns: ['node_modules/(?!uuid)'],
};

export default config;
