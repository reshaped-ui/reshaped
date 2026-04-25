import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
	focusElement,
	focusFirstElement,
	focusLastElement,
	focusNextElement,
	focusPreviousElement,
	getActiveElement,
	getFocusableElements,
	getFocusData,
} from "../focus";

describe("a11y/focus", () => {
	let container: HTMLDivElement;

	beforeEach(() => {
		container = document.createElement("div");
		document.body.appendChild(container);
	});

	afterEach(() => {
		document.body.removeChild(container);
		document.body.focus();
	});

	describe("getActiveElement", () => {
		test("returns document.activeElement when no pseudo focus is set", () => {
			const button = document.createElement("button");

			container.appendChild(button);
			button.focus();

			expect(getActiveElement()).toBe(button);
		});

		test("returns pseudo focused element when data-rs-focus is set", () => {
			const button1 = document.createElement("button");
			const button2 = document.createElement("button");

			container.appendChild(button1);
			container.appendChild(button2);

			button1.focus();
			button2.setAttribute("data-rs-focus", "true");

			expect(getActiveElement()).toBe(button2);
		});
	});

	describe("focusElement", () => {
		test("focuses element with real focus by default", () => {
			const button = document.createElement("button");
			container.appendChild(button);

			focusElement(button);

			expect(document.activeElement).toBe(button);
			expect(button.hasAttribute("data-rs-focus")).toBe(false);
		});

		test("focuses element with pseudo focus when option is set", () => {
			const button = document.createElement("button");
			container.appendChild(button);

			focusElement(button, { pseudoFocus: true });

			expect(button.getAttribute("data-rs-focus")).toBe("true");
		});

		test("removes previous pseudo focus when focusing new element", () => {
			const button1 = document.createElement("button");
			const button2 = document.createElement("button");
			container.appendChild(button1);
			container.appendChild(button2);

			focusElement(button1, { pseudoFocus: true });
			focusElement(button2, { pseudoFocus: true });

			expect(button1.hasAttribute("data-rs-focus")).toBe(false);
			expect(button2.getAttribute("data-rs-focus")).toBe("true");
		});
	});

	describe("getFocusableElements", () => {
		test("returns all focusable elements", () => {
			container.innerHTML = `
        <div>content</div>
				<button>Button 1</button>
				<input type="text" />
				<textarea></textarea>
				<button>Button 2</button>
        <textarea></textarea>
        <select><option>Option 1</option></select>
        <details><summary>Summary</summary>Content</details>
        <div contenteditable>Contenteditable</div>
        <div tabindex="0">Negative tabindex</div>
			`;

			const focusable = getFocusableElements(container);

			expect(focusable).toHaveLength(9);
		});

		test("filters out disabled elements", () => {
			container.innerHTML = `
				<button>Enabled</button>
				<button disabled>Disabled</button>
			`;

			const focusable = getFocusableElements(container);

			expect(focusable).toHaveLength(1);
			expect(focusable[0].textContent).toBe("Enabled");
		});

		test("filters out hidden elements (clientHeight === 0)", () => {
			const button1 = document.createElement("button");
			const button2 = document.createElement("button");

			button1.textContent = "Visible";
			button2.textContent = "Hidden";
			button2.style.display = "none";

			container.appendChild(button1);
			container.appendChild(button2);

			const focusable = getFocusableElements(container);

			expect(focusable).toHaveLength(1);
			expect(focusable[0].textContent).toBe("Visible");
		});

		test("filters out elements with tabindex=-1 by default", () => {
			container.innerHTML = `
				<button>Regular</button>
				<button tabindex="-1">Negative tabindex</button>
			`;

			const focusable = getFocusableElements(container);

			expect(focusable).toHaveLength(1);
			expect(focusable[0].textContent).toBe("Regular");
		});

		test("includes elements with tabindex=-1 when option is set", () => {
			container.innerHTML = `
				<button>Regular</button>
				<button tabindex="-1">Negative tabindex</button>
			`;

			const focusable = getFocusableElements(container, { includeNegativeTabIndex: true });

			expect(focusable).toHaveLength(2);
		});

		test("handles radio buttons in a group", () => {
			container.innerHTML = `
				<form>
					<input type="radio" name="group1" value="1" />
					<input type="radio" name="group1" value="2" checked />
					<input type="radio" name="group1" value="3" />
				</form>
			`;

			const focusable = getFocusableElements(container);

			// Only the checked radio should be focusable
			expect(focusable).toHaveLength(1);
			expect((focusable[0] as HTMLInputElement).value).toBe("2");
		});

		test("includes first radio when none are checked", () => {
			container.innerHTML = `
				<form>
					<input type="radio" name="group1" value="1" />
					<input type="radio" name="group1" value="2" />
					<input type="radio" name="group1" value="3" />
				</form>
			`;

			const focusable = getFocusableElements(container);

			expect(focusable).toHaveLength(1);
			expect((focusable[0] as HTMLInputElement).value).toBe("1");
		});

		test("adds additional element at the beginning when provided", () => {
			container.innerHTML = `
				<button>Button 1</button>
				<button>Button 2</button>
			`;

			const additionalButton = document.createElement("button");
			additionalButton.textContent = "Additional";
			document.body.appendChild(additionalButton);

			const focusable = getFocusableElements(container, { additionalElement: additionalButton });

			expect(focusable).toHaveLength(3);
			expect(focusable[0]).toBe(additionalButton);

			document.body.removeChild(additionalButton);
		});
	});

	describe("getFocusData", () => {
		beforeEach(() => {
			container.innerHTML = `
				<button>Button 1</button>
				<button>Button 2</button>
				<button>Button 3</button>
			`;
		});

		test("returns next element data", () => {
			const buttons = container.querySelectorAll("button");
			(buttons[0] as HTMLButtonElement).focus();

			const data = getFocusData({ root: container, target: "next" });

			expect(data.el).toBe(buttons[1]);
			expect(data.overflow).toBe(false);
		});

		test("returns previous element data", () => {
			const buttons = container.querySelectorAll("button");
			(buttons[1] as HTMLButtonElement).focus();

			const data = getFocusData({ root: container, target: "prev" });

			expect(data.el).toBe(buttons[0]);
			expect(data.overflow).toBe(false);
		});

		test("returns first element data", () => {
			const buttons = container.querySelectorAll("button");

			const data = getFocusData({ root: container, target: "first" });

			expect(data.el).toBe(buttons[0]);
		});

		test("returns last element data", () => {
			const buttons = container.querySelectorAll("button");

			const data = getFocusData({ root: container, target: "last" });

			expect(data.el).toBe(buttons[2]);
		});

		test("handles overflow at end without circular option", () => {
			const buttons = container.querySelectorAll("button");
			(buttons[2] as HTMLButtonElement).focus();

			const data = getFocusData({ root: container, target: "next" });

			expect(data.el).toBe(buttons[2]);
			expect(data.overflow).toBe(true);
		});

		test("handles overflow at start without circular option", () => {
			const buttons = container.querySelectorAll("button");
			(buttons[0] as HTMLButtonElement).focus();

			const data = getFocusData({ root: container, target: "prev" });

			expect(data.el).toBe(buttons[0]);
			expect(data.overflow).toBe(true);
		});

		test("wraps to first when going next from last with circular option", () => {
			const buttons = container.querySelectorAll("button");
			(buttons[2] as HTMLButtonElement).focus();

			const data = getFocusData({ root: container, target: "next", options: { circular: true } });

			expect(data.el).toBe(buttons[0]);
			expect(data.overflow).toBe(true);
		});

		test("wraps to last when going prev from first with circular option", () => {
			const buttons = container.querySelectorAll("button");
			(buttons[0] as HTMLButtonElement).focus();

			const data = getFocusData({ root: container, target: "prev", options: { circular: true } });

			expect(data.el).toBe(buttons[2]);
			expect(data.overflow).toBe(true);
		});
	});

	describe("focusNextElement", () => {
		test("focuses next element in sequence", () => {
			container.innerHTML = `
				<button>Button 1</button>
				<button>Button 2</button>
			`;

			const buttons = container.querySelectorAll("button");
			(buttons[0] as HTMLButtonElement).focus();

			focusNextElement(container);

			expect(document.activeElement).toBe(buttons[1]);
		});

		test("wraps to first element with circular option", () => {
			container.innerHTML = `
				<button>Button 1</button>
				<button>Button 2</button>
			`;

			const buttons = container.querySelectorAll("button");
			(buttons[1] as HTMLButtonElement).focus();

			focusNextElement(container, { circular: true });

			expect(document.activeElement).toBe(buttons[0]);
		});
	});

	describe("focusPreviousElement", () => {
		test("focuses previous element in sequence", () => {
			container.innerHTML = `
				<button>Button 1</button>
				<button>Button 2</button>
			`;

			const buttons = container.querySelectorAll("button");
			(buttons[1] as HTMLButtonElement).focus();

			focusPreviousElement(container);

			expect(document.activeElement).toBe(buttons[0]);
		});

		test("wraps to last element with circular option", () => {
			container.innerHTML = `
				<button>Button 1</button>
				<button>Button 2</button>
			`;

			const buttons = container.querySelectorAll("button");
			(buttons[0] as HTMLButtonElement).focus();

			focusPreviousElement(container, { circular: true });

			expect(document.activeElement).toBe(buttons[1]);
		});
	});

	describe("focusFirstElement", () => {
		test("focuses first focusable element", () => {
			container.innerHTML = `
				<button>Button 1</button>
				<button>Button 2</button>
				<button>Button 3</button>
			`;

			const buttons = container.querySelectorAll("button");

			focusFirstElement(container);

			expect(document.activeElement).toBe(buttons[0]);
		});
	});

	describe("focusLastElement", () => {
		test("focuses last focusable element", () => {
			container.innerHTML = `
				<button>Button 1</button>
				<button>Button 2</button>
				<button>Button 3</button>
			`;

			const buttons = container.querySelectorAll("button");

			focusLastElement(container);

			expect(document.activeElement).toBe(buttons[2]);
		});
	});
});
