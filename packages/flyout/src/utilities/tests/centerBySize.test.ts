import { expect, test, describe } from "vitest";

import centerBySize from "utilities/centerBySize";

describe("utilities/centerBySize", () => {
	test("centers even value", () => {
		expect(centerBySize(100, 50)).toEqual(25);
	});

	test("centers odd", () => {
		expect(centerBySize(100, 25)).toEqual(37);
	});
});
