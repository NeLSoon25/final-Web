module.exports = {
  testEnvironment: "node",
  testMatch: ['<rootDir>/src/tests/unit-test/node/*.test.js'],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./src/tests/results/unit-tests/",
        filename: "node-tests.html",
      },
    ],
  ],
};
