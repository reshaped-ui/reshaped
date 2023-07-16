import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Reshaped from "components/Reshaped";
import Autocomplete from "components/Autocomplete";

const fixtures = {
	name: "test-name",
	className: "test-className",
	id: "test-id",
	itemContent: "Item content",
	itemClassName: "test-item-className",
	itemId: "test-item-id",
	firstValue: "value 1",
	secondValue: "value 2",
};

describe("Components/Autocomplete", () => {
	test("works from keyboard", async () => {
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

		await waitFor(() => {
			const items = screen.getAllByRole("menuitem");
			expect(items).toHaveLength(2);

			// Focus first item manually since unit tests can't trap focus
			act(() => {
				items[0].focus();
			});
		});

		await userEvent.keyboard("{Enter}");

		expect(handleChange).toBeCalledTimes(1);
		expect(handleChange).toBeCalledWith({ name: fixtures.name, value: fixtures.firstValue });
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
			const items = screen.getAllByRole("menuitem");
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

		act(() => {
			inputEl.focus();
		});

		await waitFor(() => {
			const itemEl = screen.getByTestId(fixtures.itemId);
			expect(itemEl).toBeInTheDocument();
		});
	});
});
