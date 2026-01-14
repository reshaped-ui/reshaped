import { describe, test, expect } from "vitest";

import { responsiveClassNames, responsivePropDependency } from "utilities/props";

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
