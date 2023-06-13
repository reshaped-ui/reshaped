import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Flyout from "components/_private/Flyout/index";
import Reshaped from "components/Reshaped";

const fixtures = {
	triggerText: "Button",
	content: "Content",
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

		await userEvent.click(button);
		waitFor(() => {
			expect(screen.queryByText(fixtures.content)).toBeInTheDocument();
			expect(button).toHaveAttribute("aria-controls");
			expect(handleOpen).toBeCalled();
		});

		await userEvent.click(button);
		waitFor(() => {
			expect(screen.queryByText(fixtures.content)).not.toBeInTheDocument();
			expect(button).not.toHaveAttribute("aria-controls");
			expect(handleClose).toBeCalled();
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

		await userEvent.hover(button);
		waitFor(() => {
			expect(screen.queryByText(fixtures.content)).toBeInTheDocument();
			expect(handleOpen).toBeCalled();
		});

		await userEvent.unhover(button);
		waitFor(() => {
			expect(screen.queryByText(fixtures.content)).not.toBeInTheDocument();
			expect(handleClose).toBeCalled();
		});
	});
});
