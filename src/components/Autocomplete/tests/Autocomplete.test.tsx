import { render, screen, waitFor, act } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Reshaped from "components/Reshaped";
import Autocomplete from "components/Autocomplete";

const fixtures = {
	name: "test-name",
	className: "test-className",
	id: "test-id",
	inputId: "test-input-id",
	itemContent: "Item content",
	itemClassName: "test-item-className",
	itemId: "test-item-id",
	firstValue: "value 1",
	secondValue: "value 2",
};

describe("Components/Autocomplete", () => {
	test("works from keyboard", async () => {
		const handleChange = jest.fn();
		const handleInput = jest.fn();
		render(
			<Reshaped>
				<Autocomplete
					name={fixtures.name}
					className={fixtures.className}
					attributes={{ "data-testid": fixtures.id }}
					onChange={handleChange}
					onInput={handleInput}
				>
					<Autocomplete.Item value={fixtures.firstValue}>{fixtures.itemContent}</Autocomplete.Item>
					<Autocomplete.Item value={fixtures.secondValue}>{fixtures.itemContent}</Autocomplete.Item>
				</Autocomplete>
			</Reshaped>
		);

		const inputEl = screen.getByRole("combobox");

		act(() => {
			inputEl.focus();
		});

		await userEvent.keyboard("{f}");

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith(
			expect.objectContaining({ name: fixtures.name, value: "f" })
		);
		expect(handleInput).toHaveBeenCalledTimes(1);
		expect(handleInput).toHaveBeenCalledWith(
			expect.objectContaining({ name: fixtures.name, value: "f" })
		);

		await waitFor(() => {
			const items = screen.getAllByRole("option");
			expect(items).toHaveLength(2);

			// Focus first item manually since unit tests can't trap focus
			act(() => {
				items[0].focus();
			});
		});

		await userEvent.keyboard("{Enter}");

		expect(handleChange).toHaveBeenCalledTimes(2);
		expect(handleChange).toHaveBeenCalledWith(
			expect.objectContaining({ name: fixtures.name, value: fixtures.firstValue })
		);
		expect(handleInput).toHaveBeenCalledTimes(1);
	});

	test("works with mouse", async () => {
		const handleChange = jest.fn();
		render(
			<Reshaped>
				<Autocomplete
					name={fixtures.name}
					className={fixtures.className}
					attributes={{ "data-testid": fixtures.id }}
					onChange={handleChange}
				>
					<Autocomplete.Item value={fixtures.firstValue}>{fixtures.itemContent}</Autocomplete.Item>
					<Autocomplete.Item value={fixtures.secondValue}>{fixtures.itemContent}</Autocomplete.Item>
				</Autocomplete>
			</Reshaped>
		);

		const inputEl = screen.getByRole("combobox");

		act(() => {
			inputEl.focus();
		});

		await waitFor(async () => {
			const items = screen.getAllByRole("option");
			expect(items).toHaveLength(2);

			await userEvent.click(items[0]);
		});

		expect(handleChange).toBeCalledTimes(1);
		expect(handleChange).toBeCalledWith({ name: fixtures.name, value: fixtures.firstValue });
	});

	test("applies className and attributes", async () => {
		render(
			<Reshaped>
				<Autocomplete
					name={fixtures.name}
					className={fixtures.className}
					attributes={{ "data-testid": fixtures.id }}
					inputAttributes={{ "data-testid": fixtures.inputId }}
				>
					<Autocomplete.Item value="1" attributes={{ "data-testid": fixtures.itemId }}>
						{fixtures.itemContent}
					</Autocomplete.Item>
				</Autocomplete>
			</Reshaped>
		);

		const textFieldRootEl = screen.getByTestId(fixtures.id);
		expect(textFieldRootEl).toHaveClass(fixtures.className);

		const inputEl = screen.getByRole("combobox");

		expect(inputEl).toHaveAttribute("data-testid", fixtures.inputId);

		act(() => {
			inputEl.focus();
		});

		await waitFor(() => {
			const itemEl = screen.getByTestId(fixtures.itemId);
			expect(itemEl).toBeInTheDocument();
		});
	});
});
