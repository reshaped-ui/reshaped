import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Radio from "components/Radio";
import RadioGroup from "components/RadioGroup";

const fixtures = {
	name: "animal",
	ignoredName: "child-name",
	value1: "dog",
	value2: "cat",
	content1: "Dog",
	content2: "Cat",
};

describe("Components/RadioGroup", () => {
	test("renders children", () => {
		render(
			<RadioGroup name={fixtures.name} defaultValue={fixtures.value1}>
				<Radio value={fixtures.value1} name={fixtures.ignoredName}>
					{fixtures.content1}
				</Radio>
			</RadioGroup>
		);

		const input = screen.getByRole("radio");
		expect(screen.getByText(fixtures.content1)).toBeInTheDocument();
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("value", fixtures.value1);
		expect(input).toHaveAttribute("name", fixtures.name);
		expect(input).toBeChecked();
	});

	test("works as controlled", async () => {
		const handleChange = jest.fn();
		render(
			<RadioGroup name={fixtures.name} value={fixtures.value1} onChange={handleChange}>
				{/* checked should be ignored */}
				<Radio value={fixtures.value1} checked={false}>
					{fixtures.content1}
				</Radio>

				<Radio value={fixtures.value2}>{fixtures.content2}</Radio>
			</RadioGroup>
		);

		const inputs = screen.getAllByRole("radio");

		expect(inputs[0]).toBeChecked();

		await userEvent.click(inputs[1]);
		expect(handleChange).toBeCalledTimes(1);
		expect(handleChange).toBeCalledWith(
			expect.objectContaining({
				value: fixtures.value2,
				name: fixtures.name,
			})
		);
		expect(inputs[0]).toBeChecked();
		expect(inputs[1]).not.toBeChecked();
	});

	test("works as uncontrolled", async () => {
		const handleChange = jest.fn();
		render(
			<RadioGroup name={fixtures.name} defaultValue={fixtures.value1} onChange={handleChange}>
				{/* checked should be ignored */}
				<Radio value={fixtures.value1} checked={false}>
					{fixtures.content1}
				</Radio>

				<Radio value={fixtures.value2}>{fixtures.content2}</Radio>
			</RadioGroup>
		);

		const inputs = screen.getAllByRole("radio");

		expect(inputs[0]).toBeChecked();
		await userEvent.click(inputs[1]);
		expect(handleChange).toBeCalledTimes(1);
		expect(handleChange).toBeCalledWith(
			expect.objectContaining({
				value: fixtures.value2,
				name: fixtures.name,
			})
		);
		expect(inputs[0]).not.toBeChecked();
		expect(inputs[1]).toBeChecked();
	});

	test("supports disabled state", () => {
		render(
			<RadioGroup name={fixtures.name} disabled>
				<Radio value={fixtures.value1}>{fixtures.content1}</Radio>
			</RadioGroup>
		);

		const input = screen.getByRole("radio");
		expect(input).toBeDisabled();
	});
});
