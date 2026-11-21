import ReactDOM from "react-dom";
import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Button from "@/components/Button";
import Overlay from "@/components/Overlay";
import View from "@/components/View";
import useToggle from "@/hooks/useToggle";
import { render } from "@/tests/render";

/**
 * Transitions are paused for a couple of frames after the theme is mounted,
 * overlays opened during that time wait for them instead of animating right away
 */
const waitForTransitions = () => {
	return expect.element(document.documentElement).not.toHaveAttribute("data-rs-no-transition");
};

describe("Utility components/Overlay", () => {
	test("children, render props", async () => {
		await render(<Overlay active>{(args) => (args.active ? "Opened" : "Closed")}</Overlay>);

		await expect.element(page.getByText("Opened")).toBeInTheDocument();
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
					<Overlay
						active={overlayToggle.active}
						onClose={(closeArgs) => {
							overlayToggle.deactivate();
							handleClose(closeArgs);
						}}
						onAfterOpen={handleAfterOpen}
						onAfterClose={handleAfterClose}
						attributes={{ "data-testid": "overlay" }}
					>
						Content
					</Overlay>
				</>
			);
		};
		await render(<Component />);
		const trigger = page.getByRole("button", { name: "Open overlay" });
		const overlay = page.getByTestId("overlay");

		await userEvent.click(trigger);

		// Wait for transition
		await vi.waitFor(() => {
			expect(handleAfterOpen).toHaveBeenCalledTimes(1);
			expect(handleAfterOpen).toHaveBeenCalledWith();
		});

		// Close by changing the state, the overlay covers the trigger so it's clicked programmatically
		(trigger.element() as HTMLElement).click();

		// Changing state doesn't trigger onClose
		expect(handleClose).not.toHaveBeenCalled();

		// Wait for transition
		await vi.waitFor(() => {
			expect(handleAfterClose).toHaveBeenCalledTimes(1);
			expect(handleAfterClose).toHaveBeenCalledWith();
		});

		// Open and wait for the transition
		await userEvent.click(trigger);
		await vi.waitFor(() => expect(handleAfterOpen).toHaveBeenCalledTimes(2));

		// Close by clicking on the overlay outside of its content
		await userEvent.click(overlay, { position: { x: 5, y: 5 } });

		expect(handleClose).toHaveBeenCalledTimes(1);
		expect(handleClose).toHaveBeenCalledWith({ reason: "overlay-click" });

		await vi.waitFor(() => {
			expect(handleAfterClose).toHaveBeenCalledTimes(2);
			expect(handleAfterClose).toHaveBeenLastCalledWith();
		});

		// Open and wait for the transition
		await userEvent.click(trigger);
		await vi.waitFor(() => expect(handleAfterOpen).toHaveBeenCalledTimes(3));

		// Close by pressing Escape
		await userEvent.keyboard("{Escape}");

		expect(handleClose).toHaveBeenCalledTimes(2);
		expect(handleClose).toHaveBeenLastCalledWith({ reason: "escape-key" });

		await vi.waitFor(() => {
			expect(handleAfterClose).toHaveBeenCalledTimes(3);
			expect(handleAfterClose).toHaveBeenLastCalledWith();
		});
	});

	test("disableCloseOnClick", async () => {
		const handleClose = vi.fn();
		await render(
			<Overlay
				active
				disableCloseOnClick
				onClose={handleClose}
				attributes={{ "data-testid": "overlay" }}
			>
				Content
			</Overlay>
		);
		const overlay = page.getByTestId("overlay");

		await expect.element(page.getByText("Content")).toBeVisible();
		await userEvent.click(overlay, { position: { x: 5, y: 5 } });

		expect(handleClose).not.toHaveBeenCalled();

		await userEvent.keyboard("{Escape}");

		expect(handleClose).toHaveBeenCalledTimes(1);
		expect(handleClose).toHaveBeenCalledWith({ reason: "escape-key" });
	});

	test("className, attributes", async () => {
		await render(
			<Overlay active className="test-classname" attributes={{ "data-testid": "test-id" }}>
				Content
			</Overlay>
		);
		const root = page.getByTestId("test-id");

		await expect.element(root).toHaveClass("test-classname");
		// Backdrop click is a pointer shortcut, it shouldn't be announced as a button
		await expect.element(root).toHaveAttribute("role", "presentation");
	});

	test("test: click on a second portal doesn't close the overlay", async () => {
		const handleClose = vi.fn();
		const Component = () => {
			const overlayToggle = useToggle(false);

			return (
				<>
					<Button onClick={overlayToggle.activate}>Open overlay</Button>
					<Overlay
						active={overlayToggle.active}
						onClose={() => {
							handleClose();
							overlayToggle.deactivate();
						}}
					>
						Overlay content
						{ReactDOM.createPortal(
							<View
								position="absolute"
								insetTop={4}
								insetStart={4}
								width={30}
								height={30}
								backgroundColor="neutral"
								zIndex={9999}
								padding={4}
								attributes={{ "data-testid": "portal" }}
							>
								Portal
							</View>,
							document.body
						)}
					</Overlay>
				</>
			);
		};
		await render(<Component />);

		await userEvent.click(page.getByRole("button", { name: "Open overlay" }));

		const portal = page.getByTestId("portal");
		await expect.element(portal).toBeVisible();

		await userEvent.click(portal);

		expect(handleClose).not.toHaveBeenCalled();
		await expect.element(page.getByText("Overlay content")).toBeInTheDocument();
	});

	test("test: transition starts in the frame the overlay is opened in", async () => {
		const Component = () => {
			const overlayToggle = useToggle();

			return (
				<>
					<Button onClick={overlayToggle.activate}>Open overlay</Button>
					<Overlay active={overlayToggle.active} attributes={{ "data-testid": "overlay" }}>
						Content
					</Overlay>
				</>
			);
		};
		await render(<Component />);
		await waitForTransitions();

		// Clicked programmatically to check the overlay in the frame following the click
		(page.getByRole("button", { name: "Open overlay" }).element() as HTMLElement).click();
		await new Promise(requestAnimationFrame);

		// Overlay is already fading in instead of staying hidden for a few more frames
		const overlay = page.getByTestId("overlay");
		const transitions = overlay
			.element()
			.getAnimations()
			.filter((animation) => animation instanceof CSSTransition);

		expect(transitions).toHaveLength(1);
		expect(transitions[0].transitionProperty).toBe("opacity");

		await expect.element(overlay).toHaveStyle({ opacity: "1" });
	});

	test("test: closed before the open transition has started", async () => {
		const handleAfterClose = vi.fn();
		const Component = () => {
			const overlayToggle = useToggle();

			return (
				<>
					<Button onClick={overlayToggle.activate}>Open overlay</Button>
					<Button onClick={overlayToggle.deactivate}>Close overlay</Button>
					<Overlay
						active={overlayToggle.active}
						onAfterClose={handleAfterClose}
						attributes={{ "data-testid": "overlay" }}
					>
						Content
					</Overlay>
				</>
			);
		};
		await render(<Component />);
		await waitForTransitions();

		const openTrigger = page.getByRole("button", { name: "Open overlay" }).element() as HTMLElement;
		const closeTrigger = page
			.getByRole("button", { name: "Close overlay" })
			.element() as HTMLElement;
		const overlay = page.getByTestId("overlay");

		// Closed in the same frame it was opened in, before the browser could start its transition
		openTrigger.click();
		await Promise.resolve();
		expect(overlay.element()).toBeInTheDocument();
		closeTrigger.click();

		await expect.element(overlay).not.toBeInTheDocument();
		expect(handleAfterClose).toHaveBeenCalledTimes(1);

		// Overlay still animates the next time it opens
		openTrigger.click();
		await new Promise(requestAnimationFrame);

		expect(overlay.element().getAnimations()).toHaveLength(1);
	});
});
