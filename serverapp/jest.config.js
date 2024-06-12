export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  testMatch: ["<rootDir>/test/**/*.(spec|test).[tj]s?(x)"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};