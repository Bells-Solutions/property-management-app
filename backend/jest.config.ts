import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/*.spec.ts"],
    setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    moduleDirectories: ["node_modules", "src"], // Fixed directories
    rootDir: "src",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest",
    },
    collectCoverageFrom: ["**/*.{ts,js}"], // Fixed coverage pattern
    coverageDirectory: "../coverage",
    setupFiles: ["dotenv/config"],
};

export default config;
