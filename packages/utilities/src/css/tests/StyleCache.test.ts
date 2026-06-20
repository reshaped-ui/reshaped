import { beforeEach, describe, expect, test } from "vitest";

import StyleCache from "../StyleCache";

describe("css/StyleCache", () => {
	let styleCache: StyleCache;

	beforeEach(() => {
		styleCache = new StyleCache();
	});

	test("applies styles and restores original styles on reset", () => {
		const el = document.createElement("div");
		el.style.color = "red";
		el.style.overflow = "visible";

		styleCache.set(el, { color: "blue", overflow: "hidden" });

		expect(el.style.color).toBe("blue");
		expect(el.style.overflow).toBe("hidden");

		styleCache.reset(el);

		expect(el.style.color).toBe("red");
		expect(el.style.overflow).toBe("visible");
	});

	test("ignores repeated set calls on an already-cached element", () => {
		const el = document.createElement("div");
		el.style.color = "red";

		styleCache.set(el, { color: "blue" });
		// The element is already cached, so this is a no-op (style stays "blue")
		styleCache.set(el, { color: "green" });

		expect(el.style.color).toBe("blue");

		styleCache.reset(el);

		expect(el.style.color).toBe("red");
	});

	test("reset only affects the given element", () => {
		const el1 = document.createElement("div");
		const el2 = document.createElement("div");
		el1.style.color = "red";
		el2.style.color = "blue";

		styleCache.set(el1, { color: "green" });
		styleCache.set(el2, { color: "yellow" });

		styleCache.reset(el1);

		// el1 is restored, el2 stays locked
		expect(el1.style.color).toBe("red");
		expect(el2.style.color).toBe("yellow");
		expect(styleCache.cache.has(el2)).toBe(true);

		styleCache.reset(el2);

		expect(el2.style.color).toBe("blue");
	});

	test("reset is a no-op for an element that was never cached", () => {
		const el = document.createElement("div");
		el.style.color = "red";

		styleCache.reset(el);

		expect(el.style.color).toBe("red");
	});

	test("removes the element from the cache after reset", () => {
		const el = document.createElement("div");
		el.style.color = "red";

		styleCache.set(el, { color: "blue" });
		styleCache.reset(el);

		expect(styleCache.cache.size).toBe(0);
	});
});
