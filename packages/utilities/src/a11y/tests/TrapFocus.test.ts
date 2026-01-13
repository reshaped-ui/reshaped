import { expect, test, describe, beforeEach, afterEach, vi } from "vitest";

import TrapFocus from "../TrapFocus";

describe("a11y/TrapFocus", () => {
	let container: HTMLDivElement;
	let trigger: HTMLButtonElement;

	beforeEach(() => {
		container = document.createElement("div");
		document.body.appendChild(container);

		trigger = document.createElement("button");
		trigger.textContent = "Trigger";
		document.body.appendChild(trigger);
		trigger.focus();
	});

	afterEach(() => {
		document.body.removeChild(container);
		document.body.removeChild(trigger);
	});

	describe("basic functionality", () => {
		test("traps focus within root element", () => {
			container.innerHTML = `
				<button id="btn1">Button 1</button>
				<button id="btn2">Button 2</button>
			`;

			const trap = new TrapFocus();
			trap.trap(container);

			expect(trap.trapped).toBe(true);
			// Should focus first element
			expect(document.activeElement?.id).toBe("btn1");
		});

		test("releases trap and returns focus to trigger", () => {
			container.innerHTML = `
				<button id="btn1">Button 1</button>
				<button id="btn2">Button 2</button>
			`;

			const trap = new TrapFocus();
			trap.trap(container);
			trap.release();

			expect(trap.trapped).toBe(false);
			expect(document.activeElement).toBe(trigger);
		});

		test("does not trap when no focusable elements", () => {
			container.innerHTML = `<div>No focusable content</div>`;

			const trap = new TrapFocus();
			trap.trap(container);

			expect(trap.trapped).toBeUndefined();
		});

		test("focuses initialFocusEl when provided", () => {
			container.innerHTML = `
				<button id="btn1">Button 1</button>
				<button id="btn2">Button 2</button>
			`;

			const btn2 = container.querySelector("#btn2") as HTMLButtonElement;
			const trap = new TrapFocus();
			trap.trap(container, { initialFocusEl: btn2 });

			expect(document.activeElement).toBe(btn2);
		});

		test("calls onRelease callback when trap is released by Tab navigation", () => {
			container.innerHTML = `<button id="btn1">Button 1</button>`;

			const onRelease = vi.fn();
			const trap = new TrapFocus();
			trap.trap(container, { mode: "action-menu", onRelease });

			const btn1 = container.querySelector("#btn1") as HTMLButtonElement;
			btn1.focus();

			// Tab should release action-menu mode
			const event = new KeyboardEvent("keydown", { key: "Tab", bubbles: true });
			document.dispatchEvent(event);

			expect(onRelease).toHaveBeenCalled();
		});
	});

	describe("dialog mode", () => {
		test("navigates forward with Tab key", () => {
			container.innerHTML = `
				<button id="btn1">Button 1</button>
				<button id="btn2">Button 2</button>
				<button id="btn3">Button 3</button>
			`;

			const trap = new TrapFocus();
			trap.trap(container, { mode: "dialog" });

			const btn1 = container.querySelector("#btn1") as HTMLButtonElement;
			const btn2 = container.querySelector("#btn2") as HTMLButtonElement;
			btn1.focus();

			const event = new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true });
			document.dispatchEvent(event);

			expect(document.activeElement).toBe(btn2);
		});

		test("navigates backward with Shift+Tab", () => {
			container.innerHTML = `
				<button id="btn1">Button 1</button>
				<button id="btn2">Button 2</button>
				<button id="btn3">Button 3</button>
			`;

			const trap = new TrapFocus();
			trap.trap(container, { mode: "dialog" });

			const btn1 = container.querySelector("#btn1") as HTMLButtonElement;
			const btn2 = container.querySelector("#btn2") as HTMLButtonElement;
			btn2.focus();

			const event = new KeyboardEvent("keydown", {
				key: "Tab",
				shiftKey: true,
				bubbles: true,
				cancelable: true,
			});
			document.dispatchEvent(event);

			expect(document.activeElement).toBe(btn1);
		});

		test("wraps focus to first element when tabbing from last", () => {
			container.innerHTML = `
				<button id="btn1">Button 1</button>
				<button id="btn2">Button 2</button>
			`;

			const trap = new TrapFocus();
			trap.trap(container, { mode: "dialog" });

			const btn1 = container.querySelector("#btn1") as HTMLButtonElement;
			const btn2 = container.querySelector("#btn2") as HTMLButtonElement;
			btn2.focus();

			const event = new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true });
			document.dispatchEvent(event);

			expect(document.activeElement).toBe(btn1);
		});
	});

	describe("action-menu mode", () => {
		test("navigates with ArrowDown key", () => {
			container.innerHTML = `
				<button id="btn1">Button 1</button>
				<button id="btn2">Button 2</button>
			`;

			const trap = new TrapFocus();
			trap.trap(container, { mode: "action-menu" });

			const btn1 = container.querySelector("#btn1") as HTMLButtonElement;
			const btn2 = container.querySelector("#btn2") as HTMLButtonElement;
			btn1.focus();

			const event = new KeyboardEvent("keydown", {
				key: "ArrowDown",
				bubbles: true,
				cancelable: true,
			});
			document.dispatchEvent(event);

			expect(document.activeElement).toBe(btn2);
		});

		test("navigates with ArrowUp key", () => {
			container.innerHTML = `
				<button id="btn1">Button 1</button>
				<button id="btn2">Button 2</button>
			`;

			const trap = new TrapFocus();
			trap.trap(container, { mode: "action-menu" });

			const btn1 = container.querySelector("#btn1") as HTMLButtonElement;
			const btn2 = container.querySelector("#btn2") as HTMLButtonElement;
			btn2.focus();

			const event = new KeyboardEvent("keydown", {
				key: "ArrowUp",
				bubbles: true,
				cancelable: true,
			});
			document.dispatchEvent(event);

			expect(document.activeElement).toBe(btn1);
		});

		test("releases trap when Tab is pressed", () => {
			container.innerHTML = `<button id="btn1">Button 1</button>`;

			const trap = new TrapFocus();
			trap.trap(container, { mode: "action-menu" });

			const btn1 = container.querySelector("#btn1") as HTMLButtonElement;
			btn1.focus();

			const event = new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true });
			document.dispatchEvent(event);

			expect(trap.trapped).toBe(false);
		});
	});

	describe("action-bar mode", () => {
		test("navigates with ArrowRight key", () => {
			container.innerHTML = `
				<button id="btn1">Button 1</button>
				<button id="btn2">Button 2</button>
			`;

			const trap = new TrapFocus();
			trap.trap(container, { mode: "action-bar" });

			const btn1 = container.querySelector("#btn1") as HTMLButtonElement;
			const btn2 = container.querySelector("#btn2") as HTMLButtonElement;
			btn1.focus();

			const event = new KeyboardEvent("keydown", {
				key: "ArrowRight",
				bubbles: true,
				cancelable: true,
			});
			document.dispatchEvent(event);

			expect(document.activeElement).toBe(btn2);
		});

		test("navigates with ArrowLeft key", () => {
			container.innerHTML = `
				<button id="btn1">Button 1</button>
				<button id="btn2">Button 2</button>
			`;

			const trap = new TrapFocus();
			trap.trap(container, { mode: "action-bar" });

			const btn1 = container.querySelector("#btn1") as HTMLButtonElement;
			const btn2 = container.querySelector("#btn2") as HTMLButtonElement;
			btn2.focus();

			const event = new KeyboardEvent("keydown", {
				key: "ArrowLeft",
				bubbles: true,
				cancelable: true,
			});
			document.dispatchEvent(event);

			expect(document.activeElement).toBe(btn1);
		});
	});

	describe("content-menu mode", () => {
		test("releases trap when tabbing past last element", () => {
			container.innerHTML = `
				<button id="btn1">Button 1</button>
				<button id="btn2">Button 2</button>
			`;

			const trap = new TrapFocus();
			trap.trap(container, { mode: "content-menu" });

			const btn2 = container.querySelector("#btn2") as HTMLButtonElement;
			btn2.focus();

			const event = new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true });
			document.dispatchEvent(event);

			expect(trap.trapped).toBe(false);
		});

		test("continues navigation when not at boundaries", () => {
			container.innerHTML = `
				<button id="btn1">Button 1</button>
				<button id="btn2">Button 2</button>
				<button id="btn3">Button 3</button>
			`;

			const trap = new TrapFocus();
			trap.trap(container, { mode: "content-menu" });

			const btn1 = container.querySelector("#btn1") as HTMLButtonElement;
			const btn2 = container.querySelector("#btn2") as HTMLButtonElement;
			btn1.focus();

			const event = new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true });
			document.dispatchEvent(event);

			expect(document.activeElement).toBe(btn2);
			expect(trap.trapped).toBe(true);
		});
	});

	describe("selection-menu mode", () => {
		test("uses pseudo focus with data-rs-focus attribute", () => {
			container.innerHTML = `
				<button id="btn1">Button 1</button>
				<button id="btn2">Button 2</button>
			`;

			const trap = new TrapFocus();
			trap.trap(container, { mode: "selection-menu" });

			const btn1 = container.querySelector("#btn1") as HTMLButtonElement;
			const btn2 = container.querySelector("#btn2") as HTMLButtonElement;

			// First element should have pseudo focus
			expect(btn1.getAttribute("data-rs-focus")).toBe("true");

			// Navigate with arrow down
			const event = new KeyboardEvent("keydown", {
				key: "ArrowDown",
				bubbles: true,
				cancelable: true,
			});
			document.dispatchEvent(event);

			// Pseudo focus should move
			expect(btn1.hasAttribute("data-rs-focus")).toBe(false);
			expect(btn2.getAttribute("data-rs-focus")).toBe("true");
		});
	});

	describe("includeTrigger option", () => {
		test("includes trigger in focus navigation when enabled", () => {
			container.innerHTML = `<button id="btn1">Button 1</button>`;

			const trap = new TrapFocus();
			trap.trap(container, { mode: "dialog", includeTrigger: true });

			const btn1 = container.querySelector("#btn1") as HTMLButtonElement;

			// Trigger should be first in navigation order
			expect(document.activeElement).toBe(trigger);

			// Tab should move to btn1
			const event = new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true });
			document.dispatchEvent(event);

			expect(document.activeElement).toBe(btn1);
		});
	});

	describe("chain management", () => {
		test("manages multiple traps in a chain", () => {
			const container1 = document.createElement("div");
			container1.innerHTML = `<button id="btn1">Container 1</button>`;
			document.body.appendChild(container1);

			const container2 = document.createElement("div");
			container2.innerHTML = `<button id="btn2">Container 2</button>`;
			document.body.appendChild(container2);

			const trap1 = new TrapFocus();
			const trap2 = new TrapFocus();

			trap1.trap(container1);
			const btn1 = container1.querySelector("#btn1") as HTMLButtonElement;
			btn1.focus();

			trap2.trap(container2);

			// Only the last trap should respond to events
			const btn2 = container2.querySelector("#btn2") as HTMLButtonElement;
			expect(document.activeElement).toBe(btn2);

			// Release second trap
			trap2.release();

			// First trap should be restored
			expect(document.activeElement).toBe(btn1);

			trap1.release();

			document.body.removeChild(container1);
			document.body.removeChild(container2);
		});
	});

	describe("release options", () => {
		test("does not return focus to trigger with withoutFocusReturn option", () => {
			container.innerHTML = `<button id="btn1">Button 1</button>`;

			const btn1 = container.querySelector("#btn1") as HTMLButtonElement;
			const trap = new TrapFocus();
			trap.trap(container);

			btn1.focus();
			trap.release({ withoutFocusReturn: true });

			expect(document.activeElement).not.toBe(trigger);
		});
	});
});
