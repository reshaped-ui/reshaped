import { expect, test, describe } from "vitest";
import getHeightStyles from "./index";

describe("Styles/Height", () => {
	test("handles px value", () => {
		expect(getHeightStyles("50px")).toMatchSnapshot();
	});

	test("handles % value", () => {
		expect(getHeightStyles("50%")).toMatchSnapshot();
	});

	test("handles unit value", () => {
		expect(getHeightStyles(5)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(getHeightStyles()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(getHeightStyles({ s: "50px", l: "50%" })).toMatchSnapshot();
	});
});
