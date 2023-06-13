import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextField from "components/TextField";

const fixtures = {
	name: "animal",
	value: "Dog",
	start: "Start",
	end: "End",
	placeholder: "Type an animal",
	className: "test-className",
	id: "test-id",
	inputId: "test-input-id",
};

describe("Components/TextArea", () => {
	test("renders textfield", () => {
		render(<TextField name={fixtures.name} />);

		const input = screen.getByRole("textbox");

		expect(input).toBeInTheDocument();
		expect(input).toHaveValue("");
	});

	test("supports placeholder", () => {
		render(
			<TextField
				name={fixtures.name}
				placeholder={fixtures.placeholder}
				startSlot={fixtures.start}
				endSlot={fixtures.end}
			/>
		);

		const input = screen.getByRole("textbox");
		expect(input).toHaveAttribute("placeholder", fixtures.placeholder);
		expect(screen.getByText(fixtures.start)).toBeInTheDocument();
		expect(screen.getByText(fixtures.end)).toBeInTheDocument();
	});

	test("supports id", () => {
		render(<TextField name={fixtures.name} id={fixtures.inputId} />);

		const input = screen.getByRole("textbox");
		expect(input).toHaveAttribute("id", fixtures.inputId);
	});

	test("supports disabled state", () => {
		render(<TextField name={fixtures.name} disabled />);

		const input = screen.getByRole("textbox");
		expect(input).toBeDisabled();
	});

	test("works as controlled", async () => {
		const handleChange = jest.fn();
		render(<TextField name={fixtures.name} onChange={handleChange} value={fixtures.value} />);

		const input = screen.getByRole("textbox");

		await userEvent.click(input);
		await userEvent.keyboard("g");

		expect(input).toHaveValue(fixtures.value);
		expect(handleChange).toBeCalledTimes(1);
		expect(handleChange).toBeCalledWith(
			expect.objectContaining({
				value: `${fixtures.value}g`,
				name: fixtures.name,
			})
		);
	});

	test("works as uncontrolled", async () => {
		const handleChange = jest.fn();
		render(
			<TextField name={fixtures.name} onChange={handleChange} defaultValue={fixtures.value} />
		);

		const input = screen.getByRole("textbox");

		await userEvent.click(input);
		await userEvent.keyboard("g");

		expect(input).toHaveValue(`${fixtures.value}g`);
		expect(handleChange).toBeCalledTimes(1);
		expect(handleChange).toBeCalledWith(
			expect.objectContaining({
				value: `${fixtures.value}g`,
				name: fixtures.name,
			})
		);
	});

	test("applies className and attributes", () => {
		const { container } = render(
			<TextField
				name={fixtures.name}
				className={fixtures.className}
				attributes={{ "data-id": fixtures.id }}
				inputAttributes={{ id: fixtures.inputId }}
			/>
		);

		const input = screen.getByRole("textbox");

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("data-id", fixtures.id);
		expect(input).toHaveAttribute("id", fixtures.inputId);
	});
});
