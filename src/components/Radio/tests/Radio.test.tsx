import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Radio from "components/Radio";

const fixtures = {
	name: "animal",
	value: "dog",
	content: "Content",
	className: "test-className",
	id: "test-id",
	inputId: "test-input-id",
};

describe("Components/Radio", () => {
	test("renders radio", () => {
		render(
			<Radio name={fixtures.name} value={fixtures.value}>
				{fixtures.content}
			</Radio>
		);

		const input = screen.getByRole("radio");

		expect(screen.getByText(fixtures.content)).toBeInTheDocument();
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("value", fixtures.value);
		expect(input).not.toBeChecked();
	});

	test("works as controlled", async () => {
		const handleChange = jest.fn();
		render(
			<Radio name={fixtures.name} value={fixtures.value} onChange={handleChange} checked={false}>
				{fixtures.content}
			</Radio>
		);

		const input = screen.getByRole("radio") as HTMLInputElement;

		expect(input.checked).toBeFalsy();

		await userEvent.click(input);
		expect(handleChange).toBeCalledTimes(1);
		expect(input.checked).toBeFalsy();
	});

	test("works as uncontrolled", async () => {
		const handleChange = jest.fn();
		render(
			<Radio name={fixtures.name} value={fixtures.value} onChange={handleChange}>
				{fixtures.content}
			</Radio>
		);

		const input = screen.getByRole("radio") as HTMLInputElement;

		expect(input.checked).toBeFalsy();

		await userEvent.click(input);
		expect(handleChange).toBeCalledTimes(1);
		expect(input.checked).toBeTruthy();
	});

	test("supports disabled state", () => {
		render(
			<Radio name={fixtures.name} value={fixtures.value} disabled>
				{fixtures.content}
			</Radio>
		);

		const input = screen.getByRole("radio") as HTMLInputElement;

		expect(input).toBeDisabled();
	});

	test("works with className and attributes", () => {
		const { container } = render(
			<Radio
				name={fixtures.name}
				value={fixtures.value}
				className={fixtures.className}
				attributes={{ id: fixtures.id }}
				inputAttributes={{ id: fixtures.inputId }}
			>
				{fixtures.content}
			</Radio>
		);

		const input = screen.getByRole("radio") as HTMLInputElement;

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
		expect(input).toHaveAttribute("id", fixtures.inputId);
	});
});
