import { expect, test, describe } from "vitest";
import getBleedStyles from "./index";

describe("Styles/Bleed", () => {
	test("handles positive value", () => {
		expect(getBleedStyles(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(getBleedStyles(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(getBleedStyles()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(getBleedStyles({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});
