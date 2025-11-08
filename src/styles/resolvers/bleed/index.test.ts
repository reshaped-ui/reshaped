import { expect, test, describe } from "vitest";

import bleed from "./index";

describe("Styles/Bleed", () => {
	test("handles positive value", () => {
		expect(bleed(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(bleed(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(bleed()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(bleed({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});
