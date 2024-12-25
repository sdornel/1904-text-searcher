import { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.app.json'
      }
    ]
  },
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/node_modules/tailwindcss",
  },
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$))'
  ],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};

export default config;