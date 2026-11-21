import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Button from "@/components/Button";
import Dismissible from "@/components/Dismissible";
import Modal from "@/components/Modal";
import useToggle from "@/hooks/useToggle";
import { render } from "@/tests/render";

/**
 * Swipe gesture is only enabled on touch devices, where it's handled by the native scrolling.
 * Scrolling can't be triggered with touch events in tests, so they stub the touch support
 * and scroll the modal container the same way the browser does while the modal is swiped
 */
const stubTouchSupport = () => {
	Object.defineProperty(navigator, "maxTouchPoints", { configurable: true, value: 1 });

	return () => {
		// @ts-expect-error Removes the stubbed value from the navigator itself
		delete navigator.maxTouchPoints;
	};
};

const fireTouchEvent = (target: Element, type: "touchstart" | "touchend") => {
	const touch = new Touch({ identifier: 1, target, clientX: 100, clientY: 100 });
	const touches = type === "touchstart" ? [touch] : [];

	target.dispatchEvent(new TouchEvent(type, { bubbles: true, touches, changedTouches: [touch] }));
};

/** Scroll container and the element wrapping the modal with its offsets from the screen edges */
const getScrollElements = (dialog: Element) => {
	const track = dialog.parentElement!;

	return { track, scroller: track.parentElement! };
};

const SwipeDemo = (props: {
	position: "bottom" | "end";
	onClose: (args: { reason: string }) => void;
	keepOpen?: boolean;
	disableSwipeGesture?: boolean;
}) => {
	const { active, activate, deactivate } = useToggle();

	return (
		<>
			<Button onClick={activate}>Open dialog</Button>
			<Modal
				active={active}
				position={props.position}
				disableSwipeGesture={props.disableSwipeGesture}
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

	test("test: swipe gesture closes the modal", async () => {
		const handleClose = vi.fn();
		const restoreTouchSupport = stubTouchSupport();

		try {
			await render(<SwipeDemo position="bottom" onClose={handleClose} />);
			const trigger = page.getByRole("button", { name: "Open dialog" });
			const dialog = page.getByRole("dialog");

			await userEvent.click(trigger);
			await expect.element(dialog).toBeInTheDocument();

			const { scroller, track } = getScrollElements(dialog.element());
			// Distance the modal is scrolled away from its open position
			const getOffset = () => {
				return Math.round(
					track.getBoundingClientRect().bottom - scroller.getBoundingClientRect().bottom
				);
			};

			// Modal is rendered after a spacer of the screen size and is scrolled into the view
			expect(getComputedStyle(scroller).overflowY).toBe("auto");
			await expect.poll(getOffset).toBe(0);
			expect(scroller.scrollTop).toBeGreaterThan(0);

			// Scrolling without a touch is not a part of the gesture, e.g. when it's triggered with a keyboard
			scroller.scrollTop = 0;
			scroller.dispatchEvent(new Event("scrollend"));

			await expect.poll(getOffset).toBe(0);
			expect(handleClose).not.toHaveBeenCalled();

			// Modal is not closed while it's still held with a finger
			fireTouchEvent(dialog.element(), "touchstart");
			scroller.scrollTop = 0;
			scroller.dispatchEvent(new Event("scrollend"));

			expect(scroller.scrollTop).toBe(0);
			expect(handleClose).not.toHaveBeenCalled();

			fireTouchEvent(dialog.element(), "touchend");

			await vi.waitFor(() => expect(handleClose).toHaveBeenCalledTimes(1));
			expect(handleClose).toHaveBeenCalledWith({ reason: "drag" });

			// Modal is already out of the view, so it's removed without the close animation
			await expect.element(dialog, { timeout: 300 }).not.toBeInTheDocument();
		} finally {
			restoreTouchSupport();
		}
	});

	test("test: swipe gesture returns the modal released before it's swiped away", async () => {
		const handleClose = vi.fn();
		const restoreTouchSupport = stubTouchSupport();

		try {
			await render(<SwipeDemo position="bottom" onClose={handleClose} />);
			const dialog = page.getByRole("dialog");

			await userEvent.click(page.getByRole("button", { name: "Open dialog" }));
			await expect.element(dialog).toBeInTheDocument();

			const { scroller, track } = getScrollElements(dialog.element());
			const getOffset = () => {
				return Math.round(
					track.getBoundingClientRect().bottom - scroller.getBoundingClientRect().bottom
				);
			};

			await expect.poll(getOffset).toBe(0);

			fireTouchEvent(dialog.element(), "touchstart");
			scroller.scrollTop -= 20;
			fireTouchEvent(dialog.element(), "touchend");

			// Browser snaps the modal back to its open position
			await expect.poll(getOffset).toBe(0);
			scroller.dispatchEvent(new Event("scrollend"));

			expect(handleClose).not.toHaveBeenCalled();
			await expect.element(dialog).toBeInTheDocument();
		} finally {
			restoreTouchSupport();
		}
	});

	test("test: swipe gesture returns the modal kept open in onClose", async () => {
		const handleClose = vi.fn();
		const restoreTouchSupport = stubTouchSupport();

		try {
			await render(<SwipeDemo position="end" onClose={handleClose} keepOpen />);
			const dialog = page.getByRole("dialog");

			await userEvent.click(page.getByRole("button", { name: "Open dialog" }));
			await expect.element(dialog).toBeInTheDocument();

			const { scroller, track } = getScrollElements(dialog.element());
			const getOffset = () => {
				return Math.round(
					track.getBoundingClientRect().right - scroller.getBoundingClientRect().right
				);
			};

			// Side modals are swiped away horizontally
			expect(getComputedStyle(scroller).overflowX).toBe("auto");
			await expect.poll(getOffset).toBe(0);
			expect(scroller.scrollLeft).toBeGreaterThan(0);

			fireTouchEvent(dialog.element(), "touchstart");
			scroller.scrollLeft = 0;
			fireTouchEvent(dialog.element(), "touchend");

			await vi.waitFor(() => expect(handleClose).toHaveBeenCalledWith({ reason: "drag" }));

			// Active state was not changed, so the modal scrolls back to its open position
			await expect.poll(getOffset, { timeout: 3000 }).toBe(0);
			await expect.element(dialog).toBeInTheDocument();
			expect(handleClose).toHaveBeenCalledTimes(1);
		} finally {
			restoreTouchSupport();
		}
	});

	test("test: swipe gesture is not available without touch support and with disableSwipeGesture", async () => {
		const Component = (props: { disableSwipeGesture?: boolean }) => (
			<Modal active position="bottom" disableSwipeGesture={props.disableSwipeGesture}>
				<Modal.Title>Modal title</Modal.Title>
			</Modal>
		);
		const dialog = page.getByRole("dialog");
		// Modal keeps its default positioning without the scroll container when it can't be swiped
		const expectDefaultPositioning = async () => {
			await expect.element(dialog).toBeInTheDocument();

			const { scroller } = getScrollElements(dialog.element());

			expect(getComputedStyle(scroller).display).toBe("contents");
			expect(getComputedStyle(dialog.element()).position).toBe("absolute");
		};

		const screen = await render(<Component />);
		await expectDefaultPositioning();
		await screen.unmount();

		const restoreTouchSupport = stubTouchSupport();

		try {
			await render(<Component disableSwipeGesture />);
			await expectDefaultPositioning();
		} finally {
			restoreTouchSupport();
		}
	});
});
