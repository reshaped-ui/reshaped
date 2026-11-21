import React from "react";
import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Button from "@/components/Button";
import Flyout, { FlyoutInstance, FlyoutProps } from "@/components/Flyout";
import TextField from "@/components/TextField";
import View from "@/components/View";
import { render } from "@/tests/render";

const Content = (props: { children?: React.ReactNode }) => (
	<div style={{ height: 150, width: 160, padding: 16, boxSizing: "border-box" }}>
		{props.children || "Content"}
	</div>
);

const Demo = (props: FlyoutProps & { children?: React.ReactNode }) => {
	const { children, ...rest } = props;

	return (
		<Flyout position="bottom-start" {...rest}>
			<Flyout.Trigger>
				{(attributes) => <Button attributes={attributes}>Trigger</Button>}
			</Flyout.Trigger>
			<Flyout.Content>
				<Content>{children}</Content>
			</Flyout.Content>
		</Flyout>
	);
};

/**
 * Transitions are disabled for the first frames after the color mode gets applied
 */
const waitForTransitions = () =>
	expect.poll(() => document.documentElement.hasAttribute("data-rs-no-transition")).toBe(false);

describe("Utility components/Flyout", () => {
	test("defaultActive, uncontrolled", async () => {
		const handleOpen = vi.fn();
		const handleClose = vi.fn();
		await render(<Demo onOpen={handleOpen} onClose={handleClose} defaultActive />);
		const trigger = page.getByRole("button", { name: "Trigger" });
		const content = page.getByText("Content");

		await expect.element(content).toBeVisible();
		await userEvent.click(document.body);

		await vi.waitFor(() => {
			expect(handleClose).toHaveBeenCalledTimes(1);
			expect(handleClose).toHaveBeenCalledWith({ reason: "outside-click" });
		});
		await expect.element(content).not.toBeInTheDocument();

		await userEvent.click(trigger);

		await vi.waitFor(() => {
			expect(handleOpen).toHaveBeenCalledTimes(1);
			expect(handleOpen).toHaveBeenCalledWith();
		});
		await expect.element(content).toBeInTheDocument();
	});

	test("active, controlled", async () => {
		const handleOpen = vi.fn();
		const handleClose = vi.fn();
		await render(<Demo onOpen={handleOpen} onClose={handleClose} active />);
		const content = page.getByText("Content");

		await expect.element(content).toBeVisible();
		await userEvent.click(document.body);

		await vi.waitFor(() => {
			expect(handleClose).toHaveBeenCalledTimes(1);
			expect(handleClose).toHaveBeenCalledWith({ reason: "outside-click" });
		});
		await expect.element(content).toBeInTheDocument();
	});

	test("active: false, controlled", async () => {
		const handleOpen = vi.fn();
		const handleClose = vi.fn();
		await render(<Demo onOpen={handleOpen} onClose={handleClose} active={false} />);

		await userEvent.click(page.getByRole("button", { name: "Trigger" }));

		await vi.waitFor(() => {
			expect(handleOpen).toHaveBeenCalledTimes(1);
			expect(handleOpen).toHaveBeenCalledWith();
		});
		await expect.element(page.getByText("Content")).not.toBeInTheDocument();
	});

	test("disableCloseOnOutsideClick", async () => {
		const handleClose = vi.fn();
		await render(<Demo disableCloseOnOutsideClick onClose={handleClose} />);

		await userEvent.click(page.getByRole("button", { name: "Trigger" }));
		await expect.element(page.getByText("Content")).toBeVisible();

		await userEvent.click(document.body);

		expect(handleClose).not.toHaveBeenCalled();
		await expect.element(page.getByText("Content")).toBeVisible();
	});

	test("disabled", async () => {
		const handleOpen = vi.fn();
		await render(<Demo disabled onOpen={handleOpen} />);

		await userEvent.click(page.getByRole("button", { name: "Trigger" }));

		// onOpen still reports the open request, disabled only prevents the content from rendering
		await vi.waitFor(() => expect(handleOpen).toHaveBeenCalledTimes(1));
		await expect.element(page.getByText("Content")).not.toBeInTheDocument();
	});

	test("initialFocusRef", async () => {
		const Component = () => {
			const initialFocusRef = React.useRef<HTMLInputElement>(null);

			return (
				<Demo initialFocusRef={initialFocusRef}>
					<View gap={4}>
						<Button onClick={() => {}}>Action 1</Button>
						<TextField name="foo" inputAttributes={{ ref: initialFocusRef }} />
					</View>
				</Demo>
			);
		};
		await render(<Component />);

		await userEvent.click(page.getByRole("button", { name: "Trigger" }));

		await expect.element(page.getByRole("textbox")).toHaveFocus();
	});

	test("instanceRef", async () => {
		const handleOpen = vi.fn();
		const handleClose = vi.fn();
		const Component = () => {
			const flyoutRef = React.useRef<FlyoutInstance>(null);

			return (
				<View direction="row" gap={4}>
					<Demo
						instanceRef={flyoutRef}
						disableCloseOnOutsideClick
						onOpen={handleOpen}
						onClose={handleClose}
					/>
					<Button onClick={() => flyoutRef.current?.open()}>Open</Button>
					<Button onClick={() => flyoutRef.current?.close()}>Close</Button>
				</View>
			);
		};
		await render(<Component />);

		await userEvent.click(page.getByRole("button", { name: "Open" }));

		await vi.waitFor(() => {
			expect(handleOpen).toHaveBeenCalledTimes(1);
			expect(handleOpen).toHaveBeenCalledWith();
		});
		await expect.element(page.getByText("Content")).toBeVisible();

		await userEvent.click(page.getByRole("button", { name: "Close" }));

		await vi.waitFor(() => {
			expect(handleClose).toHaveBeenCalledTimes(1);
			expect(handleClose).toHaveBeenCalledWith({});
		});
		await expect.element(page.getByText("Content")).not.toBeInTheDocument();
	});

	test("content: className, attributes", async () => {
		await render(
			<Flyout position="bottom" defaultActive>
				<Flyout.Trigger>
					{(attributes) => <Button attributes={attributes}>Trigger</Button>}
				</Flyout.Trigger>
				<Flyout.Content attributes={{ "data-testid": "test-id" }} className="test-classname">
					<Content />
				</Flyout.Content>
			</Flyout>
		);

		await expect.element(page.getByTestId("test-id")).toHaveClass("test-classname");
	});

	test("test: content doesn't change while closing", async () => {
		const handleAfterClose = vi.fn();
		const Component = () => {
			const [active, setActive] = React.useState(false);
			const [value, setValue] = React.useState("First");

			return (
				<Flyout
					active={active}
					onOpen={() => setActive(true)}
					onClose={() => setActive(false)}
					onAfterClose={handleAfterClose}
				>
					<Flyout.Trigger>
						{(attributes) => <Button attributes={attributes}>{value}</Button>}
					</Flyout.Trigger>
					<Flyout.Content>
						<Content>
							<div data-testid="selected-value">Selected: {value}</div>
							<Button
								onClick={() => {
									setValue("Second");
									setActive(false);
								}}
							>
								Select second
							</Button>
						</Content>
					</Flyout.Content>
				</Flyout>
			);
		};
		await render(<Component />);
		await waitForTransitions();

		await userEvent.click(page.getByRole("button", { name: "First" }));
		await expect.element(page.getByTestId("selected-value")).toBeVisible();

		// Record the content state after every DOM update since the hide animation might end before click resolves
		const snapshots: { text?: string | null; visible: boolean }[] = [];
		const observer = new MutationObserver(() => {
			const el = document.querySelector<HTMLElement>("[data-testid=selected-value]");
			if (!el) return;
			snapshots.push({ text: el.textContent, visible: el.checkVisibility() });
		});
		observer.observe(document.body, {
			subtree: true,
			childList: true,
			attributes: true,
			characterData: true,
		});

		await userEvent.click(page.getByRole("button", { name: "Select second" }));

		await expect.element(page.getByTestId("selected-value")).not.toBeInTheDocument();
		observer.disconnect();

		// Trigger is updated right away while the content keeps its last state during the hide animation
		await expect.element(page.getByRole("button").first()).toHaveTextContent("Second");
		expect(snapshots.length).toBeGreaterThan(0);
		snapshots.forEach((snapshot) => {
			expect(snapshot).toEqual({ text: "Selected: First", visible: true });
		});
		expect(handleAfterClose).toHaveBeenCalledTimes(1);
	});

	test("test: close right after opening", async () => {
		const handleAfterClose = vi.fn();
		const Component = () => {
			const [active, setActive] = React.useState(false);
			const [closeOnOpen, setCloseOnOpen] = React.useState(false);

			// Closing in the same frame, before the open transition starts
			React.useEffect(() => {
				if (active && closeOnOpen) setActive(false);
			}, [active, closeOnOpen]);

			return (
				<Flyout active={active} onAfterClose={handleAfterClose}>
					<Flyout.Trigger>
						{(attributes) => (
							<Button
								attributes={attributes}
								onClick={() => {
									setCloseOnOpen(true);
									setActive(true);
								}}
							>
								Trigger
							</Button>
						)}
					</Flyout.Trigger>
					<Flyout.Content>
						<Content />
					</Flyout.Content>
				</Flyout>
			);
		};
		await render(<Component />);
		await waitForTransitions();

		await userEvent.click(page.getByRole("button", { name: "Trigger" }));

		await expect.element(page.getByText("Content")).not.toBeInTheDocument();
		await vi.waitFor(() => {
			expect(handleAfterClose).toHaveBeenCalledTimes(1);
		});
	});

	test("test: focus returns to the trigger with transitions disabled", async () => {
		await render(
			<Flyout>
				<Flyout.Trigger>
					{(attributes) => <Button attributes={attributes}>Trigger</Button>}
				</Flyout.Trigger>
				<Flyout.Content>
					<Content>
						<Button onClick={() => {}}>Inside</Button>
					</Content>
				</Flyout.Content>
			</Flyout>
		);
		const trigger = page.getByRole("button", { name: "Trigger" });

		// Wait for the provider to enable transitions after mount before disabling them again
		await waitForTransitions();

		// Same as prefers-reduced-motion, content is removed without the hide animation
		document.documentElement.setAttribute("data-rs-no-transition", "true");

		try {
			trigger.element().focus();
			await userEvent.keyboard("{Enter}");

			await vi.waitFor(() => {
				expect(page.getByRole("dialog").element()).toContainElement(
					document.activeElement as HTMLElement
				);
			});

			await userEvent.keyboard("{Escape}");

			await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
			await expect.element(trigger).toHaveFocus();
		} finally {
			document.documentElement.removeAttribute("data-rs-no-transition");
		}
	});

	test("test: without focusable content", async () => {
		await render(<Demo />);
		const trigger = page.getByRole("button", { name: "Trigger" });

		await userEvent.click(trigger);

		await expect.element(page.getByText("Content")).toBeVisible();
		await expect.element(trigger).toHaveFocus();
	});
});
