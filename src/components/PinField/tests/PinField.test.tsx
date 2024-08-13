import { render, screen, act, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import PinField from "components/PinField";
import FormControl from "components/FormControl";
import Reshaped from "components/Reshaped";

const fixtures = {
	name: "test-name",
	label: "test-label",
	className: "test-className",
	id: "test-id",
	inputId: "test-input-id",
};

describe("Components/PinField", () => {
	test("renders component correctly", () => {
		render(
			<Reshaped>
				<PinField name={fixtures.name} />
			</Reshaped>
		);

		const elInput = screen.getByRole("textbox");

		expect(elInput).toBeInTheDocument();
		expect(elInput).toHaveAttribute("name", fixtures.name);
		expect(elInput).toHaveAttribute("autocomplete", "one-time-code");
		expect(elInput).toHaveAttribute("inputmode", "numeric");
	});

	test("renders with custom value length", () => {
		render(
			<Reshaped>
				<PinField name={fixtures.name} valueLength={6} />
			</Reshaped>
		);

		const elInput = screen.getByRole("textbox");

		expect(elInput).toHaveAttribute("maxlength", "6");
	});

	test("works as uncontrolled", async () => {
		const handleChange = jest.fn();
		render(
			<Reshaped>
				<PinField name={fixtures.name} onChange={handleChange} defaultValue="12" />
			</Reshaped>
		);

		const elInput = screen.getByRole("textbox");

		await act(async () => {
			elInput.focus();
			await userEvent.keyboard("3");
		});

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith(
			expect.objectContaining({ value: "123", name: fixtures.name })
		);
		expect(elInput).toHaveValue("123");
	});

	test("works as controlled", async () => {
		const handleChange = jest.fn();
		render(
			<Reshaped>
				<PinField name={fixtures.name} onChange={handleChange} value="12" />
			</Reshaped>
		);

		const elInput = screen.getByRole("textbox");

		await act(async () => {
			elInput.focus();
			await userEvent.keyboard("3");
		});

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith(
			expect.objectContaining({ value: "123", name: fixtures.name })
		);
		expect(elInput).toHaveValue("12");
	});

	test("renders with custom pattern", async () => {
		const handleChange = jest.fn();
		render(
			<Reshaped>
				<PinField
					name={fixtures.name}
					pattern="alphabetic"
					defaultValue="ab"
					onChange={handleChange}
				/>
			</Reshaped>
		);

		const elInput = screen.getByRole("textbox");

		await act(async () => {
			elInput.focus();
			await userEvent.keyboard("3");
		});

		expect(elInput).toHaveValue("ab");
		expect(handleChange).toHaveBeenCalledTimes(0);
	});

	test("handles keyboard navigation", async () => {
		render(
			<Reshaped>
				<PinField name={fixtures.name} />
			</Reshaped>
		);

		const elInput = screen.getByRole<HTMLInputElement>("textbox");

		await act(() => {
			elInput.focus();
		});

		expect(elInput.selectionStart).toEqual(0);

		await userEvent.keyboard("1");

		await waitFor(() => {
			expect(elInput.selectionStart).toEqual(1);
		});

		await userEvent.keyboard("234");

		await waitFor(() => {
			expect(elInput.selectionStart).toEqual(3);
			expect(elInput.selectionEnd).toEqual(4);
		});

		await userEvent.keyboard(
			"{ArrowLeft}{/ArrowLeft}{ArrowLeft}{/ArrowLeft}{ArrowLeft}{/ArrowLeft}"
		);

		await waitFor(() => {
			expect(elInput.selectionStart).toEqual(0);
			expect(elInput.selectionEnd).toEqual(1);
		});

		await userEvent.keyboard("{ArrowRight}{/ArrowRight}{ArrowRight}{/ArrowRight}");

		await waitFor(() => {
			expect(elInput.selectionStart).toEqual(2);
			expect(elInput.selectionEnd).toEqual(3);
		});

		expect(elInput).toHaveValue("1234");
		await userEvent.keyboard("{backspace}{/backspace}");
		expect(elInput).toHaveValue("124");

		await waitFor(() => {
			expect(elInput.selectionStart).toEqual(2);
			expect(elInput.selectionEnd).toEqual(3);
		});

		// Switched to type mode
		await userEvent.keyboard("{ArrowRight}{/ArrowRight}");

		await waitFor(() => {
			expect(elInput.selectionStart).toEqual(3);
		});

		// Can't move further
		await userEvent.keyboard("{ArrowRight}{/ArrowRight}");
		expect(elInput.selectionStart).toEqual(3);
	});

	test("supports FormControl", () => {
		render(
			<Reshaped>
				<FormControl>
					<FormControl.Label>{fixtures.label}</FormControl.Label>
					<PinField name={fixtures.name} />
				</FormControl>
			</Reshaped>
		);

		const elInput = screen.getByRole("textbox");

		expect(elInput).toHaveAccessibleName(fixtures.label);
	});

	test("works with className and attributes", () => {
		render(
			<Reshaped>
				<PinField
					name={fixtures.name}
					className={fixtures.className}
					attributes={{ "data-testid": fixtures.id }}
					inputAttributes={{ id: fixtures.inputId }}
				/>
			</Reshaped>
		);

		const elRoot = screen.getByTestId(fixtures.id);
		const elInput = screen.getByRole("textbox");

		expect(elRoot).toHaveClass(fixtures.className);
		expect(elInput).toHaveAttribute("id", fixtures.inputId);
	});
});
