const path = require("path");

module.exports = {
	rootDir: "../../",
	testEnvironment: "jsdom",
	transform: { "\\.ts$": ["ts-jest"] },
	setupFilesAfterEnv: ["./tools/jest/jest.setup.ts"],
	roots: ["./src"],
	preset: "ts-jest",
	moduleDirectories: ["node_modules", path.join(__dirname, "../../src")],
	moduleNameMapper: {
		"\\.css$": "<rootDir>/tools/jest/css.stub.js",
	},
};
