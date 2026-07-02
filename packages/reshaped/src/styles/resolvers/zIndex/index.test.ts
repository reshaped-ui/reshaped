import { describe, expect, test } from "vitest";

import zIndex from "./index";

describe("Styles/ZIndex", () => {
	test("handles numeric value", () => {
		expect(zIndex(5)).toMatchSnapshot();
	});

	test("handles token value", () => {
		expect(zIndex("fixed")).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(zIndex()).toMatchSnapshot();
	});
});
