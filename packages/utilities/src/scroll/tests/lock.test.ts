import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { lockScroll } from "../lock";

// Mock the platform module to avoid iOS path
vi.mock("@/platform", () => ({
	isIOS: () => false,
}));

describe("scroll/lockScroll", () => {
	beforeEach(() => {
		// Reset the body styles before each test
		document.body.style.overflow = "";
		document.body.style.paddingRight = "";
		document.body.innerHTML = "";
	});

	afterEach(() => {
		// Clean up
		document.body.style.overflow = "";
		document.body.style.paddingRight = "";
		document.body.innerHTML = "";
	});

	test("locks scroll on body", () => {
		const unlock = lockScroll({});

		expect(document.body.style.overflow).toBe("hidden");

		unlock?.();

		expect(document.body.style.overflow).toBe("");
	});

	test("locks scroll on custom container element", () => {
		const container = document.createElement("div");
		container.style.overflow = "auto";
		container.style.height = "200px";
		document.body.appendChild(container);

		const unlock = lockScroll({ containerEl: container });

		expect(container.style.overflow).toBe("hidden");
		expect(document.body.style.overflow).not.toBe("hidden");

		unlock?.();

		expect(container.style.overflow).toBe("auto");
	});

	test("finds scrollable container from origin element", () => {
		const scrollableContainer = document.createElement("div");
		scrollableContainer.style.overflow = "auto";
		scrollableContainer.style.height = "200px";
		document.body.appendChild(scrollableContainer);

		// Add content to make it scrollable
		const content = document.createElement("div");
		content.style.height = "500px";
		scrollableContainer.appendChild(content);

		const originEl = document.createElement("div");
		scrollableContainer.appendChild(originEl);

		const unlock = lockScroll({ originEl });

		expect(scrollableContainer.style.overflow).toBe("hidden");

		unlock?.();

		expect(scrollableContainer.style.overflow).toBe("auto");
	});

	test("unlocks after multiple locks", () => {
		const unlock1 = lockScroll({});
		const unlock2 = lockScroll({});

		expect(document.body.style.overflow).toBe("hidden");

		unlock1?.();
		expect(document.body.style.overflow).toBe("");

		unlock2?.();
		expect(document.body.style.overflow).toBe("");
	});

	test("calls lock callback immediately", () => {
		const lockCb = vi.fn();

		lockScroll({ callback: lockCb });

		expect(lockCb).toHaveBeenCalledTimes(1);
	});

	test("calls unlock callback when unlocking", () => {
		const unlockCb = vi.fn();

		const unlock = lockScroll({});
		unlock?.({ callback: unlockCb });

		expect(unlockCb).toHaveBeenCalledTimes(1);
	});

	test("handles origin element when no scrollable container is found (falls back to body)", () => {
		const originEl = document.createElement("div");
		document.body.appendChild(originEl);

		const unlock = lockScroll({ originEl });

		expect(document.body.style.overflow).toBe("hidden");

		unlock?.();

		expect(document.body.style.overflow).toBe("");
	});
});
