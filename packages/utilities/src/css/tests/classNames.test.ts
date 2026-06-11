import { describe, expect, test } from "vitest";

import classNames from "../classNames";

describe("helpers/classNames", () => {
	test("returns empty string when no arguments are provided", () => {
		expect(classNames()).toBe("");
	});

	test("returns a single class name", () => {
		expect(classNames("foo")).toBe("foo");
	});

	test("concatenates multiple class names", () => {
		expect(classNames("foo", "bar", "baz")).toBe("foo bar baz");
	});

	test("filters out null values", () => {
		expect(classNames("foo", null, "bar")).toBe("foo bar");
		expect(classNames(null, "foo", null)).toBe("foo");
		expect(classNames(null, null)).toBe("");
	});

	test("filters out undefined values", () => {
		expect(classNames("foo", undefined, "bar")).toBe("foo bar");
		expect(classNames(undefined, "foo", undefined)).toBe("foo");
		expect(classNames(undefined, undefined)).toBe("");
	});

	test("filters out false values", () => {
		expect(classNames("foo", false, "bar")).toBe("foo bar");
		expect(classNames(false, "foo", false)).toBe("foo");
		expect(classNames(false, false)).toBe("");
	});

	test("handles arrays of class names", () => {
		expect(classNames(["foo", "bar"])).toBe("foo bar");
		expect(classNames(["foo", "bar"], "baz")).toBe("foo bar baz");
		expect(classNames("foo", ["bar", "baz"])).toBe("foo bar baz");
	});

	test("handles nested arrays", () => {
		expect(classNames(["foo", ["bar", "baz"]])).toBe("foo bar baz");
		expect(classNames([["foo", "bar"], "baz"])).toBe("foo bar baz");
		expect(classNames([["foo"], ["bar"], ["baz"]])).toBe("foo bar baz");
	});

	test("filters out falsy values in arrays", () => {
		expect(classNames(["foo", null, "bar"])).toBe("foo bar");
		expect(classNames(["foo", undefined, "bar"])).toBe("foo bar");
		expect(classNames(["foo", false, "bar"])).toBe("foo bar");
		expect(classNames([null, undefined, false])).toBe("");
	});

	test("handles deeply nested arrays with falsy values", () => {
		expect(classNames([["foo", null], [undefined, "bar"], false])).toBe("foo bar");
		expect(classNames(["foo", [null, undefined, ["bar", false, "baz"]]])).toBe("foo bar baz");
	});

	test("handles empty arrays", () => {
		expect(classNames([])).toBe("");
		expect(classNames("foo", [], "bar")).toBe("foo bar");
		expect(classNames([[], []])).toBe("");
	});

	test("handles empty strings", () => {
		expect(classNames("", "foo")).toBe("foo");
		expect(classNames("foo", "", "bar")).toBe("foo bar");
		expect(classNames("", "", "")).toBe("");
	});

	test("handles conditional class names", () => {
		const isActive = true;
		const isDisabled = false;

		expect(classNames("button", isActive && "active", isDisabled && "disabled")).toBe(
			"button active"
		);
	});
});
