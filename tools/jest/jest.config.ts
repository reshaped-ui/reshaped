import path from "path";

export default {
	rootDir: "../../",
	testEnvironment: "jsdom",
	transform: { "\\.ts$": ["ts-jest"] },
	setupFilesAfterEnv: ["./tools/jest/jest.setup.ts"],
	roots: ["./src"],
	preset: "ts-jest",
	transformIgnorePatterns: [".+(?!culori).+\\.js$"],
	moduleDirectories: ["node_modules", path.join(__dirname, "../../src")],
	moduleNameMapper: {
		"\\.css$": "identity-obj-proxy",
	},
};
