import React from "react";
import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import { render } from "@/tests/render";
import useOnClickOutside from "../useOnClickOutside";

const fireMouseEvent = (el: Element, type: "mousedown" | "contextmenu") => {
	el.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, composed: true }));
};

const Outside = () => (
	<div data-testid="outside" style={{ width: 100, height: 100 }}>
		Outside
	</div>
);

const DemoBase = (props: { onOutsideClick: () => void }) => {
	const ref = React.useRef(null);
	const [target, setTarget] = React.useState<"inside" | "outside" | null>(null);

	useOnClickOutside([ref], () => {
		props.onOutsideClick();
		setTarget("outside");
	});

	return (
		<div style={{ display: "flex", gap: 16, flexDirection: "column", alignItems: "flex-start" }}>
			<button ref={ref} onClick={() => setTarget("inside")}>
				Trigger
			</button>
			{target && `Clicked ${target}`}
			<Outside />
		</div>
	);
};

const DemoRefs = (props: { onOutsideClick: () => void }) => {
	const ref = React.useRef(null);
	const ref2 = React.useRef(null);

	useOnClickOutside([ref, ref2], () => {
		props.onOutsideClick();
	});

	return (
		<div>
			<button ref={ref}>Trigger</button>
			<button ref={ref2}>Trigger 2</button>
			<Outside />
		</div>
	);
};

const DemoDisabled = (props: { onOutsideClick: () => void }) => {
	const ref = React.useRef(null);

	useOnClickOutside([ref], () => props.onOutsideClick(), { disabled: true });

	return (
		<div>
			<button ref={ref}>Trigger</button>
			<Outside />
		</div>
	);
};

const DemoDeps = (props: { onOutsideClick: (props: { count: number }) => void }) => {
	const ref = React.useRef(null);
	const [count, setCount] = React.useState(0);

	useOnClickOutside([ref], () => {
		props.onOutsideClick({ count });
	});

	return (
		<div>
			<button ref={ref} onClick={() => setCount((prev) => prev + 1)}>
				Trigger {count}
			</button>
			<Outside />
		</div>
	);
};

const DemoDisabledItem = () => {
	const ref = React.useRef(null);

	useOnClickOutside([ref], () => {}, { disabled: true });

	return <div ref={ref}>Item</div>;
};

const DemoDisabledListeners = () => {
	const [mounted, setMounted] = React.useState(false);

	return (
		<div>
			<button onClick={() => setMounted(true)}>Mount</button>
			{mounted && Array.from({ length: 10 }).map((_, i) => <DemoDisabledItem key={i} />)}
		</div>
	);
};

const DemoEnable = (props: { onOutsideClick: () => void }) => {
	const ref = React.useRef(null);
	const [enabled, setEnabled] = React.useState(false);

	useOnClickOutside([ref], props.onOutsideClick, { disabled: !enabled });

	return (
		<div>
			<input ref={ref} onFocus={() => setEnabled(true)} aria-label="Enable" />
			{enabled && "Enabled"}
			<Outside />
		</div>
	);
};

describe("Hooks/useOnClickOutside", () => {
	test("base", async () => {
		const handleOutsideClick = vi.fn();
		await render(<DemoBase onOutsideClick={handleOutsideClick} />);

		await userEvent.click(page.getByRole("button"));

		await expect.element(page.getByText("Clicked inside")).toBeInTheDocument();
		expect(handleOutsideClick).not.toHaveBeenCalled();

		await userEvent.click(page.getByTestId("outside"));

		await expect.element(page.getByText("Clicked outside")).toBeInTheDocument();
		expect(handleOutsideClick).toHaveBeenCalledTimes(1);
		expect(handleOutsideClick).toHaveBeenCalledWith();
	});

	test("right click", async () => {
		const handleOutsideClick = vi.fn();
		await render(<DemoBase onOutsideClick={handleOutsideClick} />);
		const outside = page.getByTestId("outside");

		await userEvent.click(page.getByRole("button"), { button: "right" });

		expect(handleOutsideClick).not.toHaveBeenCalled();

		await userEvent.click(outside, { button: "right" });

		expect(handleOutsideClick).toHaveBeenCalledTimes(1);
		expect(handleOutsideClick).toHaveBeenCalledWith();

		// Opening another context menu outside
		const outsideEl = outside.element();
		const preventDefault = (e: Event) => e.preventDefault();
		outsideEl.addEventListener("contextmenu", preventDefault);
		await userEvent.click(outside, { button: "right" });
		outsideEl.removeEventListener("contextmenu", preventDefault);

		expect(handleOutsideClick).toHaveBeenCalledTimes(2);
	});

	test("context menu key", async () => {
		const handleOutsideClick = vi.fn();
		await render(<DemoBase onOutsideClick={handleOutsideClick} />);
		const button = page.getByRole("button").element();
		const outside = page.getByTestId("outside").element();

		// Context menu key doesn't trigger mousedown
		fireMouseEvent(outside, "mousedown");
		fireMouseEvent(button, "contextmenu");

		expect(handleOutsideClick).not.toHaveBeenCalled();

		fireMouseEvent(button, "mousedown");
		fireMouseEvent(outside, "contextmenu");

		expect(handleOutsideClick).toHaveBeenCalledTimes(1);
	});

	test("multiple refs", async () => {
		const handleOutsideClick = vi.fn();
		await render(<DemoRefs onOutsideClick={handleOutsideClick} />);

		await userEvent.click(page.getByRole("button", { name: "Trigger", exact: true }));

		expect(handleOutsideClick).not.toHaveBeenCalled();

		await userEvent.click(page.getByRole("button", { name: "Trigger 2" }));

		expect(handleOutsideClick).not.toHaveBeenCalled();

		await userEvent.click(page.getByTestId("outside"));

		expect(handleOutsideClick).toHaveBeenCalledTimes(1);
		expect(handleOutsideClick).toHaveBeenCalledWith();
	});

	test("disabled", async () => {
		const handleOutsideClick = vi.fn();
		await render(<DemoDisabled onOutsideClick={handleOutsideClick} />);

		await userEvent.click(page.getByTestId("outside"));

		expect(handleOutsideClick).not.toHaveBeenCalled();
	});

	test("handler uses latest state", async () => {
		const handleOutsideClick = vi.fn();
		await render(<DemoDeps onOutsideClick={handleOutsideClick} />);
		const outside = page.getByTestId("outside");

		await userEvent.click(outside);

		expect(handleOutsideClick).toHaveBeenLastCalledWith({ count: 0 });

		await userEvent.click(page.getByRole("button"));
		await expect.element(page.getByRole("button")).toHaveTextContent("Trigger 1");
		await userEvent.click(outside);

		expect(handleOutsideClick).toHaveBeenLastCalledWith({ count: 1 });
	});

	test("disabled doesn't add listeners", async () => {
		await render(<DemoDisabledListeners />);
		const spy = vi.spyOn(document, "addEventListener");

		try {
			await userEvent.click(page.getByRole("button", { name: "Mount" }));
			await expect.poll(() => page.getByText("Item").all()).toHaveLength(10);
		} finally {
			spy.mockRestore();
		}

		const types = spy.mock.calls.map((call) => call[0]);

		expect(
			types.filter((type) =>
				["mousedown", "touchstart", "keydown", "click", "contextmenu"].includes(type)
			)
		).toHaveLength(0);
	});

	test("enabled during click inside", async () => {
		const handleOutsideClick = vi.fn();
		await render(<DemoEnable onOutsideClick={handleOutsideClick} />);
		const input = page.getByRole("textbox", { name: "Enable" });
		const outside = page.getByTestId("outside");

		await userEvent.click(outside);

		expect(handleOutsideClick).not.toHaveBeenCalled();

		// Focus on mousedown enables the hook, so the mousedown happened inside before it was enabled
		await userEvent.click(input);

		await expect.element(page.getByText("Enabled")).toBeInTheDocument();
		expect(handleOutsideClick).not.toHaveBeenCalled();

		await userEvent.click(outside);

		expect(handleOutsideClick).toHaveBeenCalledTimes(1);
	});

	test("touch outside", async () => {
		const handleOutsideClick = vi.fn();
		await render(<DemoBase onOutsideClick={handleOutsideClick} />);

		// Touch inside followed by a click event that lands outside is still treated as inside
		page
			.getByRole("button")
			.element()
			.dispatchEvent(new TouchEvent("touchstart", { bubbles: true }));
		page
			.getByTestId("outside")
			.element()
			.dispatchEvent(new MouseEvent("click", { bubbles: true }));

		expect(handleOutsideClick).not.toHaveBeenCalled();
	});
});
