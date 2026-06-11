import { describe, expect, test } from "vitest";

import centerBySize from "../centerBySize";

describe("flyout/centerBySize", () => {
	test("centers even value", () => {
		expect(centerBySize(100, 50)).toEqual(25);
	});

	test("centers odd", () => {
		expect(centerBySize(100, 25)).toEqual(37);
	});
});
