import React from "react";
import { describe, expect, test, vi } from "vitest";
import { page } from "vitest/browser";

import View from "@/components/View";
import useDrag, { type UseDragCallbackArgs } from "@/hooks/_internal/useDrag";
import { render } from "@/tests/render";

const Demo = (props: {
	onDrag: (args: UseDragCallbackArgs) => void;
	disabled?: boolean;
	orientation?: "horizontal" | "vertical";
}) => {
	const { ref, containerRef, active } = useDrag<HTMLDivElement>(
		(options) => {
			props.onDrag(options);
		},
		{
			orientation: props.orientation,
			disabled: props.disabled,
		}
	);

	return (
		<View
			backgroundColor="neutral-faded"
			width="200px"
			height="200px"
			attributes={{ ref: containerRef, "data-testid": "test-id" }}
		>
			<View
				height={8}
				width={8}
				backgroundColor="primary"
				attributes={{
					"data-testid": "test-handle-id",
					"data-active": active,
					ref,
				}}
			/>
		</View>
	);
};

const fireMouseEvent = (
	el: Element,
	type: "mousedown" | "mousemove" | "mouseup",
	init?: MouseEventInit
) => {
	el.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, ...init }));
};

const fireTouchEvent = (
	el: Element,
	type: "touchstart" | "touchmove" | "touchend",
	init?: TouchEventInit
) => {
	el.dispatchEvent(new TouchEvent(type, { bubbles: true, cancelable: true, ...init }));
};

const createTouch = (target: Element, x: number, y: number) =>
	new Touch({
		identifier: Date.now(),
		target,
		clientX: x,
		clientY: y,
		screenX: x,
		screenY: y,
		pageX: x,
		pageY: y,
	});

/**
 * Start dragging and wait for the hook to subscribe to the move events
 */
const startMouseDrag = async (trigger: ReturnType<typeof page.getByTestId>) => {
	fireMouseEvent(trigger.element(), "mousedown");
	await expect.element(trigger).toHaveAttribute("data-active", "true");
};

describe("Hooks/Internal/useDrag", () => {
	test("onDrag, mouse events", async () => {
		const handleDrag = vi.fn();
		await render(<Demo onDrag={handleDrag} />);
		const trigger = page.getByTestId("test-handle-id");

		await startMouseDrag(trigger);
		fireMouseEvent(document.body, "mousemove", { clientX: 100, clientY: 50 });

		expect(handleDrag).toHaveBeenCalledTimes(1);
		expect(handleDrag).toHaveBeenCalledWith(expect.objectContaining({ x: 100, y: 50 }));

		fireMouseEvent(trigger.element(), "mouseup");
		await expect.element(trigger).toHaveAttribute("data-active", "false");
		fireMouseEvent(document.body, "mouseup", { clientX: 50, clientY: 100 });
		fireMouseEvent(document.body, "mousemove", { clientX: 50, clientY: 100 });

		expect(handleDrag).toHaveBeenCalledTimes(1);
	});

	test("onDrag, touch events", async () => {
		const handleDrag = vi.fn();
		await render(<Demo onDrag={handleDrag} />);
		const trigger = page.getByTestId("test-handle-id");
		const triggerEl = trigger.element();

		fireTouchEvent(triggerEl, "touchstart", { changedTouches: [createTouch(triggerEl, 0, 0)] });
		await expect.element(trigger).toHaveAttribute("data-active", "true");
		fireTouchEvent(document.body, "touchmove", {
			changedTouches: [createTouch(triggerEl, 100, 50)],
		});

		expect(handleDrag).toHaveBeenCalledTimes(1);
		expect(handleDrag).toHaveBeenCalledWith(expect.objectContaining({ x: 100, y: 50 }));

		fireTouchEvent(triggerEl, "touchend");
		await expect.element(trigger).toHaveAttribute("data-active", "false");
		fireTouchEvent(document.body, "touchend", {
			changedTouches: [createTouch(triggerEl, 100, 50)],
		});
		fireTouchEvent(document.body, "touchmove", {
			changedTouches: [createTouch(triggerEl, 50, 100)],
		});

		expect(handleDrag).toHaveBeenCalledTimes(1);
	});

	test("orientation horizontal", async () => {
		const handleDrag = vi.fn();
		await render(<Demo onDrag={handleDrag} orientation="horizontal" />);
		const trigger = page.getByTestId("test-handle-id");

		await startMouseDrag(trigger);
		fireMouseEvent(document.body, "mousemove", { clientX: 100, clientY: 50 });
		fireMouseEvent(document.body, "mouseup");

		expect(handleDrag).toHaveBeenCalledTimes(1);
		expect(handleDrag).toHaveBeenCalledWith(expect.objectContaining({ x: 100, y: 0 }));
	});

	test("orientation vertical", async () => {
		const handleDrag = vi.fn();
		await render(<Demo onDrag={handleDrag} orientation="vertical" />);
		const trigger = page.getByTestId("test-handle-id");

		await startMouseDrag(trigger);
		fireMouseEvent(document.body, "mousemove", { clientX: 100, clientY: 50 });
		fireMouseEvent(document.body, "mouseup");

		expect(handleDrag).toHaveBeenCalledTimes(1);
		expect(handleDrag).toHaveBeenCalledWith(expect.objectContaining({ x: 0, y: 50 }));
	});

	test("disabled", async () => {
		const handleDrag = vi.fn();
		await render(<Demo onDrag={handleDrag} disabled />);
		const trigger = page.getByTestId("test-handle-id");

		fireMouseEvent(trigger.element(), "mousedown");
		// Give React a frame to commit a possible drag start
		await new Promise(requestAnimationFrame);
		await expect.element(trigger).toHaveAttribute("data-active", "false");
		fireMouseEvent(document.body, "mousemove", { clientX: 100, clientY: 50 });

		expect(handleDrag).toHaveBeenCalledTimes(0);
	});
});
