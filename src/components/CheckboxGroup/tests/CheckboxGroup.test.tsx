import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Checkbox from "components/Checkbox";
import CheckboxGroup from "components/CheckboxGroup";

const fixtures = {
	name: "animal",
	ignoredName: "child-name",
	value1: "dog",
	value2: "cat",
	content1: "Dog",
	content2: "Cat",
};

describe("Components/CheckboxGroup", () => {
	test("renders children", () => {
		render(
			<CheckboxGroup name={fixtures.name} defaultValue={[fixtures.value1]}>
				<Checkbox value={fixtures.value1} name={fixtures.ignoredName}>
					{fixtures.content1}
				</Checkbox>
			</CheckboxGroup>
		);

		const input = screen.getByRole("checkbox");
		expect(screen.getByText(fixtures.content1)).toBeInTheDocument();
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("value", fixtures.value1);
		expect(input).toHaveAttribute("name", fixtures.name);
		expect(input).toBeChecked();
	});

	test("works as controlled", async () => {
		const handleChange = jest.fn();
		render(
			<CheckboxGroup name={fixtures.name} value={[fixtures.value1]} onChange={handleChange}>
				{/* checked should be ignored */}
				<Checkbox value={fixtures.value1} checked={false}>
					{fixtures.content1}
				</Checkbox>

				<Checkbox value={fixtures.value2}>{fixtures.content2}</Checkbox>
			</CheckboxGroup>
		);

		const inputs = screen.getAllByRole("checkbox");

		expect(inputs[0]).toBeChecked();
		await userEvent.click(inputs[1]);
		expect(handleChange).toBeCalledTimes(1);
		expect(handleChange).toBeCalledWith(
			expect.objectContaining({
				value: [fixtures.value1, fixtures.value2],
				name: fixtures.name,
			})
		);
		expect(inputs[0]).toBeChecked();
		expect(inputs[1]).not.toBeChecked();
	});

	test("works as uncontrolled", async () => {
		const handleChange = jest.fn();
		render(
			<CheckboxGroup name={fixtures.name} defaultValue={[fixtures.value1]} onChange={handleChange}>
				{/* checked should be ignored */}
				<Checkbox value={fixtures.value1} checked={false}>
					{fixtures.content1}
				</Checkbox>

				<Checkbox value={fixtures.value2}>{fixtures.content2}</Checkbox>
			</CheckboxGroup>
		);

		const inputs = screen.getAllByRole("checkbox");

		expect(inputs[0]).toBeChecked();
		await userEvent.click(inputs[1]);
		expect(handleChange).toBeCalledTimes(1);
		expect(handleChange).toBeCalledWith(
			expect.objectContaining({
				value: [fixtures.value1, fixtures.value2],
				name: fixtures.name,
			})
		);
		expect(inputs[0]).toBeChecked();
		expect(inputs[1]).toBeChecked();
	});

	test("supports disabled state", () => {
		render(
			<CheckboxGroup name={fixtures.name} disabled>
				<Checkbox value={fixtures.value1}>{fixtures.content1}</Checkbox>
			</CheckboxGroup>
		);

		const input = screen.getByRole("checkbox");
		expect(input).toBeDisabled();
	});
});
