import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Select from "components/Select";

const fixtures = {
	name: "animal",
	label1: "Dog",
	value1: "dog",
	label2: "Turtle",
	value2: "turtle",
	start: "Start",
	placeholder: "No preference",
	className: "test-className",
	id: "test-id",
	inputId: "test-input-id",
};

describe("Components/Select", () => {
	test("renders select", () => {
		render(
			<Select
				name={fixtures.name}
				options={[
					{ label: fixtures.label1, value: fixtures.value1 },
					{ label: fixtures.label2, value: fixtures.value2 },
				]}
				startSlot={fixtures.start}
			/>
		);

		const elInput = screen.getByRole("combobox");
		const elOptions = screen.getAllByRole("option");
		const elStart = screen.getByText(fixtures.start);

		expect(elInput).toHaveAttribute("name", fixtures.name);
		expect(elInput).toHaveValue(fixtures.value1);
		expect(elOptions.length).toBe(2);
		expect(elOptions[0]).toHaveValue(fixtures.value1);
		expect(elOptions[0].textContent).toBe(fixtures.label1);
		expect(elOptions[1]).toHaveValue(fixtures.value2);
		expect(elOptions[1].textContent).toBe(fixtures.label2);
		expect(elStart).toBeInTheDocument();
	});

	test("supports placeholder", () => {
		render(
			<Select
				name={fixtures.name}
				placeholder={fixtures.placeholder}
				options={[
					{ label: fixtures.label1, value: fixtures.value1 },
					{ label: fixtures.label2, value: fixtures.value2 },
				]}
			/>
		);

		const elInput = screen.getByRole("combobox");
		const elOptions = screen.getAllByRole("option");

		expect(elInput).toHaveValue("");
		expect(elOptions.length).toBe(3);
		expect(elOptions[0].textContent).toBe(fixtures.placeholder);
		expect(elOptions[0]).toHaveValue("");
	});

	test("supports custom id", () => {
		render(
			<Select
				id={fixtures.inputId}
				name={fixtures.name}
				options={[
					{ label: fixtures.label1, value: fixtures.value1 },
					{ label: fixtures.label2, value: fixtures.value2 },
				]}
			/>
		);

		const elInput = screen.getByRole("combobox");
		expect(elInput).toHaveAttribute("id", fixtures.inputId);
	});

	test("supports disabled state", () => {
		render(
			<Select
				disabled
				name={fixtures.name}
				options={[
					{ label: fixtures.label1, value: fixtures.value1 },
					{ label: fixtures.label2, value: fixtures.value2 },
				]}
			/>
		);

		const elInput = screen.getByRole("combobox");
		expect(elInput).toBeDisabled();
	});

	test("works as controlled", async () => {
		const handleChange = jest.fn();
		render(
			<Select
				onChange={handleChange}
				name={fixtures.name}
				value={fixtures.value1}
				options={[
					{ label: fixtures.label1, value: fixtures.value1 },
					{ label: fixtures.label2, value: fixtures.value2 },
				]}
			/>
		);

		const elInput = screen.getByRole("combobox");

		expect(elInput).toHaveValue(fixtures.value1);

		await userEvent.selectOptions(elInput, fixtures.value2);

		expect(handleChange).toBeCalledTimes(1);
		expect(elInput).toHaveValue(fixtures.value1);
	});

	test("works as uncontrolled", async () => {
		const handleChange = jest.fn();
		render(
			<Select
				onChange={handleChange}
				name={fixtures.name}
				defaultValue={fixtures.value1}
				options={[
					{ label: fixtures.label1, value: fixtures.value1 },
					{ label: fixtures.label2, value: fixtures.value2 },
				]}
			/>
		);

		const elInput = screen.getByRole("combobox");

		expect(elInput).toHaveValue(fixtures.value1);

		await userEvent.selectOptions(elInput, fixtures.value2);

		expect(handleChange).toBeCalledTimes(1);
		expect(elInput).toHaveValue(fixtures.value2);
	});

	test("applies className and attributes", () => {
		const { container } = render(
			<Select
				name={fixtures.name}
				options={[
					{ label: fixtures.label1, value: fixtures.value1 },
					{ label: fixtures.label2, value: fixtures.value2 },
				]}
				className={fixtures.className}
				attributes={{ "data-id": fixtures.id }}
				inputAttributes={{ id: fixtures.inputId }}
			/>
		);

		const elInput = screen.getByRole("combobox");

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("data-id", fixtures.id);
		expect(elInput).toHaveAttribute("id", fixtures.inputId);
	});
});
