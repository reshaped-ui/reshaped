import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Switch from "components/Switch";

const fixtures = {
	label: "Label",
	name: "animal",
	className: "test-className",
	id: "test-id",
	inputId: "test-input-id",
};

describe("Components/Switch", () => {
	test("renders checkbox", () => {
		render(<Switch name={fixtures.name}>{fixtures.label}</Switch>);

		const input = screen.getByRole("checkbox");
		const text = screen.getByText(fixtures.label);

		expect(input).toBeInTheDocument();
		expect(text).toBeInTheDocument();

		expect(input).not.toBeChecked();
	});

	test("works as controlled", async () => {
		const handleChange = jest.fn();
		render(<Switch name={fixtures.name} onChange={handleChange} checked />);

		const input = screen.getByRole("checkbox") as HTMLInputElement;

		expect(input.checked).toBeTruthy();
		await userEvent.click(input);
		expect(handleChange).toBeCalledTimes(1);
		expect(input.checked).toBeTruthy();
	});

	test("works as uncontrolled", async () => {
		const handleChange = jest.fn();
		render(<Switch name={fixtures.name} onChange={handleChange} defaultChecked />);

		const input = screen.getByRole("checkbox") as HTMLInputElement;

		expect(input.checked).toBeTruthy();
		await userEvent.click(input);
		expect(handleChange).toBeCalledTimes(1);
		expect(input.checked).toBeFalsy();
	});

	test("supports disabled state", () => {
		render(<Switch name={fixtures.name} disabled />);

		const input = screen.getByRole("checkbox") as HTMLInputElement;

		expect(input).toBeDisabled();
	});

	test("works with className and attributes", () => {
		const { container } = render(
			<Switch
				name={fixtures.name}
				className={fixtures.className}
				attributes={{ "data-id": fixtures.id }}
				inputAttributes={{ id: fixtures.inputId }}
			/>
		);

		const input = screen.getByRole("checkbox") as HTMLInputElement;

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("data-id", fixtures.id);
		expect(input).toHaveAttribute("id", fixtures.inputId);
	});
});
