import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dismissible from "components/Dismissible";

const fixtures = {
	content: "Content",
	closeLabel: "Close",
	className: "test-className",
	id: "test-id",
};

describe("Utilities/Dismissible", () => {
	test("renders children and aria-label", () => {
		render(
			<Dismissible closeAriaLabel={fixtures.closeLabel} onClose={() => {}}>
				{fixtures.content}
			</Dismissible>
		);

		const elButton = screen.getByRole("button");
		expect(screen.getByText(fixtures.content)).toBeInTheDocument();
		expect(elButton).toBeInTheDocument();
		expect(elButton).toHaveAttribute("aria-label", fixtures.closeLabel);
	});

	test("hides the button", () => {
		render(<Dismissible hideCloseButton>{fixtures.content}</Dismissible>);

		const elButton = screen.queryByRole("button");
		expect(elButton).not.toBeInTheDocument();
	});

	test("triggers onChange", async () => {
		const handleClose = jest.fn();
		render(
			<Dismissible closeAriaLabel={fixtures.closeLabel} onClose={handleClose}>
				{fixtures.content}
			</Dismissible>
		);

		const elButton = screen.getByRole("button");
		await userEvent.click(elButton);
		expect(handleClose).toBeCalledTimes(1);
	});

	test("works with className and attributes", () => {
		const { container } = render(
			<Dismissible
				closeAriaLabel={fixtures.closeLabel}
				className={fixtures.className}
				attributes={{ id: fixtures.id }}
			>
				{fixtures.content}
			</Dismissible>
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
