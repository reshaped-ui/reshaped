import { expect, test, describe } from "vitest";

import radius from "./index";

describe("Styles/Radius", () => {
	test("handles value", () => {
		expect(radius("large")).toMatchSnapshot();
	});

	test("handles none", () => {
		expect(radius("none")).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(radius()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(radius({ s: "small", m: "none", l: "circular" })).toMatchSnapshot();
	});
});
