import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Badge from "components/Badge";

const fixtures = {
	content: "Content",
	href: "reshaped.so",
	dismissLabel: "Dismiss",
	className: "test-className",
	id: "test-id",
};

describe("Components/Badge", () => {
	test("renders children", () => {
		render(<Badge>{fixtures.content}</Badge>);

		const el = screen.getByText(fixtures.content);
		expect(el).toBeInTheDocument();
	});

	test("works as a button", async () => {
		const handleClick = jest.fn();

		render(<Badge onClick={handleClick}>{fixtures.content}</Badge>);

		const el = screen.getByRole("button");

		await userEvent.click(el);

		expect(el).toBeInTheDocument();
		expect(handleClick).toBeCalledTimes(1);
	});

	test("works as a link", () => {
		render(<Badge href={fixtures.href}>{fixtures.content}</Badge>);

		const link = screen.getByRole("link");

		expect(link).toBeInTheDocument();
		expect(link.getAttribute("href")).toBe(fixtures.href);
	});

	test("supports dismissible behavior", async () => {
		const handleDismiss = jest.fn();
		render(
			<Badge onDismiss={handleDismiss} dismissAriaLabel={fixtures.dismissLabel}>
				{fixtures.content}
			</Badge>
		);

		const dismissButton = screen.getByRole("button");

		await userEvent.click(dismissButton);

		expect(dismissButton).toBeInTheDocument();
		expect(dismissButton).toHaveAccessibleName(fixtures.dismissLabel);
		expect(handleDismiss).toBeCalledTimes(1);
	});

	test("applies className and attributes", () => {
		const { container } = render(
			<Badge className={fixtures.className} attributes={{ id: fixtures.id }}>
				{fixtures.content}
			</Badge>
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
