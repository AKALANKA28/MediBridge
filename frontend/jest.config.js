module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest", // Ensure Babel handles your JS files
  },
  "moduleNameMapper": {
    "\\.(css|less|scss)$": "identity-obj-proxy", // To mock CSS imports
    "\\.(gif|jpeg|jpg|png|svg)$": "<rootDir>/src/__mocks__/fileMock.js" // To mock image imports
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)", // Ensure axios is transformed
  ],
};
