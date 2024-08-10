import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Checkbox from "components/Checkbox";

const fixtures = {
	name: "animal",
	value: "dog",
	content: "Content",
	className: "test-className",
	id: "test-id",
	inputId: "test-input-id",
};

describe("Components/Checkbox", () => {
	test("renders checkbox", () => {
		render(
			<Checkbox name={fixtures.name} value={fixtures.value}>
				{fixtures.content}
			</Checkbox>
		);

		const input = screen.getByRole("checkbox");

		expect(screen.getByText(fixtures.content)).toBeInTheDocument();
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("value", fixtures.value);
		expect(input).not.toBeChecked();
	});

	test("works as controlled", async () => {
		const handleChange = jest.fn();
		render(
			<Checkbox name={fixtures.name} value={fixtures.value} onChange={handleChange} checked>
				{fixtures.content}
			</Checkbox>
		);

		const input = screen.getByRole("checkbox") as HTMLInputElement;

		expect(input.checked).toBeTruthy();
		await userEvent.click(input);
		expect(handleChange).toBeCalledTimes(1);
		expect(input.checked).toBeTruthy();
	});

	test("works as uncontrolled", async () => {
		const handleChange = jest.fn();
		render(
			<Checkbox name={fixtures.name} value={fixtures.value} onChange={handleChange} defaultChecked>
				{fixtures.content}
			</Checkbox>
		);

		const input = screen.getByRole("checkbox") as HTMLInputElement;

		expect(input.checked).toBeTruthy();
		await userEvent.click(input);
		expect(handleChange).toBeCalledTimes(1);
		expect(input.checked).toBeFalsy();
	});

	test("supports disabled state", () => {
		render(
			<Checkbox name={fixtures.name} value={fixtures.value} disabled>
				{fixtures.content}
			</Checkbox>
		);

		const input = screen.getByRole("checkbox") as HTMLInputElement;

		expect(input).toBeDisabled();
	});

	test("supports indeterminate state", async () => {
		render(
			<Checkbox name={fixtures.name} value={fixtures.value} indeterminate>
				{fixtures.content}
			</Checkbox>
		);

		const input = screen.getByRole("checkbox") as HTMLInputElement;

		expect(input.indeterminate).toBeTruthy();
		await userEvent.click(input);
		waitFor(() => {
			expect(input.indeterminate).toBeFalsy();
		});
	});

	test("works with className and attributes", () => {
		const { container } = render(
			<Checkbox
				name={fixtures.name}
				value={fixtures.value}
				className={fixtures.className}
				attributes={{ id: fixtures.id }}
				inputAttributes={{ id: fixtures.inputId }}
			>
				{fixtures.content}
			</Checkbox>
		);

		const input = screen.getByRole("checkbox") as HTMLInputElement;

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
		expect(input).toHaveAttribute("id", fixtures.inputId);
	});
});
