import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
	activateKeyboardMode,
	checkKeyboardMode,
	deactivateKeyboardMode,
	keyboardModeAttribute,
} from "../keyboardMode";

describe("a11y/keyboardMode", () => {
	beforeEach(() => {
		document.documentElement.removeAttribute(keyboardModeAttribute);
	});

	afterEach(() => {
		document.documentElement.removeAttribute(keyboardModeAttribute);
	});

	test("activates keyboard mode by setting attribute", () => {
		expect(document.documentElement.hasAttribute(keyboardModeAttribute)).toBe(false);

		activateKeyboardMode();

		expect(document.documentElement.getAttribute(keyboardModeAttribute)).toBe("true");
	});

	test("deactivates keyboard mode by removing attribute", () => {
		document.documentElement.setAttribute(keyboardModeAttribute, "true");

		deactivateKeyboardMode();

		expect(document.documentElement.hasAttribute(keyboardModeAttribute)).toBe(false);
	});

	test("checks keyboard mode correctly", () => {
		expect(checkKeyboardMode()).toBe(false);

		activateKeyboardMode();
		expect(checkKeyboardMode()).toBe(true);

		deactivateKeyboardMode();
		expect(checkKeyboardMode()).toBe(false);
	});
});
