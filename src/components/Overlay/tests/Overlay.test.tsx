import React from "react";
import { createRoot } from "react-dom/client";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Overlay, { type OverlayProps } from "components/Overlay";
import Reshaped from "components/Reshaped";

const fixtures = {
	content: "Content",
	testId: "test-id",
	className: "test-className",
};

const triggerTransition = (el: HTMLElement) => {
	const transitionEndEvent = new Event("transitionend", {
		bubbles: true,
	});
	// @ts-ignore: propertyName is readonly in types
	transitionEndEvent.propertyName = "opacity";
	fireEvent(el, transitionEndEvent);
};

describe("Utilities/Overlay", () => {
	test("renders children", () => {
		render(
			<Reshaped>
				<Overlay active>{fixtures.content}</Overlay>
			</Reshaped>
		);

		const el = screen.getByText(fixtures.content);
		expect(el).toBeInTheDocument();
	});

	test("renders children as a function", () => {
		render(
			<Reshaped>
				<Overlay active>{({ active }) => (active ? fixtures.content : "")}</Overlay>
			</Reshaped>
		);

		const el = screen.getByText(fixtures.content);
		expect(el).toBeInTheDocument();
	});

	test("triggers onOpen, onClose, onAfterOpen, onAfterClose", async () => {
		const handleCloseMock = jest.fn();
		const handleOpenMock = jest.fn();
		const handleAfterCloseMock = jest.fn();
		const handleAfterOpenMock = jest.fn();
		const Component = () => {
			const [active, setActive] = React.useState(true);

			const handleClick = () => {
				setActive(true);
			};

			const handleClose: OverlayProps["onClose"] = (args) => {
				setActive(false);
				handleCloseMock(args);
			};

			return (
				<Reshaped>
					<button type="button" data-testid={fixtures.testId} onClick={handleClick}>
						Open
					</button>
					<Overlay
						active={active}
						onClose={handleClose}
						onOpen={handleOpenMock}
						onAfterClose={handleAfterCloseMock}
						onAfterOpen={handleAfterOpenMock}
					>
						{fixtures.content}
					</Overlay>
				</Reshaped>
			);
		};

		render(<Component />);

		const elButton = screen.getByTestId(fixtures.testId);

		await userEvent.click(screen.getByText(fixtures.content));

		expect(handleCloseMock).toHaveBeenCalledTimes(1);
		expect(handleCloseMock).toHaveBeenCalledWith({ reason: "overlay-click" });

		triggerTransition(screen.getAllByRole("button")[1]);

		await waitFor(() => {
			expect(screen.queryByText(fixtures.content)).not.toBeInTheDocument();
		});

		expect(handleAfterCloseMock).toHaveBeenCalledTimes(1);

		await userEvent.click(elButton);

		expect(screen.getByText(fixtures.content)).toBeInTheDocument();
		expect(handleOpenMock).toHaveBeenCalledTimes(1);

		// TODO: Move to E2E testing setup since calling it manually doesn't match regular state + transition order
		// triggerTransition(screen.getAllByRole("button")[1]);
		// expect(handleAfterOpenMock).toHaveBeenCalledTimes(1);
	});

	test("ignores close with disableCloseOnClick", async () => {
		const handleClose = jest.fn();

		render(
			<Reshaped>
				<Overlay active onClose={handleClose} disableCloseOnClick>
					{fixtures.content}
				</Overlay>
			</Reshaped>
		);

		const elOverlay = screen.getByRole("button");

		await userEvent.click(elOverlay);

		expect(handleClose).toHaveBeenCalledTimes(0);
	});

	test("works with className and attributes", () => {
		render(
			<Reshaped>
				<Overlay
					active
					className={fixtures.className}
					attributes={{ "data-testid": fixtures.testId }}
				/>
			</Reshaped>
		);

		const el = screen.getByTestId(fixtures.testId);

		expect(el).toHaveClass(fixtures.className);
	});

	test("renders inside container", () => {
		const Component = () => {
			const containerRef = React.useRef<HTMLDivElement>(null);

			return (
				<Reshaped>
					<div ref={containerRef} data-testid={fixtures.testId} />
					<Overlay active containerRef={containerRef}>
						{fixtures.content}
					</Overlay>
				</Reshaped>
			);
		};

		render(<Component />);

		const elContainer = screen.getByTestId(fixtures.testId);
		const elOverlay = screen.getByText(fixtures.content);

		expect(elContainer).toContainElement(elOverlay);
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
						<Overlay active>
							<div id={fixtures.testId}>{fixtures.content}</div>
						</Overlay>
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
