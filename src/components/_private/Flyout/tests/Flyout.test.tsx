import React from "react";
import { createRoot } from "react-dom/client";
import { render, screen, waitFor, act } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Flyout from "components/_private/Flyout/index";
import Reshaped from "components/Reshaped";

const fixtures = {
	triggerText: "Button",
	content: "Content",
	testId: "test-id",
};

describe("Flyout", () => {
	test("works with click triggerType", async () => {
		const handleOpen = jest.fn();
		const handleClose = jest.fn();
		render(
			<Reshaped>
				<Flyout triggerType="click" onOpen={handleOpen} onClose={handleClose}>
					<Flyout.Trigger>
						{(attributes) => (
							<button type="button" {...attributes}>
								{fixtures.triggerText}
							</button>
						)}
					</Flyout.Trigger>
					<Flyout.Content>{fixtures.content}</Flyout.Content>
				</Flyout>
			</Reshaped>
		);
		const button = screen.getByRole("button");

		expect(button).toBeInTheDocument();
		expect(button).not.toHaveAttribute("aria-controls");
		expect(screen.queryByText(fixtures.content)).not.toBeInTheDocument();

		await act(() => userEvent.click(button));

		waitFor(() => {
			expect(screen.queryByText(fixtures.content)).toBeInTheDocument();
			expect(button).toHaveAttribute("aria-controls");
			expect(handleOpen).toBeCalled();
		});

		await act(() => userEvent.click(button));

		waitFor(() => {
			expect(screen.queryByText(fixtures.content)).not.toBeInTheDocument();
			expect(button).not.toHaveAttribute("aria-controls");
			expect(handleClose).toHaveBeenCalled();
		});
	});

	test("works with hover triggerType", async () => {
		const handleOpen = jest.fn();
		const handleClose = jest.fn();
		render(
			<Reshaped>
				<Flyout triggerType="hover" onOpen={handleOpen} onClose={handleClose}>
					<Flyout.Trigger>
						{(attributes) => (
							<button type="button" {...attributes}>
								{fixtures.triggerText}
							</button>
						)}
					</Flyout.Trigger>
					<Flyout.Content>{fixtures.content}</Flyout.Content>
				</Flyout>
			</Reshaped>
		);

		const button = screen.getByRole("button");

		expect(screen.queryByText(fixtures.content)).not.toBeInTheDocument();

		await act(() => userEvent.hover(button));

		waitFor(() => {
			expect(screen.queryByText(fixtures.content)).toBeInTheDocument();
			expect(handleOpen).toHaveBeenCalled();
		});

		await act(() => userEvent.unhover(button));

		waitFor(() => {
			expect(screen.queryByText(fixtures.content)).not.toBeInTheDocument();
			expect(handleClose).toHaveBeenCalled();
		});
	});

	test("works with disabled flag", async () => {
		const handleOpen = jest.fn();

		render(
			<Reshaped>
				<Flyout triggerType="hover" onOpen={handleOpen} disabled>
					<Flyout.Trigger>
						{(attributes) => (
							<button type="button" {...attributes}>
								{fixtures.triggerText}
							</button>
						)}
					</Flyout.Trigger>
					<Flyout.Content>{fixtures.content}</Flyout.Content>
				</Flyout>
			</Reshaped>
		);

		const button = screen.getByRole("button");

		expect(screen.queryByText(fixtures.content)).not.toBeInTheDocument();

		await act(() => userEvent.hover(button));

		expect(handleOpen).toHaveBeenCalledTimes(0);
	});

	test("works with custom container", () => {
		const PortalTargetDemo = () => {
			const portalRef = React.useRef<HTMLDivElement | null>(null);

			return (
				<div ref={portalRef} data-testid={fixtures.testId}>
					<Flyout containerRef={portalRef} active>
						<Flyout.Trigger>
							{(attributes) => <button {...attributes}>{fixtures.triggerText}</button>}
						</Flyout.Trigger>
						<Flyout.Content>{fixtures.content}</Flyout.Content>
					</Flyout>
				</div>
			);
		};

		render(
			<Reshaped>
				<PortalTargetDemo />
			</Reshaped>
		);

		const containerEl = screen.getByTestId(fixtures.testId);
		const contentEl = screen.getByText(fixtures.content);

		expect(containerEl).toContainElement(contentEl);
	});

	test("renders inside shadow root", () => {
		class CustomElement extends window.HTMLElement {
			constructor() {
				super();
				this.attachShadow({ mode: "open" });

				if (!this.shadowRoot) return;

				const root = createRoot(this.shadowRoot);
				root.render(
					<Reshaped>
						<Flyout active>
							<Flyout.Trigger>
								{(attributes) => <button {...attributes}>{fixtures.triggerText}</button>}
							</Flyout.Trigger>
							<Flyout.Content>
								<div id={fixtures.testId} />
							</Flyout.Content>
						</Flyout>
					</Reshaped>
				);
			}
		}

		window.customElements.define("custom-element", CustomElement);

		// @ts-ignore
		render(<custom-element />);

		expect(
			document.querySelector("custom-element")?.shadowRoot?.querySelector(`#${fixtures.testId}`)
		).toBeTruthy();
		expect(document.body.querySelector(`#${fixtures.testId}`)).toBe(null);
	});
});
