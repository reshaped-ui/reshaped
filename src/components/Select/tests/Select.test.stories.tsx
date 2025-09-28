// import { StoryObj } from "@storybook/react-vite";
// import { expect, userEvent, fn } from "storybook/test";
import Select from "components/Select";

export default {
	title: "Components/Select/tests",
	component: Select,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/select",
		},
		chromatic: { disableSnapshot: true },
	},
};

// export const render: StoryObj = {
// 	name: "rendering",
// 	render: () => (
// 		<Select
// 			name="test-name"
// 			options={[
// 				{ label: "Option 1", value: "1" },
// 				{ label: "Option 2", value: "2" },
// 			]}
// 			inputAttributes={{ "aria-label": "test select" }}
// 		/>
// 	),
// 	play: async ({ canvas }) => {
// 		const elInput = canvas.getByRole("combobox");
// 		const elOptions = canvas.getAllByRole("option");

// 		expect(elInput).toHaveAttribute("name", "test-name");
// 		expect(elInput).toHaveValue("1");
// 		expect(elOptions.length).toBe(2);
// 		expect(elOptions[0]).toHaveValue("1");
// 		expect(elOptions[0].textContent).toBe("Option 1");
// 		expect(elOptions[1]).toHaveValue("2");
// 		expect(elOptions[1].textContent).toBe("Option 2");
// 	},
// };

// export const startSlot: StoryObj = {
// 	name: "startSlot",
// 	render: () => (
// 		<Select
// 			name="test-name"
// 			startSlot="Slot"
// 			options={[]}
// 			inputAttributes={{ "aria-label": "test select" }}
// 		/>
// 	),
// 	play: async ({ canvas }) => {
// 		const slot = canvas.getByText("Slot");

// 		expect(slot).toBeInTheDocument();
// 	},
// };

// export const placeholder: StoryObj = {
// 	name: "placeholder",
// 	render: () => (
// 		<Select
// 			name="test-name"
// 			placeholder="Placeholder"
// 			options={[
// 				{ label: "Option 1", value: "1" },
// 				{ label: "Option 2", value: "2" },
// 			]}
// 			inputAttributes={{ "aria-label": "test select" }}
// 		/>
// 	),
// 	play: async ({ canvas }) => {
// 		const input = canvas.getByRole("combobox");
// 		const options = canvas.getAllByRole("option");

// 		expect(input).toHaveValue("");
// 		expect(options.length).toBe(3);
// 		expect(options[0].textContent).toBe("Placeholder");
// 		expect(options[0]).toHaveValue("");
// 	},
// };

// export const id: StoryObj = {
// 	name: "id",
// 	render: () => (
// 		<Select
// 			name="test-name"
// 			id="test-id"
// 			options={[
// 				{ label: "Option 1", value: "1" },
// 				{ label: "Option 2", value: "2" },
// 			]}
// 			inputAttributes={{ "aria-label": "test select" }}
// 		/>
// 	),
// 	play: async ({ canvas }) => {
// 		const input = canvas.getByRole("combobox");
// 		expect(input).toHaveAttribute("id", "test-id");
// 	},
// };

// export const disabled: StoryObj = {
// 	name: "disabled",
// 	render: () => (
// 		<Select
// 			name="test-name"
// 			disabled
// 			options={[
// 				{ label: "Option 1", value: "1" },
// 				{ label: "Option 2", value: "2" },
// 			]}
// 			inputAttributes={{ "aria-label": "test select" }}
// 		/>
// 	),
// 	play: async ({ canvas }) => {
// 		const input = canvas.getByRole("combobox");
// 		expect(input).toBeDisabled();
// 	},
// };

// export const defaultValue: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
// 	name: "defaultValue, uncontrolled",
// 	args: {
// 		handleChange: fn(),
// 	},
// 	render: (args) => (
// 		<Select
// 			name="test-name"
// 			defaultValue="2"
// 			onChange={args.handleChange}
// 			options={[
// 				{ label: "Option 1", value: "1" },
// 				{ label: "Option 2", value: "2" },
// 			]}
// 			inputAttributes={{ "aria-label": "test select" }}
// 		/>
// 	),
// 	play: async ({ canvas, args }) => {
// 		const input = canvas.getByRole("combobox");

// 		expect(input).toHaveValue("2");

// 		await userEvent.selectOptions(input, "1");

// 		expect(args.handleChange).toBeCalledTimes(1);
// 		expect(args.handleChange).toHaveBeenCalledWith({
// 			name: "test-name",
// 			value: "1",
// 			event: expect.objectContaining({ target: input }),
// 		});
// 		expect(input).toHaveValue("1");
// 	},
// };

// export const value: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
// 	name: "value, controlled",
// 	args: {
// 		handleChange: fn(),
// 	},
// 	render: (args) => (
// 		<Select
// 			name="test-name"
// 			value="2"
// 			onChange={args.handleChange}
// 			options={[
// 				{ label: "Option 1", value: "1" },
// 				{ label: "Option 2", value: "2" },
// 			]}
// 			inputAttributes={{ "aria-label": "test select" }}
// 		/>
// 	),
// 	play: async ({ canvas, args }) => {
// 		const input = canvas.getByRole("combobox");

// 		expect(input).toHaveValue("2");

// 		await userEvent.selectOptions(input, "1");

// 		expect(args.handleChange).toBeCalledTimes(1);
// 		expect(args.handleChange).toHaveBeenCalledWith({
// 			name: "test-name",
// 			value: "1",
// 			event: expect.objectContaining({ target: input }),
// 		});
// 		expect(input).toHaveValue("2");
// 	},
// };

// export const className: StoryObj = {
// 	name: "className, attributes",
// 	render: () => (
// 		<div data-testid="root">
// 			<Select
// 				className="test-classname"
// 				attributes={{ id: "test-id" }}
// 				inputAttributes={{ "aria-label": "test select", id: "test-input-id" }}
// 				options={[]}
// 				name="name"
// 			/>
// 		</div>
// 	),
// 	play: async ({ canvas }) => {
// 		const root = canvas.getByTestId("root").firstChild;
// 		const input = canvas.getByRole("combobox");

// 		expect(root).toHaveClass("test-classname");
// 		expect(root).toHaveAttribute("id", "test-id");
// 		expect(input).toHaveAttribute("id", "test-input-id");
// 	},
// };
