import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import Flyout from "../Flyout";

describe("flyout/Flyout", () => {
	let content: HTMLElement;
	let trigger: HTMLElement;
	let onClose: () => void;

	beforeEach(() => {
		content = document.createElement("div");
		content.style.position = "absolute";
		content.style.width = "100px";
		content.style.height = "50px";
		document.body.appendChild(content);

		trigger = document.createElement("button");
		trigger.style.position = "absolute";
		trigger.style.left = "100px";
		trigger.style.top = "200px";
		trigger.style.width = "50px";
		trigger.style.height = "30px";
		document.body.appendChild(trigger);

		onClose = vi.fn() as () => void;
	});

	afterEach(() => {
		if (content.parentNode) content.parentNode.removeChild(content);
		if (trigger.parentNode) trigger.parentNode.removeChild(trigger);
	});

	test("updates position", () => {
		const flyout = new Flyout({
			content,
			trigger,
			triggerCoordinates: null,
			position: "top",
			onDeactivate: onClose,
		});

		const result = flyout.activate();

		expect(result.position).toBe("top");

		trigger.style.top = "0px";

		const resultUpdate = flyout.update();

		expect(resultUpdate.position).toBe("bottom");
	});

	test("closes flyout when trigger scrolls out of container bounds", () => {
		const container = document.createElement("div");
		container.style.position = "relative";
		container.style.width = "200px";
		container.style.height = "200px";
		container.style.overflow = "auto";
		document.body.appendChild(container);

		trigger.style.position = "relative";
		container.appendChild(trigger);

		const flyout = new Flyout({
			content,
			trigger,
			triggerCoordinates: null,
			position: "top",
			onDeactivate: onClose,
		});

		flyout.activate();

		// Scroll trigger out of bounds
		trigger.style.position = "absolute";
		trigger.style.top = "-100px";
		container.scrollTop = 0;

		// Trigger scroll event
		container.dispatchEvent(new Event("scroll", { bubbles: true }));

		// Wait for rafThrottle
		return new Promise((resolve) => {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					expect(onClose).toHaveBeenCalled();
					document.body.removeChild(container);
					resolve(undefined);
				});
			});
		});
	});

	test("updates position when trigger scrolls but stays in bounds", () => {
		const container = document.createElement("div");
		container.style.position = "relative";
		container.style.width = "500px";
		container.style.height = "500px";
		container.style.overflow = "auto";
		document.body.appendChild(container);

		trigger.style.position = "relative";
		trigger.style.top = "100px";
		container.appendChild(trigger);

		const flyout = new Flyout({
			content,
			trigger,
			triggerCoordinates: null,
			position: "top",
			onDeactivate: onClose,
		});

		flyout.activate();

		// Scroll within bounds
		container.scrollTop = 50;
		container.dispatchEvent(new Event("scroll", { bubbles: true }));

		// Should update, not close
		return new Promise((resolve) => {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					expect(onClose).not.toHaveBeenCalled();
					document.body.removeChild(container);
					resolve(undefined);
				});
			});
		});
	});

	test("updates position on RTL direction change", async () => {
		const flyout = new Flyout({
			content,
			trigger,
			triggerCoordinates: null,
			position: "start",
			onDeactivate: onClose,
		});

		const initialResult = flyout.activate();

		expect(initialResult.position).toBe("start");

		// Start is positioned from the right side
		expect(content.style.right).toBe("0px");
		expect(content.style.left).toBe("");

		document.documentElement.setAttribute("dir", "rtl");

		await vi.waitFor(() => {
			// End is position from the left side
			expect(content.style.left).toBe("0px");
			expect(content.style.right).toBe("");
		});

		document.documentElement.setAttribute("dir", "ltr");
	});
});
