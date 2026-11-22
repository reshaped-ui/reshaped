import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import {
	getVirtualKeyboardHeight,
	getVirtualKeyboardOffset,
	subscribeVirtualKeyboard,
} from "../virtualKeyboard";

const original = Object.getOwnPropertyDescriptor(window, "visualViewport")!;
let viewport: EventTarget & { height: number; scale: number; offsetTop: number };
let unsubscribe: (() => void) | undefined;

const resize = (args: { height: number; scale?: number }) => {
	viewport.height = args.height;
	viewport.scale = args.scale ?? 1;
	viewport.dispatchEvent(new Event("resize"));
};

const pan = (offsetTop: number) => {
	viewport.offsetTop = offsetTop;
	viewport.dispatchEvent(new Event("scroll"));
};

describe("viewport/virtualKeyboard", () => {
	beforeEach(() => {
		viewport = Object.assign(new EventTarget(), {
			height: window.innerHeight,
			scale: 1,
			offsetTop: 0,
		});
		Object.defineProperty(window, "visualViewport", { configurable: true, value: viewport });
	});

	afterEach(() => {
		unsubscribe?.();
		unsubscribe = undefined;
		// @ts-expect-error Removes the stubbed value from the element itself
		delete document.documentElement.clientHeight;
		Object.defineProperty(window, "visualViewport", original);
	});

	test("returns the height covered by the keyboard", () => {
		const listener = vi.fn();
		unsubscribe = subscribeVirtualKeyboard(listener);

		expect(getVirtualKeyboardHeight()).toBe(0);

		resize({ height: window.innerHeight - 300 });

		expect(getVirtualKeyboardHeight()).toBe(300);
		expect(listener).toHaveBeenCalledTimes(1);

		resize({ height: window.innerHeight });

		expect(getVirtualKeyboardHeight()).toBe(0);
		expect(listener).toHaveBeenCalledTimes(2);
	});

	test("returns the offset the visible area is panned by while the keyboard is open", () => {
		const listener = vi.fn();
		unsubscribe = subscribeVirtualKeyboard(listener);
		resize({ height: window.innerHeight - 300 });

		pan(120);

		expect(getVirtualKeyboardOffset()).toBe(120);
		expect(getVirtualKeyboardHeight()).toBe(300);
		expect(listener).toHaveBeenCalledTimes(2);

		// Panned no further than the keyboard height, the layout ends there
		pan(400);
		expect(getVirtualKeyboardOffset()).toBe(300);

		resize({ height: window.innerHeight });
		expect(getVirtualKeyboardOffset()).toBe(0);
	});

	test("ignores the pan of the pinch zoom", () => {
		const listener = vi.fn();
		unsubscribe = subscribeVirtualKeyboard(listener);

		resize({ height: window.innerHeight / 2, scale: 2 });
		pan(200);

		expect(getVirtualKeyboardOffset()).toBe(0);
		expect(listener).not.toHaveBeenCalled();
	});

	test("measures the keyboard opened before subscribing", () => {
		viewport.height = window.innerHeight - 300;
		unsubscribe = subscribeVirtualKeyboard(() => {});

		expect(getVirtualKeyboardHeight()).toBe(300);
	});

	test("ignores the pinch zoom", () => {
		const listener = vi.fn();
		unsubscribe = subscribeVirtualKeyboard(listener);

		resize({ height: window.innerHeight / 2, scale: 2 });

		expect(getVirtualKeyboardHeight()).toBe(0);
		expect(listener).not.toHaveBeenCalled();
	});

	test("ignores the document scrollbar", () => {
		// Headless browsers don't render scrollbars, so the height it takes from the document is stubbed
		Object.defineProperty(document.documentElement, "clientHeight", {
			configurable: true,
			value: window.innerHeight - 15,
		});
		viewport.height = window.innerHeight - 15;
		unsubscribe = subscribeVirtualKeyboard(() => {});

		expect(getVirtualKeyboardHeight()).toBe(0);
	});

	test("stops updating without subscribers", () => {
		const listener = vi.fn();
		subscribeVirtualKeyboard(listener)();

		resize({ height: window.innerHeight - 300 });

		expect(getVirtualKeyboardHeight()).toBe(0);
		expect(listener).not.toHaveBeenCalled();
	});
});
