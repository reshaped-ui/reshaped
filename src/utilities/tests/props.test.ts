import { describe, test, expect } from "vitest";

import { classNames, responsiveClassNames, responsivePropDependency } from "utilities/props";

describe("Utilities/Props/classNames", () => {
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

describe("Utilities/Props/responsiveClassNames", () => {
	const s = { "--size-small": "small", "--size-medium--l": "medium" };

	test("handles non-responsive value", () => {
		expect(responsiveClassNames(s, "--size", "small")).toStrictEqual(["small"]);
	});

	test("handles responsive value", () => {
		expect(responsiveClassNames(s, "--size", { s: "small", l: "medium" })).toStrictEqual([
			"small",
			"medium",
		]);
	});

	test("handles responsive value with only small value passed", () => {
		expect(responsiveClassNames(s, "--size", { s: "small" })).toStrictEqual(["small"]);
	});
});

describe("Utilities/Props/responsivePropDependency", () => {
	test("handles responsive prop", () => {
		expect(
			responsivePropDependency({ s: true, l: false }, (v) => {
				return v ? "foo" : "bar";
			})
		).toStrictEqual({ s: "foo", l: "bar" });
	});

	test("handles non-responsive prop", () => {
		expect(
			responsivePropDependency(true, (v) => {
				return v ? "foo" : "bar";
			})
		).toStrictEqual("foo");
	});
});
