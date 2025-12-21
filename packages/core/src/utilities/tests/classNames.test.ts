import { describe, test, expect } from "vitest";

import { classNames } from "utilities/classNames";

describe("Utilities/classNames", () => {
	test("returns a single className", () => {
		expect(classNames("foo")).toBe("foo");
	});

	test("returns multiple classNames", () => {
		expect(classNames(["foo", "bar"])).toBe("foo bar");
	});

	test("ignores falsy values", () => {
		const flag = false;
		expect(classNames(["foo", flag && "baz", undefined, null, "bar"])).toBe("foo bar");
	});

	test("handles nested arrays", () => {
		expect(classNames(["foo", ["bar", "baz"]])).toBe("foo bar baz");
	});
});
