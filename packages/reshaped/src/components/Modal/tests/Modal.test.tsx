import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Button from "@/components/Button";
import Dismissible from "@/components/Dismissible";
import Modal from "@/components/Modal";
import useToggle from "@/hooks/useToggle";
import { render } from "@/tests/render";

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
});
