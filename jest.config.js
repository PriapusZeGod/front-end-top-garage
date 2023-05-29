module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/src/**/*.test.{js,jsx,ts,tsx}'],
  testPathIgnorePatterns: ['/node_modules/', '/ios/', '/android/'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}', '!<rootDir>/src/**/*.test.{js,jsx,ts,tsx}'],
};
