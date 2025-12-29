import { expect, test, describe, beforeEach, vi, afterAll } from "vitest";

import isRTL from "../isRTL";

describe("i18n/isRTL", () => {
	beforeEach(() => {
		document.documentElement.removeAttribute("dir");
	});

	afterAll(() => {
		document.documentElement.removeAttribute("dir");
	});

	test("returns true when dir attribute is set to 'rtl'", () => {
		document.documentElement.dir = "rtl";
		expect(isRTL()).toBe(true);
	});

	test("returns false when dir attribute is set to 'ltr'", () => {
		document.documentElement.dir = "ltr";
		expect(isRTL()).toBe(false);
	});

	test("returns true when dir attribute is not set but computed style direction is 'rtl'", () => {
		window.getComputedStyle = vi.fn(
			() =>
				({
					direction: "rtl",
				}) as CSSStyleDeclaration
		);

		expect(isRTL()).toBe(true);
	});

	test("returns false when dir attribute is not set and computed style direction is 'ltr'", () => {
		window.getComputedStyle = vi.fn(
			() =>
				({
					direction: "ltr",
				}) as CSSStyleDeclaration
		);

		expect(isRTL()).toBe(false);
	});

	test("returns false when dir attribute is empty string", () => {
		document.documentElement.dir = "";
		window.getComputedStyle = vi.fn(
			() =>
				({
					direction: "rtl",
				}) as CSSStyleDeclaration
		);

		expect(isRTL()).toBe(true);
	});

	test("returns false when dir attribute is invalid value", () => {
		document.documentElement.dir = "invalid";
		window.getComputedStyle = vi.fn(
			() =>
				({
					direction: "rtl",
				}) as CSSStyleDeclaration
		);

		expect(isRTL()).toBe(true);
	});

	test("prioritizes dir attribute over computed style", () => {
		document.documentElement.dir = "ltr";
		window.getComputedStyle = vi.fn(
			() =>
				({
					direction: "rtl",
				}) as CSSStyleDeclaration
		);

		expect(isRTL()).toBe(false);
	});
});
