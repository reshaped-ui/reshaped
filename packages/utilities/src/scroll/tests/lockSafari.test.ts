import { afterEach, describe, expect, test } from "vitest";

import lockSafariScroll from "../lockSafari";

describe("scroll/lockSafariScroll", () => {
	afterEach(() => {
		document.documentElement.style.overflow = "";
		document.body.style.overflow = "";
		document.body.style.overflowX = "";
		document.body.innerHTML = "";
	});

	test("locks the body without changing its position", () => {
		const unlock = lockSafariScroll();

		expect(document.body.style.overflow).toBe("hidden");
		expect(document.body.style.position).toBe("");
		expect(document.documentElement.style.overflow).toBe("");

		unlock();

		expect(document.body.style.overflow).toBe("");
	});

	test("keeps the body overflow when it's not the viewport scroller", () => {
		document.body.style.overflowX = "hidden";

		const unlock = lockSafariScroll();

		expect(document.body.style.overflow).toBe("hidden");

		unlock();

		expect(document.body.style.overflowX).toBe("hidden");
	});

	test("locks html when it defines the viewport overflow", () => {
		document.documentElement.style.overflow = "auto";

		const unlock = lockSafariScroll();

		expect(document.documentElement.style.overflow).toBe("hidden");
		expect(document.body.style.overflow).toBe("");

		unlock();

		expect(document.documentElement.style.overflow).toBe("auto");
	});

	test("keeps the scroll position", () => {
		const content = document.createElement("div");
		content.style.height = "5000px";
		document.body.appendChild(content);
		window.scrollTo({ top: 300, behavior: "instant" });

		const unlock = lockSafariScroll();
		unlock();

		expect(window.scrollY).toBe(300);
	});
});
