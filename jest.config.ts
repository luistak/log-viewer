import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./src",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["\\.mock\\.ts$"],

  moduleNameMapper: {
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/services/(.*)$": "<rootDir>/src/services/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
  },
};

export default createJestConfig(config);
