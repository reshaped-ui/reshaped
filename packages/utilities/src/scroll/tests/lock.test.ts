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

	test("reserves space for the scrollbar on a vertically overflowing container", () => {
		const container = document.createElement("div");
		container.style.overflow = "auto";
		container.style.height = "100px";
		document.body.appendChild(container);

		const content = document.createElement("div");
		content.style.height = "500px";
		container.appendChild(content);

		// The container actually overflows vertically, so locking it removes the
		// vertical scrollbar and must compensate for the horizontal space it took.
		expect(container.scrollHeight).toBeGreaterThan(container.clientHeight);

		const unlock = lockScroll({ containerEl: container });

		// Chromium (the test browser) supports scrollbar-gutter, so the lock
		// reserves the gutter rather than falling back to paddingRight.
		expect(container.style.scrollbarGutter).toBe("stable");

		unlock?.();

		expect(container.style.scrollbarGutter).toBe("");

		document.body.removeChild(container);
	});

	test("does not reserve space when the container does not overflow vertically", () => {
		const container = document.createElement("div");
		container.style.overflow = "auto";
		container.style.height = "200px";
		document.body.appendChild(container);

		const content = document.createElement("div");
		content.style.height = "50px";
		container.appendChild(content);

		// No vertical overflow -> no scrollbar to compensate for.
		expect(container.scrollHeight).not.toBeGreaterThan(container.clientHeight);

		const unlock = lockScroll({ containerEl: container });

		expect(container.style.overflow).toBe("hidden");
		expect(container.style.scrollbarGutter).toBe("");
		expect(container.style.paddingRight).toBe("");

		unlock?.();

		document.body.removeChild(container);
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

		expect(document.documentElement.style.overflow).toBe("hidden");

		unlock1?.();
		expect(document.documentElement.style.overflow).toBe("");

		unlock2?.();
		expect(document.documentElement.style.overflow).toBe("");
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

	test("handles origin element when no scrollable container is found (falls back to document)", () => {
		const originEl = document.createElement("div");
		document.body.appendChild(originEl);

		const unlock = lockScroll({ originEl });

		expect(document.documentElement.style.overflow).toBe("hidden");

		unlock?.();

		expect(document.documentElement.style.overflow).toBe("");
	});
});
