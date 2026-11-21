import type React from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Button from "@/components/Button";
import Dismissible from "@/components/Dismissible";
import Modal from "@/components/Modal";
import useToggle from "@/hooks/useToggle";
import { render } from "@/tests/render";

const fireTouchEvent = (target: Element, type: "touchstart" | "touchend") => {
	const touch = new Touch({ identifier: 1, target, clientX: 100, clientY: 100 });
	const touches = type === "touchstart" ? [touch] : [];

	target.dispatchEvent(new TouchEvent(type, { bubbles: true, touches, changedTouches: [touch] }));
};

/**
 * Elements rendered around the modal for the swipe gesture: the scroll container
 * and the track wrapping the modal together with its offsets from the screen edges
 */
const getSwipeElements = (dialog: Element) => {
	const track = dialog.parentElement!;
	const scroller = track.parentElement!;
	const side = getComputedStyle(scroller).overflowY === "auto" ? "bottom" : "right";

	return {
		scroller,
		/** Distance the modal is scrolled away from its open position */
		getOffset: () =>
			Math.round(track.getBoundingClientRect()[side] - scroller.getBoundingClientRect()[side]),
	};
};

const SwipeDemo = (props: {
	position: "bottom" | "end";
	onClose: (args: { reason: string }) => void;
	keepOpen?: boolean;
}) => {
	const { active, activate, deactivate } = useToggle();

	return (
		<>
			<Button onClick={activate}>Open dialog</Button>
			<Modal
				active={active}
				position={props.position}
				onClose={(args) => {
					props.onClose(args);
					if (!props.keepOpen) deactivate();
				}}
			>
				<Modal.Title>Modal title</Modal.Title>
			</Modal>
		</>
	);
};

/** Opens the modal and waits for it to be scrolled to its open position */
const openSwipeDemo = async (props: React.ComponentProps<typeof SwipeDemo>) => {
	await render(<SwipeDemo {...props} />);
	await userEvent.click(page.getByRole("button", { name: "Open dialog" }));

	const dialog = page.getByRole("dialog");
	await expect.element(dialog).toBeInTheDocument();

	const elements = getSwipeElements(dialog.element());
	await expect.poll(elements.getOffset).toBe(0);

	return { dialog, ...elements };
};

/** Modal keeps its default positioning without the scroll container when it can't be swiped */
const expectDefaultPositioning = async () => {
	const dialog = page.getByRole("dialog");
	await expect.element(dialog).toBeInTheDocument();

	expect(getComputedStyle(getSwipeElements(dialog.element()).scroller).display).toBe("contents");
	expect(getComputedStyle(dialog.element()).position).toBe("absolute");
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

	test("test: virtual keyboard", async () => {
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
		const getKeyboardHeight = () =>
			root.element().style.getPropertyValue("--rs-modal-keyboard-height");

		expect(getKeyboardHeight()).toBe("0px");

		try {
			// On-screen keyboard shrinks the visual viewport without changing the layout
			Object.defineProperty(viewport, "height", {
				configurable: true,
				value: window.innerHeight - 300,
			});
			viewport.dispatchEvent(new Event("resize"));

			// Bottom safe area inset is reduced by the keyboard height covering it
			await expect.poll(getKeyboardHeight).toBe("300px");
		} finally {
			// @ts-expect-error Removes the stubbed value from the viewport itself
			delete viewport.height;
		}

		viewport.dispatchEvent(new Event("resize"));

		await expect.poll(getKeyboardHeight).toBe("0px");
	});

	test("test: swipe gesture is not available without touch support", async () => {
		await render(
			<Modal active position="bottom">
				<Modal.Title>Modal title</Modal.Title>
			</Modal>
		);

		await expectDefaultPositioning();
	});

	/**
	 * Swipe gesture is only enabled on touch devices, where it's handled by the native scrolling.
	 * Scrolling can't be triggered with touch events in tests, so they stub the touch support
	 * and scroll the modal container the same way the browser does while the modal is swiped
	 */
	describe("swipe gesture", () => {
		beforeEach(() => {
			vi.spyOn(navigator, "maxTouchPoints", "get").mockReturnValue(1);
		});

		afterEach(() => {
			vi.restoreAllMocks();
		});

		test("keeps the scroll container interactive outside of the overlay area", async () => {
			const { dialog, scroller } = await openSwipeDemo({ position: "bottom", onClose: vi.fn() });
			// Hit testing needs the modal at its final position, after the open animation
			await Promise.all(
				dialog
					.element()
					.getAnimations()
					.map((animation) => animation.finished)
			);
			const dialogRect = dialog.element().getBoundingClientRect();
			const hitTest = (y: number) => document.elementFromPoint(dialogRect.left + 10, y);

			// iOS only scrolls containers that receive pointer events themselves,
			// even when the touch starts on their children
			expect(getComputedStyle(scroller).pointerEvents).not.toBe("none");
			expect(dialog.element().contains(hitTest(dialogRect.top + 10))).toBe(true);

			// Area above the modal still belongs to the overlay
			expect(scroller.contains(hitTest(dialogRect.top - 40))).toBe(false);
		});

		test("closes the modal", async () => {
			const handleClose = vi.fn();
			const { dialog, scroller } = await openSwipeDemo({
				position: "bottom",
				onClose: handleClose,
			});

			// Modal is rendered after a spacer of the screen size and is scrolled into the view
			expect(getComputedStyle(scroller).overflowY).toBe("auto");
			expect(scroller.scrollTop).toBeGreaterThan(0);

			fireTouchEvent(dialog.element(), "touchstart");
			scroller.scrollTop = 0;
			fireTouchEvent(dialog.element(), "touchend");

			await vi.waitFor(() => expect(handleClose).toHaveBeenCalledTimes(1));
			expect(handleClose).toHaveBeenCalledWith({ reason: "drag" });

			// Modal is already out of the view, so it's removed without the close animation
			await expect.element(dialog, { timeout: 300 }).not.toBeInTheDocument();
		});

		test("doesn't close the modal while it's held with a finger", async () => {
			const handleClose = vi.fn();
			const { dialog, scroller } = await openSwipeDemo({
				position: "bottom",
				onClose: handleClose,
			});

			fireTouchEvent(dialog.element(), "touchstart");
			scroller.scrollTop = 0;
			// Resolved synchronously, without waiting for the browser to report the end of the scrolling
			scroller.dispatchEvent(new Event("scrollend"));

			expect(scroller.scrollTop).toBe(0);
			expect(handleClose).not.toHaveBeenCalled();
		});

		test("ignores scrolling that isn't started with a touch", async () => {
			const handleClose = vi.fn();
			const { scroller, getOffset } = await openSwipeDemo({
				position: "bottom",
				onClose: handleClose,
			});

			// For example, scrolling triggered with a keyboard
			scroller.scrollTop = 0;
			scroller.dispatchEvent(new Event("scrollend"));

			await expect.poll(getOffset).toBe(0);
			expect(handleClose).not.toHaveBeenCalled();
		});

		test("returns the modal released before it's swiped away", async () => {
			const handleClose = vi.fn();
			const { dialog, scroller, getOffset } = await openSwipeDemo({
				position: "bottom",
				onClose: handleClose,
			});

			fireTouchEvent(dialog.element(), "touchstart");
			scroller.scrollTop -= 20;
			fireTouchEvent(dialog.element(), "touchend");

			// Browser snaps the modal back to its open position
			await expect.poll(getOffset).toBe(0);
			scroller.dispatchEvent(new Event("scrollend"));

			expect(handleClose).not.toHaveBeenCalled();
		});

		test("returns the modal kept open in onClose", async () => {
			const handleClose = vi.fn();
			const { dialog, scroller, getOffset } = await openSwipeDemo({
				position: "end",
				onClose: handleClose,
				keepOpen: true,
			});

			// Side modals are swiped away horizontally
			expect(getComputedStyle(scroller).overflowX).toBe("auto");
			expect(scroller.scrollLeft).toBeGreaterThan(0);

			fireTouchEvent(dialog.element(), "touchstart");
			scroller.scrollLeft = 0;
			fireTouchEvent(dialog.element(), "touchend");

			await vi.waitFor(() => expect(handleClose).toHaveBeenCalledWith({ reason: "drag" }));

			// Active state was not changed, so the modal scrolls back to its open position
			await expect.poll(getOffset, { timeout: 3000 }).toBe(0);
			await expect.element(dialog).toBeInTheDocument();
			expect(handleClose).toHaveBeenCalledTimes(1);
		});

		test("disableSwipeGesture", async () => {
			await render(
				<Modal active position="bottom" disableSwipeGesture>
					<Modal.Title>Modal title</Modal.Title>
				</Modal>
			);

			await expectDefaultPositioning();
		});
	});
});
