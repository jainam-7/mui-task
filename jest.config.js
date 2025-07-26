const nextJest = require("next/jest")

const createJestConfig = nextJest({
  //provide the path to your nextjs app to load next.config.js an d .env file
  dir: "./",
})

//add any custom config to be passed to jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
    "^@/styles/(.*)$": "<rootDir>/styles/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "core/**/*.{js,jsx,ts,tsx}",
    "features/**/*.{js,jsx,ts,tsx}",
    "shared/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testMatch: ["**/__tests__/**/*.(js|jsx|ts|tsx)", "**/*.(test|spec).(js|jsx|ts|tsx)"],
}

module.exports = createJestConfig(customJestConfig)
