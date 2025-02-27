import React from "react";
import { StoryObj } from "@storybook/react";
import { expect, waitFor, within, fn } from "@storybook/test";
import { Example } from "utilities/storybook";
import Autocomplete from "components/Autocomplete";
import FormControl from "components/FormControl";
import { sleep } from "utilities/helpers";
import userEvent from "@testing-library/user-event";

export default {
	title: "Components/Autocomplete/tests",
	component: Autocomplete,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/autocomplete",
		},
	},
};

export const base: StoryObj<{
	handleItemSelect: ReturnType<typeof fn>;
	handleBackspace: ReturnType<typeof fn>;
}> = {
	name: "base",
	args: {
		handleBackspace: fn(),
		handleItemSelect: fn(),
	},
	render: (args) => {
		const [value, setValue] = React.useState("");

		return (
			<Example>
				<Example.Item title="Base">
					<FormControl>
						<FormControl.Label>Food</FormControl.Label>
						<Autocomplete
							name="fruit"
							placeholder="Pick your food"
							value={value}
							onChange={(args) => setValue(args.value)}
							onBackspace={args.handleBackspace}
							onItemSelect={args.handleItemSelect}
						>
							{["Pizza", "Pie", "Ice-cream"].map((v, i) => {
								return (
									<Autocomplete.Item key={v} value={v} data={i === 0 ? { foo: "bar" } : undefined}>
										{v}
									</Autocomplete.Item>
								);
							})}
						</Autocomplete>
					</FormControl>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);

		const input = canvas.getByRole("combobox");

		// Reset the focus
		document.body.focus();

		// Test keyboard selection after focusing the input
		input.focus();

		let options: HTMLElement[] = [];

		await waitFor(() => {
			options = canvas.getAllByRole("option");
		});

		expect(options).toHaveLength(3);

		await waitFor(() => {
			expect(options[0]).toHaveAttribute("data-rs-focus");
		});

		expect(options[1]).not.toHaveAttribute("data-rs-focus");

		await userEvent.keyboard("{ArrowDown/}");
		await userEvent.keyboard("{Enter/}");

		expect(input).toHaveValue("Pie");
		expect(args.handleItemSelect).toHaveBeenCalledTimes(1);
		expect(args.handleItemSelect).toHaveBeenCalledWith({
			value: "Pie",
			data: undefined,
		});

		// Give browser time to focus on the input
		await sleep(100);

		// Test click selection after opening with down arrow
		await userEvent.keyboard("{ArrowDown/}");

		await waitFor(() => {
			options = canvas.getAllByRole("option");
		});

		await userEvent.click(options[0]);

		expect(input).toHaveValue("Pizza");
		expect(args.handleItemSelect).toHaveBeenCalledTimes(2);
		expect(args.handleItemSelect).toHaveBeenCalledWith({
			value: "Pizza",
			data: { foo: "bar" },
		});

		input.focus();

		await userEvent.keyboard("{Backspace/}");

		await waitFor(() => {
			expect(args.handleBackspace).toHaveBeenCalledTimes(1);
			expect(args.handleBackspace).toHaveBeenCalledWith();
		});
	},
};
