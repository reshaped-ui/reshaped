import React from "react";
import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Button from "@/components/Button";
import Popover from "@/components/Popover";
import View from "@/components/View";
import { render } from "@/tests/render";

/**
 * Transitions are disabled for the first frames after the color mode gets applied
 */
const waitForTransitions = () =>
	expect.poll(() => document.documentElement.hasAttribute("data-rs-no-transition")).toBe(false);

describe("Components/Popover", () => {
	test("defaultActive, uncontrolled", async () => {
		const handleOpen = vi.fn();
		const handleClose = vi.fn();
		await render(
			<Popover onOpen={handleOpen} onClose={handleClose} defaultActive>
				<Popover.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</Popover.Trigger>
				<Popover.Content>Content</Popover.Content>
			</Popover>
		);
		const content = page.getByText("Content");

		await expect.element(content).toBeVisible();
		await userEvent.click(document.body);

		await vi.waitFor(() => {
			expect(handleClose).toHaveBeenCalledTimes(1);
			expect(handleClose).toHaveBeenCalledWith({ reason: "outside-click" });
		});
		await expect.element(content).not.toBeInTheDocument();

		await userEvent.click(page.getByRole("button", { name: "Open" }));

		await vi.waitFor(() => {
			expect(handleOpen).toHaveBeenCalledTimes(1);
			expect(handleOpen).toHaveBeenCalledWith();
		});
		await expect.element(content).toBeInTheDocument();
	});

	test("active, controlled", async () => {
		const handleOpen = vi.fn();
		const handleClose = vi.fn();
		await render(
			<Popover onOpen={handleOpen} onClose={handleClose} active>
				<Popover.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</Popover.Trigger>
				<Popover.Content>Content</Popover.Content>
			</Popover>
		);
		const content = page.getByText("Content");

		await expect.element(content).toBeVisible();
		await userEvent.click(document.body);

		await vi.waitFor(() => {
			expect(handleClose).toHaveBeenCalledTimes(1);
			expect(handleClose).toHaveBeenCalledWith({ reason: "outside-click" });
		});
		await expect.element(content).toBeInTheDocument();
	});

	test("active false, controlled", async () => {
		const handleOpen = vi.fn();
		const handleClose = vi.fn();
		await render(
			<Popover onOpen={handleOpen} onClose={handleClose} active={false}>
				<Popover.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</Popover.Trigger>
				<Popover.Content>Content</Popover.Content>
			</Popover>
		);

		await userEvent.click(page.getByRole("button", { name: "Open" }));

		await vi.waitFor(() => {
			expect(handleOpen).toHaveBeenCalledTimes(1);
			expect(handleOpen).toHaveBeenCalledWith();
		});
		await expect.element(page.getByText("Content")).not.toBeInTheDocument();
	});

	test("onAfterOpen, onAfterClose", async () => {
		const handleClose = vi.fn();
		const handleAfterOpen = vi.fn();
		const handleAfterClose = vi.fn();
		const Component = () => {
			const [active, setActive] = React.useState(false);

			return (
				<Popover
					active={active}
					onOpen={() => setActive(true)}
					onClose={(closeArgs) => {
						setActive(false);
						handleClose(closeArgs);
					}}
					onAfterOpen={handleAfterOpen}
					onAfterClose={handleAfterClose}
				>
					<Popover.Trigger>
						{(attributes) => <Button attributes={attributes}>Open</Button>}
					</Popover.Trigger>
					<Popover.Content>Content</Popover.Content>
				</Popover>
			);
		};
		await render(<Component />);
		await waitForTransitions();

		await userEvent.click(page.getByRole("button", { name: "Open" }));

		// Wait for the open transition
		await vi.waitFor(() => {
			expect(handleAfterOpen).toHaveBeenCalledTimes(1);
			expect(handleAfterOpen).toHaveBeenCalledWith();
		});
		expect(handleAfterClose).not.toHaveBeenCalled();

		// Close by clicking outside
		await userEvent.click(document.body);

		// Wait for the close transition
		await vi.waitFor(() => {
			expect(handleClose).toHaveBeenCalledTimes(1);
			expect(handleAfterClose).toHaveBeenCalledTimes(1);
			expect(handleAfterClose).toHaveBeenCalledWith();
		});
		expect(handleAfterOpen).toHaveBeenCalledTimes(1);
	});

	test("dismissible, onClose, className, attributes, closeAriaLabel", async () => {
		const handleClose = vi.fn();
		await render(
			<Popover onClose={handleClose} defaultActive>
				<Popover.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</Popover.Trigger>
				<Popover.Content>
					<Popover.Dismissible
						closeAriaLabel="Close"
						attributes={{ "data-testid": "test-id" }}
						className="test-classname"
					>
						Content
					</Popover.Dismissible>
				</Popover.Content>
			</Popover>
		);
		const dismissible = page.getByTestId("test-id");
		const closeButton = dismissible.getByRole("button");

		await expect.element(dismissible).toHaveClass("test-classname");
		await expect.element(closeButton).toHaveAccessibleName("Close");

		await userEvent.click(closeButton);

		await vi.waitFor(() => {
			expect(handleClose).toHaveBeenCalledTimes(1);
			expect(handleClose).toHaveBeenCalledWith({ reason: "close-button" });
		});
		await expect.element(dismissible).not.toBeInTheDocument();
	});

	test("autoFocus: false focuses the content", async () => {
		await render(
			// oxlint-disable-next-line jsx_a11y/no-autofocus
			<Popover autoFocus={false}>
				<Popover.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</Popover.Trigger>
				<Popover.Content>
					<View gap={2} align="start">
						Popover content
						<Button onClick={() => {}}>Action 1</Button>
					</View>
				</Popover.Content>
			</Popover>
		);

		await userEvent.click(page.getByRole("button", { name: "Open" }));

		await expect.element(page.getByRole("dialog")).toHaveFocus();
	});

	test("className, attributes", async () => {
		await render(
			<Popover active>
				<Popover.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</Popover.Trigger>
				<Popover.Content className="test-classname" attributes={{ "data-testid": "test-id" }}>
					Content
				</Popover.Content>
			</Popover>
		);

		await expect.element(page.getByTestId("test-id")).toHaveClass("test-classname");
	});

	test("nested popovers close one by one", async () => {
		const handleClose = vi.fn();
		const handleNestedClose = vi.fn();
		await render(
			<Popover position="bottom" onClose={handleClose}>
				<Popover.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</Popover.Trigger>
				<Popover.Content>
					<View gap={2} align="start">
						Popover content
						<Popover onClose={handleNestedClose}>
							<Popover.Trigger>
								{(attributes) => <Button attributes={attributes}>Open nested</Button>}
							</Popover.Trigger>
							<Popover.Content>Hello</Popover.Content>
						</Popover>
					</View>
				</Popover.Content>
			</Popover>
		);
		const content = page.getByText("Popover content");
		const nestedContent = page.getByText("Hello");

		await userEvent.click(page.getByRole("button", { name: "Open", exact: true }));
		await expect.element(content).toBeVisible();

		await userEvent.click(page.getByRole("button", { name: "Open nested" }));
		await expect.element(nestedContent).toBeVisible();

		// Clicks inside the nested popover are not outside clicks for the parent popover
		await userEvent.click(nestedContent);
		expect(handleClose).not.toHaveBeenCalled();
		expect(handleNestedClose).not.toHaveBeenCalled();
		await expect.element(content).toBeInTheDocument();
		await expect.element(nestedContent).toBeInTheDocument();

		// Outside clicks close the popovers one by one, starting from the latest opened one
		await userEvent.click(document.body);
		await expect.element(nestedContent).not.toBeInTheDocument();
		await expect.element(content).toBeInTheDocument();
		expect(handleNestedClose).toHaveBeenCalledWith({ reason: "outside-click" });
		expect(handleClose).not.toHaveBeenCalled();

		await userEvent.click(document.body);
		await expect.element(content).not.toBeInTheDocument();
		expect(handleClose).toHaveBeenCalledWith({ reason: "outside-click" });
	});
});
