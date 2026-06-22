import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { lockScroll } from "../lock";

// Mock the platform module to avoid iOS path
vi.mock("@/platform", () => ({
	isIOS: () => false,
}));

describe("scroll/lockScroll", () => {
	beforeEach(() => {
		// Reset the document styles before each test
		document.documentElement.style.overflow = "";
		document.documentElement.style.paddingRight = "";
		document.documentElement.style.scrollbarGutter = "";
		document.documentElement.innerHTML = "";
	});

	afterEach(() => {
		// Clean up
		document.documentElement.style.overflow = "";
		document.documentElement.style.paddingRight = "";
		document.documentElement.style.scrollbarGutter = "";
		document.documentElement.innerHTML = "";
	});

	test("locks scroll on document", () => {
		const unlock = lockScroll({});

		expect(document.documentElement.style.overflow).toBe("hidden");

		unlock?.();

		expect(document.documentElement.style.overflow).toBe("");
	});

	test("locks scroll on custom container element", () => {
		const container = document.createElement("div");
		container.style.overflow = "auto";
		container.style.height = "200px";
		document.body.appendChild(container);

		const unlock = lockScroll({ containerEl: container });

		expect(container.style.overflow).toBe("hidden");
		expect(document.documentElement.style.overflow).not.toBe("hidden");

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

	test("keeps scroll locked until every stacked lock is released", () => {
		const unlock1 = lockScroll({});
		const unlock2 = lockScroll({});

		expect(document.documentElement.style.overflow).toBe("hidden");

		// The first release must not unlock while a second lock is still held
		unlock1?.();
		expect(document.documentElement.style.overflow).toBe("hidden");

		// Only the last release actually unlocks the container
		unlock2?.();
		expect(document.documentElement.style.overflow).toBe("");
	});

	test("ignores repeated calls to the same unlock", () => {
		const unlock1 = lockScroll({});
		const unlock2 = lockScroll({});

		// Calling the first unlock twice must not decrement the count for unlock2
		unlock1?.();
		unlock1?.();

		expect(document.documentElement.style.overflow).toBe("hidden");

		unlock2?.();
		expect(document.documentElement.style.overflow).toBe("");
	});

	test("calls lock callback immediately", () => {
		const lockCb = vi.fn();

		const unlock = lockScroll({ callback: lockCb });

		expect(lockCb).toHaveBeenCalledTimes(1);

		unlock?.();
	});

	test("calls unlock callback when unlocking", () => {
		const unlockCb = vi.fn();

		const unlock = lockScroll({});
		unlock?.({ callback: unlockCb });

		expect(unlockCb).toHaveBeenCalledTimes(1);
	});

	test("handles origin element when no scrollable container is found (falls back to document)", () => {
		const originEl = document.createElement("div");
		document.body.appendChild(originEl);

		const unlock = lockScroll({ originEl });

		expect(document.documentElement.style.overflow).toBe("hidden");

		unlock?.();

		expect(document.documentElement.style.overflow).toBe("");
	});
});
