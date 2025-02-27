import { expect, test, describe } from "vitest";
import getPaddingStyles from "./index";

describe("Styles/Padding", () => {
	test("handles positive value", () => {
		expect(getPaddingStyles(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(getPaddingStyles(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(getPaddingStyles()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(getPaddingStyles({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});
