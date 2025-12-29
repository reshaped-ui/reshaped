import { expect, test, describe } from "vitest";

import getPositionFallbacks from "flyout/utilities/getPositionFallbacks";

describe("flyout/getPositionFallbacks", () => {
	test("returns original position first for top-start", () => {
		const result = getPositionFallbacks("top-start");
		expect(result[0]).toBe("top-start");
	});

	test("returns fallback order for top-start", () => {
		const result = getPositionFallbacks("top-start");
		expect(result).toEqual([
			"top-start",
			"top-end",
			"top",
			"bottom-start",
			"bottom-end",
			"bottom",
			"start-top",
			"start-bottom",
			"start",
			"end-top",
			"end-bottom",
			"end",
		]);
	});

	test("returns fallback order for top", () => {
		const result = getPositionFallbacks("top");
		expect(result).toEqual([
			"top",
			"top-start",
			"top-end",
			"bottom",
			"bottom-start",
			"bottom-end",
			"start",
			"start-top",
			"start-bottom",
			"end",
			"end-top",
			"end-bottom",
		]);
	});

	test("returns fallback order for bottom-start", () => {
		const result = getPositionFallbacks("bottom-start");
		expect(result).toEqual([
			"bottom-start",
			"bottom-end",
			"bottom",
			"top-start",
			"top-end",
			"top",
			"end-top",
			"end-bottom",
			"end",
			"start-top",
			"start-bottom",
			"start",
		]);
	});

	test("returns fallback order for start-top", () => {
		const result = getPositionFallbacks("start-top");
		expect(result).toEqual([
			"start-top",
			"start-bottom",
			"start",
			"end-top",
			"end-bottom",
			"end",
			"top-start",
			"top-end",
			"top",
			"bottom-start",
			"bottom-end",
			"bottom",
		]);
	});

	test("returns fallback order for end-bottom", () => {
		const result = getPositionFallbacks("end-bottom");
		expect(result).toEqual([
			"end-bottom",
			"end-top",
			"end",
			"start-bottom",
			"start-top",
			"start",
			"bottom-end",
			"bottom-start",
			"bottom",
			"top-end",
			"top-start",
			"top",
		]);
	});

	test("filters positions based on availableFallbacks", () => {
		const result = getPositionFallbacks("top-start", [
			"top-start",
			"top",
			"bottom-start",
			"start-top",
		]);
		expect(result).toEqual(["top-start", "top", "bottom-start", "start-top"]);
	});

	test("returns only original position when availableFallbacks only contains it", () => {
		const result = getPositionFallbacks("top-start", ["top-start"]);
		expect(result).toEqual(["top-start"]);
	});

	test("excludes positions not in availableFallbacks", () => {
		const result = getPositionFallbacks("top", ["top", "bottom", "start"]);
		expect(result).toEqual(["top", "bottom", "start"]);
	});

	test("maintains order priority when filtering with availableFallbacks", () => {
		const result = getPositionFallbacks("top-end", ["top", "top-end", "bottom", "end"]);
		expect(result).toEqual(["top-end", "top", "bottom", "end"]);
	});
});
