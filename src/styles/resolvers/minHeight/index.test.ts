import { expect, test, describe } from "vitest";
import getMinHeightStyles from "./index";

describe("Styles/MinHeight", () => {
	test("handles px value", () => {
		expect(getMinHeightStyles("50px")).toMatchSnapshot();
	});

	test("handles % value", () => {
		expect(getMinHeightStyles("50%")).toMatchSnapshot();
	});

	test("handles unit value", () => {
		expect(getMinHeightStyles(5)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(getMinHeightStyles()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(getMinHeightStyles({ s: "50px", l: "50%" })).toMatchSnapshot();
	});
});
