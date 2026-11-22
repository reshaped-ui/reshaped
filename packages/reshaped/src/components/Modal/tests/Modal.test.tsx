import type React from "react";
import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Button from "@/components/Button";
import Dismissible from "@/components/Dismissible";
import Modal from "@/components/Modal";
import useToggle from "@/hooks/useToggle";
import { render } from "@/tests/render";

type TouchType = "touchstart" | "touchmove" | "touchend" | "touchcancel";

const fireTouchEvent = (target: EventTarget, type: TouchType, point: { x: number; y: number }) => {
	const touch = new Touch({
		identifier: 1,
		target: target instanceof Element ? target : document.body,
		clientX: point.x,
		clientY: point.y,
	});
	const touches = type === "touchstart" || type === "touchmove" ? [touch] : [];

	target.dispatchEvent(
		new TouchEvent(type, {
			bubbles: true,
			touches,
			targetTouches: touches,
			changedTouches: [touch],
		})
	);
};

/**
 * Swipe gesture driven with touch events, moving the finger in steps along the path.
 * Finger rests before the release by default, so the release velocity doesn't affect the result
 */
const swipe = async (
	el: Element,
	args: { from: { x: number; y: number }; by: { x?: number; y?: number }; release?: TouchType }
) => {
	const { from, by, release = "touchend" } = args;
	const steps = 10;
	let point = from;

	fireTouchEvent(el, "touchstart", from);
	// Move listeners are added once the gesture has started
	await new Promise(requestAnimationFrame);

	for (let i = 1; i <= steps; i++) {
		point = { x: from.x + ((by.x ?? 0) * i) / steps, y: from.y + ((by.y ?? 0) * i) / steps };
		fireTouchEvent(document, "touchmove", point);
	}

	if (release === "touchmove") return;

	// Velocity is measured over the most recent moves
	await new Promise((resolve) => setTimeout(resolve, 150));
	fireTouchEvent(document, release, point);
};

const getDragOffset = (el: Element) => {
	return parseFloat((el as HTMLElement).style.getPropertyValue("--rs-modal-drag"));
};

const SwipeDemo = (props: {
	position?: "bottom" | "end" | "full-screen";
	onClose: (args: { reason: string }) => void;
	keepOpen?: boolean;
	disableSwipeGesture?: boolean;
	children?: React.ReactNode;
}) => {
	const { active, activate, deactivate } = useToggle();

	return (
		<>
			<Button onClick={activate}>Open dialog</Button>
			<Modal
				active={active}
				position={props.position ?? "bottom"}
				size={props.position === "bottom" || !props.position ? "300px" : undefined}
				disableSwipeGesture={props.disableSwipeGesture}
				onClose={(args) => {
					props.onClose(args);
					if (!props.keepOpen) deactivate();
				}}
			>
				<Modal.Title>Modal title</Modal.Title>
				{props.children}
			</Modal>
		</>
	);
};

/** Opens the modal and waits for its open animation, so the gesture starts from its open position */
const openSwipeDemo = async (props: React.ComponentProps<typeof SwipeDemo>) => {
	await render(<SwipeDemo {...props} />);
	await userEvent.click(page.getByRole("button", { name: "Open dialog" }));

	const dialog = page.getByRole("dialog");
	await expect.element(dialog).toBeInTheDocument();
	await Promise.all(
		dialog
			.element()
			.getAnimations()
			.map((animation) => animation.finished)
	);

	const el = dialog.element();
	const rect = el.getBoundingClientRect();

	return { dialog, el, from: { x: rect.left + 100, y: rect.top + 20 } };
};

describe("Components/Modal", () => {
	test("children, render props", async () => {
		await render(
			<Modal active>
				<Modal.Title>Title</Modal.Title>
				Content
			</Modal>
		);

		await expect.element(page.getByText("Content")).toBeInTheDocument();
		await expect.element(page.getByRole("dialog")).toHaveAccessibleName("Title");
	});

	test("onClose, onAfterOpen, onAfterClose", async () => {
		const handleClose = vi.fn();
		const handleAfterOpen = vi.fn();
		const handleAfterClose = vi.fn();
		const Component = () => {
			const overlayToggle = useToggle();

			return (
				<>
					<Button onClick={() => overlayToggle.toggle()}>Open overlay</Button>
					<Modal
						active={overlayToggle.active}
						onClose={(closeArgs) => {
							overlayToggle.deactivate();
							handleClose(closeArgs);
						}}
						onAfterOpen={handleAfterOpen}
						onAfterClose={handleAfterClose}
					>
						<Modal.Title>Title</Modal.Title>
						Content
					</Modal>
				</>
			);
		};
		await render(<Component />);
		const trigger = page.getByRole("button", { name: "Open overlay" });

		await userEvent.click(trigger);

		// Wait for transition
		await vi.waitFor(() => {
			expect(handleAfterOpen).toHaveBeenCalledTimes(1);
			expect(handleAfterOpen).toHaveBeenCalledWith();
		});

		// Close by changing the state, the overlay covers the trigger so it's clicked programmatically
		(trigger.element() as HTMLElement).click();

		// Wait for transition
		await vi.waitFor(() => {
			expect(handleAfterClose).toHaveBeenCalledTimes(1);
			expect(handleAfterClose).toHaveBeenCalledWith();
		});
		// Changing state doesn't trigger onClose
		expect(handleClose).not.toHaveBeenCalled();

		// Open and wait for the transition
		await userEvent.click(trigger);
		await vi.waitFor(() => expect(handleAfterOpen).toHaveBeenCalledTimes(2));

		// Close by clicking on the overlay outside of the dialog
		const overlay = Array.from(document.querySelectorAll<HTMLElement>("[role=presentation]")).at(
			-1
		)!;
		await userEvent.click(page.elementLocator(overlay), { position: { x: 5, y: 5 } });

		await vi.waitFor(() => {
			expect(handleClose).toHaveBeenCalledTimes(1);
			expect(handleClose).toHaveBeenCalledWith({ reason: "overlay-click" });

			expect(handleAfterClose).toHaveBeenCalledTimes(2);
			expect(handleAfterClose).toHaveBeenLastCalledWith();
		});

		// Open and wait for the transition
		await userEvent.click(trigger);
		await vi.waitFor(() => expect(handleAfterOpen).toHaveBeenCalledTimes(3));

		// Close by pressing Escape
		await userEvent.keyboard("{Escape}");

		await vi.waitFor(() => {
			expect(handleClose).toHaveBeenCalledTimes(2);
			expect(handleClose).toHaveBeenLastCalledWith({ reason: "escape-key" });

			expect(handleAfterClose).toHaveBeenCalledTimes(3);
			expect(handleAfterClose).toHaveBeenLastCalledWith();
		});
	});

	test("className, attributes", async () => {
		await render(
			<Modal active className="test-classname" attributes={{ "data-testid": "test-id" }}>
				<Modal.Title>Title</Modal.Title>
				Content
			</Modal>
		);

		await expect.element(page.getByTestId("test-id")).toHaveClass("test-classname");
	});

	test("stays in place when the on-screen keyboard covers the viewport", async () => {
		const Component = () => {
			const { active, activate, deactivate } = useToggle();

			return (
				<>
					<Button onClick={activate}>Open dialog</Button>
					<Modal active={active} onClose={deactivate} position="end">
						<Dismissible onClose={deactivate} closeAriaLabel="Close modal">
							<Modal.Title>Modal title</Modal.Title>
						</Dismissible>
					</Modal>
				</>
			);
		};
		await render(<Component />);
		const viewport = window.visualViewport!;

		await userEvent.click(page.getByRole("button", { name: "Open dialog" }));

		const root = page.getByRole("dialog");
		await expect.element(root).toBeInTheDocument();
		const getBottom = () => root.element().getBoundingClientRect().bottom;
		const bottom = getBottom();

		try {
			// On-screen keyboard shrinks the visual viewport without changing the layout,
			// and revealing the focused field above it is left to the browser
			Object.defineProperty(viewport, "height", {
				configurable: true,
				value: window.innerHeight - 300,
			});
			viewport.dispatchEvent(new Event("resize"));
			await new Promise(requestAnimationFrame);

			expect(getBottom()).toBe(bottom);
		} finally {
			// @ts-expect-error Removes the stubbed value from the viewport itself
			delete viewport.height;
		}
	});

	describe("swipe gesture", () => {
		test("follows the finger and closes the modal released past half of its size", async () => {
			const handleClose = vi.fn();
			const { dialog, el, from } = await openSwipeDemo({ onClose: handleClose });

			await swipe(el, { from, by: { y: 60 }, release: "touchmove" });

			// Modal follows the finger without a dead zone
			expect(getDragOffset(el)).toBe(60);

			fireTouchEvent(document, "touchmove", { x: from.x, y: from.y + 200 });
			await new Promise((resolve) => setTimeout(resolve, 150));
			fireTouchEvent(document, "touchend", { x: from.x, y: from.y + 200 });

			expect(handleClose).toHaveBeenCalledTimes(1);
			expect(handleClose).toHaveBeenCalledWith({ reason: "drag" });
			await expect.element(dialog).not.toBeInTheDocument();
		});

		test("returns the modal released before half of its size", async () => {
			const handleClose = vi.fn();
			const { dialog, el, from } = await openSwipeDemo({ onClose: handleClose });

			await swipe(el, { from, by: { y: 100 } });

			expect(handleClose).not.toHaveBeenCalled();
			await expect.poll(() => getDragOffset(el)).toBe(0);
			await expect.element(dialog).toBeInTheDocument();
		});

		test("closes the modal flicked with a high velocity", async () => {
			const handleClose = vi.fn();
			const { el, from } = await openSwipeDemo({ onClose: handleClose });

			// Moves are dispatched right after each other, so the release velocity is high
			await swipe(el, { from, by: { y: 40 }, release: "touchmove" });
			fireTouchEvent(document, "touchend", { x: from.x, y: from.y + 40 });

			expect(handleClose).toHaveBeenCalledWith({ reason: "drag" });
		});

		test("resists dragging past the open position", async () => {
			const { el, from } = await openSwipeDemo({ onClose: vi.fn() });

			await swipe(el, { from, by: { y: -150 }, release: "touchmove" });

			const offset = getDragOffset(el);
			expect(offset).toBeLessThan(0);
			// Square root damping keeps the modal close to its open position
			expect(offset).toBeGreaterThan(-Math.sqrt(150) - 1);

			fireTouchEvent(document, "touchend", { x: from.x, y: from.y - 150 });
			await expect.poll(() => getDragOffset(el)).toBe(0);
		});

		test("doesn't catch the modal released towards its closed position", async () => {
			const { el, from } = await openSwipeDemo({ onClose: vi.fn() });

			await swipe(el, { from, by: { y: 200 } });

			// Touching the closing modal doesn't stop its close animation
			fireTouchEvent(el, "touchstart", from);
			await new Promise(requestAnimationFrame);

			expect(getComputedStyle(el).transitionProperty).not.toBe("none");
		});

		test("lets the page receive input while the modal is closing", async () => {
			const { el, from } = await openSwipeDemo({ onClose: vi.fn() });

			await swipe(el, { from, by: { y: 200 } });

			expect(getComputedStyle(el).pointerEvents).toBe("none");
		});

		test("returns the modal kept open in onClose", async () => {
			const handleClose = vi.fn();
			const { dialog, el, from } = await openSwipeDemo({ onClose: handleClose, keepOpen: true });

			await swipe(el, { from, by: { y: 200 } });

			expect(handleClose).toHaveBeenCalledWith({ reason: "drag" });
			await expect.poll(() => getDragOffset(el)).toBe(0);
			await expect.element(dialog).toBeInTheDocument();
		});

		test("returns the modal when the touch is cancelled", async () => {
			const handleClose = vi.fn();
			const { el, from } = await openSwipeDemo({ onClose: handleClose });

			// Gesture taken over by the system instead of being released
			await swipe(el, { from, by: { y: 200 }, release: "touchcancel" });

			expect(handleClose).not.toHaveBeenCalled();
			await expect.poll(() => getDragOffset(el)).toBe(0);
		});

		test("scrolls the content first and moves the modal once it reaches its edge", async () => {
			const { el, from } = await openSwipeDemo({
				onClose: vi.fn(),
				children: <div style={{ height: 1000 }} />,
			});

			el.scrollTop = 50;
			await swipe(el, { from, by: { y: 30 }, release: "touchmove" });

			// Touch events don't scroll the content in tests, so it keeps the modal in place
			expect(getDragOffset(el)).toBe(0);

			// Content reaches its top while the finger keeps moving
			el.scrollTop = 0;
			fireTouchEvent(document, "touchmove", { x: from.x, y: from.y + 50 });
			fireTouchEvent(document, "touchmove", { x: from.x, y: from.y + 90 });

			// Modal follows the finger from the point where the content stopped scrolling
			expect(getDragOffset(el)).toBe(60);
		});

		test("moves full-screen modals towards the end side", async () => {
			const { el, from } = await openSwipeDemo({ position: "full-screen", onClose: vi.fn() });

			await swipe(el, { from, by: { x: 80 }, release: "touchmove" });

			expect(getDragOffset(el)).toBe(80);
		});

		test("disableSwipeGesture", async () => {
			const { el, from } = await openSwipeDemo({ onClose: vi.fn(), disableSwipeGesture: true });

			await swipe(el, { from, by: { y: 60 }, release: "touchmove" });

			expect(getDragOffset(el)).toBe(0);
		});
	});
});
