module.exports = {
  testEnvironment: "jsdom",
  testMatch: ['<rootDir>/src/tests/unit-test/jsdom/*.test.js'],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./src/tests/results/unit-tests/",
        filename: "jsdom-tests.html",
      },
    ],
  ],
};
