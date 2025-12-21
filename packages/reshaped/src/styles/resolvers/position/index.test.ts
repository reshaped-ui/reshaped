import { expect, test, describe } from "vitest";

import position from "./index";

describe("Styles/Position", () => {
	test("handles value", () => {
		expect(position("absolute")).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(position()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(position({ s: "absolute", l: "fixed" })).toMatchSnapshot();
	});
});
