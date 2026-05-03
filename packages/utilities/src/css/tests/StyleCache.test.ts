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

		styleCache.reset();

		expect(el.style.color).toBe("red");
		expect(el.style.overflow).toBe("visible");
	});

	test("preserves original styles across multiple set calls", () => {
		const el = document.createElement("div");
		el.style.color = "red";

		styleCache.set(el, { color: "blue" });
		styleCache.set(el, { color: "green" });
		styleCache.reset();

		expect(el.style.color).toBe("red");
	});

	test("handles multiple elements", () => {
		const el1 = document.createElement("div");
		const el2 = document.createElement("div");
		el1.style.color = "red";
		el2.style.color = "blue";

		styleCache.set(el1, { color: "green" });
		styleCache.set(el2, { color: "yellow" });
		styleCache.reset();

		expect(el1.style.color).toBe("red");
		expect(el2.style.color).toBe("blue");
	});

	test("clears cache after reset", () => {
		const el = document.createElement("div");
		el.style.color = "red";

		styleCache.set(el, { color: "blue" });
		styleCache.reset();

		expect(styleCache.cache.size).toBe(0);
	});
});
