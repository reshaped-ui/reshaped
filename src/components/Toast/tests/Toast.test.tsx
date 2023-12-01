import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Reshaped from "components/Reshaped";
import Button from "components/Button";
import { useToast } from "components/Toast";
import IconZap from "icons/Zap";

const fixtures = {
	title: "test-title",
	text: "test-text",
	buttonText: "test-button",
	children: "test-children",
	startSlot: "test-start",
	className: "test-className",
	id: "test-id",
};

describe("Components/Toast", () => {
	test("opens toast", async () => {
		const Component = () => {
			const toast = useToast();

			return (
				<Button
					onClick={() => {
						const id = toast.show({
							icon: IconZap,
							title: fixtures.title,
							text: fixtures.text,
							children: fixtures.children,
							startSlot: fixtures.startSlot,
							actionsSlot: (
								<Button attributes={{ "data-testid": fixtures.id }} onClick={() => toast.hide(id)}>
									{fixtures.buttonText}
								</Button>
							),
						});
					}}
				>
					Show toast
				</Button>
			);
		};

		render(
			<Reshaped theme="reshaped">
				<Component />
			</Reshaped>
		);

		const elButton = screen.getByRole("button");

		await userEvent.click(elButton);

		const elTitle = screen.getByText(fixtures.title);
		const elText = screen.getByText(fixtures.text);
		const elChildren = screen.getByText(fixtures.children);
		const elStart = screen.queryByText(fixtures.startSlot);
		const elAction = screen.getByTestId(fixtures.id);

		expect(elTitle).toBeInTheDocument();
		expect(elText).toBeInTheDocument();
		expect(elChildren).toBeInTheDocument();
		expect(elStart).not.toBeInTheDocument();
		expect(elAction).toBeInTheDocument();

		await userEvent.click(elAction);

		// We're creating a custom event here to pass propertyName manually
		const transitionEndEvent = new Event("transitionend", {
			bubbles: true,
		});
		// @ts-ignore: propertyName is readonly in types
		transitionEndEvent.propertyName = "height";
		fireEvent(elTitle, transitionEndEvent);

		// await waitFor(() => {
		expect(elTitle).not.toBeInTheDocument();
		// });
	});

	test("displays slots", async () => {
		const Component = () => {
			const toast = useToast();

			return (
				<Button
					onClick={() => {
						toast.show({
							children: fixtures.children,
							startSlot: fixtures.startSlot,
						});
					}}
				>
					Show toast
				</Button>
			);
		};

		render(
			<Reshaped theme="reshaped">
				<Component />
			</Reshaped>
		);

		const elButton = screen.getByRole("button");

		await userEvent.click(elButton);

		const elStart = screen.getByText(fixtures.startSlot);

		expect(elStart).toBeInTheDocument();
	});

	test("works with className and attributes", async () => {
		const Component = () => {
			const toast = useToast();

			return (
				<Button
					onClick={() => {
						const id = toast.show({
							icon: IconZap,
							title: fixtures.title,
							text: fixtures.text,
							children: fixtures.children,
							startSlot: fixtures.startSlot,
							actionsSlot: <Button onClick={() => toast.hide(id)}>{fixtures.buttonText}</Button>,
							attributes: { "data-testid": fixtures.id },
							className: fixtures.className,
						});
					}}
				>
					Show toast
				</Button>
			);
		};

		render(
			<Reshaped theme="reshaped">
				<Component />
			</Reshaped>
		);

		const elButton = screen.getByRole("button");

		await userEvent.click(elButton);

		const elToast = screen.getByTestId(fixtures.id);

		expect(elToast).toBeInTheDocument();
		expect(elToast).toHaveClass(fixtures.className);
	});
});
