import { expect, test, describe } from "vitest";
import getMinWidthStyles from "./index";

describe("Styles/MinWidth", () => {
	test("handles px value", () => {
		expect(getMinWidthStyles("50px")).toMatchSnapshot();
	});

	test("handles % value", () => {
		expect(getMinWidthStyles("50%")).toMatchSnapshot();
	});

	test("handles unit value", () => {
		expect(getMinWidthStyles(5)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(getMinWidthStyles()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(getMinWidthStyles({ s: "50px", l: "50%" })).toMatchSnapshot();
	});
});
