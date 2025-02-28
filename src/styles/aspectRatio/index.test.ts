import { expect, test, describe } from "vitest";
import getAspectRatioStyles from "./index";

describe("Styles/AspectRatio", () => {
	test("handles positive value", () => {
		expect(getAspectRatioStyles(1 / 2)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(getAspectRatioStyles(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(getAspectRatioStyles()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(getAspectRatioStyles({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});
