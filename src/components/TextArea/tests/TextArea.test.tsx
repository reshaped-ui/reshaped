import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextArea from "components/TextArea";

const fixtures = {
	name: "animal",
	value: "Dog",
	placeholder: "Type an animal",
	className: "test-className",
	id: "test-id",
	inputId: "test-input-id",
};

describe("Components/TextArea", () => {
	test("renders textarea", () => {
		render(<TextArea name={fixtures.name} />);

		const input = screen.getByRole("textbox");

		expect(input).toBeInTheDocument();
		expect(input).toHaveValue("");
	});

	test("supports placeholder", () => {
		render(<TextArea name={fixtures.name} placeholder={fixtures.placeholder} />);

		const input = screen.getByRole("textbox");
		expect(input).toHaveAttribute("placeholder", fixtures.placeholder);
	});

	test("supports id", () => {
		render(<TextArea name={fixtures.name} id={fixtures.inputId} />);

		const input = screen.getByRole("textbox");
		expect(input).toHaveAttribute("id", fixtures.inputId);
	});

	test("supports disabled state", () => {
		render(<TextArea name={fixtures.name} disabled />);

		const input = screen.getByRole("textbox");
		expect(input).toBeDisabled();
	});

	test("works as controlled", async () => {
		const handleChange = jest.fn();
		render(<TextArea name={fixtures.name} onChange={handleChange} value={fixtures.value} />);

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
		render(<TextArea name={fixtures.name} onChange={handleChange} defaultValue={fixtures.value} />);

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
			<TextArea
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
