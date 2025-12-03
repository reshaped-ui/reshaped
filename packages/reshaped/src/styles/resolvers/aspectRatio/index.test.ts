import { expect, test, describe } from "vitest";

import aspectRatio from "./index";

describe("Styles/AspectRatio", () => {
	test("handles positive value", () => {
		expect(aspectRatio(1 / 2)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(aspectRatio(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(aspectRatio()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(aspectRatio({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});
