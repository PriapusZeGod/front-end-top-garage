"module".exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },

  transformIgnorePatterns: ["/node_modules/", "^.+\\.css$"],
  testEnvironment: "jsdom",
};
