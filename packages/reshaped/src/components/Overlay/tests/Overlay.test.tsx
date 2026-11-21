import ReactDOM from "react-dom";
import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Button from "@/components/Button";
import Overlay from "@/components/Overlay";
import View from "@/components/View";
import useToggle from "@/hooks/useToggle";
import { render } from "@/tests/render";

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
});
