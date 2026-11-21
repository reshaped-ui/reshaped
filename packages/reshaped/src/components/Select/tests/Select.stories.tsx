import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Actionable from "@/components/Actionable";
import Badge from "@/components/Badge";
import FormControl from "@/components/FormControl";
import Select from "@/components/Select";
import Text from "@/components/Text";
import View from "@/components/View";
import { Example, Placeholder } from "@/utilities/storybook";
import IconZap from "@/icons/Zap";

export default {
	title: "Components/Select",
	component: Select,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/select",
		},
	},
};

export const base: StoryObj = {
	name: "name, id, option groups",
	render: () => (
		<Example>
			<Example.Item title="default with options">
				<Select
					name="animal"
					id="animal-1"
					placeholder="Select an animal"
					inputAttributes={{
						"aria-label": "Select an animal",
					}}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
			<Example.Item title="default with option groups">
				<Select
					name="animal-2"
					id="animal-2"
					placeholder="Select an animal"
					inputAttributes={{
						"aria-label": "Select an animal",
					}}
				>
					<Select.Group label="Birds">
						<Select.Option value="pigeon">Pigeon</Select.Option>
						<Select.Option value="parrot">Parrot</Select.Option>
					</Select.Group>
					<Select.Group label="Sea Mammals">
						<Select.Option value="whale">Whale</Select.Option>
						<Select.Option value="dolphin">Dolphin</Select.Option>
					</Select.Group>
				</Select>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		const triggers = canvas.getAllByRole("button", { name: "Select an animal" });

		expect(triggers).toHaveLength(2);
		triggers.forEach((trigger) => {
			expect(trigger).toHaveTextContent("Select an animal");
			expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
			expect(trigger).toHaveAttribute("aria-expanded", "false");
		});
	},
};

export const selectedIconPosition: StoryObj = {
	name: "selectedIconPosition",
	render: () => (
		<Example>
			<Example.Item title="selectedIconPosition: start">
				<Select name="animal" placeholder="Select an animal" selectedIconPosition="start">
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
			<Example.Item title="selectedIconPosition: end">
				<Select name="animal" placeholder="Select an animal" selectedIconPosition="end">
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
		</Example>
	),
};

export const multiple: StoryObj = {
	name: "multiple",
	render: () => (
		<Example>
			<Example.Item title="multiple">
				<Select
					multiple
					name="animal"
					placeholder="Select an animal"
					defaultValue={["dog"]}
					renderValue={(args) => args.value.join(", ")}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
		</Example>
	),
};

export const variant: StoryObj = {
	name: "variant",
	render: () => (
		<Example>
			<Example.Item title="variant: faded">
				<Select
					variant="faded"
					name="animal-2"
					placeholder="Select an animal"
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>

			<Example.Item title="variant: ghost">
				<Select
					variant="ghost"
					name="animal-4"
					placeholder="Select an animal"
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>

			<Example.Item title="variant: headless">
				<Select
					variant="headless"
					name="animal-6"
					placeholder="Select an animal"
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
		</Example>
	),
};

export const size: StoryObj = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: small">
				<Select size="small" name="animal" placeholder="Select an animal">
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
			<Example.Item title="size: medium">
				<Select size="medium" name="animal" placeholder="Select an animal">
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
			<Example.Item title="size: large">
				<Select size="large" name="animal" placeholder="Select an animal">
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
			<Example.Item title="size: xlarge">
				<Select size="xlarge" name="animal" placeholder="Select an animal">
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
		</Example>
	),
};

export const startSlot: StoryObj = {
	name: "icon,startSlot",
	render: () => (
		<Example>
			<Example.Item title="icon">
				<Select name="animal" placeholder="Select an animal" icon={IconZap}>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>

			<Example.Item title="startSlot">
				<Select name="animal" placeholder="Select an animal" startSlot={<Placeholder h={20} />}>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>

			<Example.Item title="selectedIconPosition: end">
				<Select
					name="animal"
					placeholder="Select an animal"
					selectedIconPosition="end"
					defaultValue="dog"
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>

			<Example.Item title="selectedIconPosition: end (endSlot overrides check)">
				<Select
					name="animal"
					placeholder="Select an animal"
					selectedIconPosition="end"
					defaultValue="dog"
				>
					<Select.Option value="dog" endSlot={<Placeholder w={20} h={20} />}>
						Dog
					</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
		</Example>
	),
};

export const renderValue = {
	name: "renderValue",
	render: () => {
		const options = [
			{
				value: "1",
				label: "Title 1",
				subtitle: "Subtitle 1",
			},
			{
				value: "2",
				label: "Title 2",
				subtitle: "Subtitle 2",
			},
		];

		return (
			<Example>
				<Example.Item title="default renderer, single">
					<Select name="animal" defaultValue="1" placeholder="Nothing selected">
						{options.map((option) => (
							<Select.Option key={option.value} value={option.value}>
								<Text weight="medium">{option.label}</Text>
								<Text weight="regular" color="neutral-faded">
									{option.subtitle}
								</Text>
							</Select.Option>
						))}
					</Select>
				</Example.Item>

				<Example.Item title="default renderer, multiple">
					<Select
						name="animal"
						defaultValue={["1"]}
						multiple
						placeholder="Nothing selected"
						renderValue={(args) => args.value.join(", ")}
					>
						{options.map((option) => (
							<Select.Option key={option.value} value={option.value}>
								<Text weight="medium">{option.label}</Text>
								<Text weight="regular" color="neutral-faded">
									{option.subtitle}
								</Text>
							</Select.Option>
						))}
					</Select>
				</Example.Item>

				<Example.Item title="renderValue, single">
					<Select
						name="animal"
						defaultValue="1"
						placeholder="Nothing selected"
						renderValue={(args) => <Badge>Title {args.value}</Badge>}
					>
						{options.map((option) => (
							<Select.Option key={option.value} value={option.value}>
								<Text weight="medium">{option.label}</Text>
								<Text weight="regular" color="neutral-faded">
									{option.subtitle}
								</Text>
							</Select.Option>
						))}
					</Select>
				</Example.Item>

				<Example.Item title="renderValue, multiple">
					<Select
						name="animal"
						defaultValue={["1"]}
						multiple
						placeholder="Nothing selected"
						renderValue={(args) => <Badge>Titles {args.value.join(", ")}</Badge>}
					>
						{options.map((option) => (
							<Select.Option key={option.value} value={option.value}>
								<Text weight="medium">{option.label}</Text>
								<Text weight="regular" color="neutral-faded">
									{option.subtitle}
								</Text>
							</Select.Option>
						))}
					</Select>
				</Example.Item>
			</Example>
		);
	},
};

export const renderTrigger: StoryObj = {
	name: "renderTrigger",
	render: () => (
		<Example>
			<Example.Item title="renderTrigger">
				<Select
					name="animal"
					position="bottom-start"
					width="200px"
					size="small"
					placeholder="Select an animal"
					renderTrigger={(attributes) => (
						<Actionable attributes={attributes}>
							<View direction="row" gap={1} align="center">
								<Text color="neutral-faded">{attributes.children}</Text>
							</View>
						</Actionable>
					)}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		const trigger = canvas.getByRole("button", { name: "Select an animal" });

		expect(trigger).toHaveTextContent("Select an animal");
		expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
		expect(trigger).toHaveAttribute("aria-expanded", "false");
	},
};

export const error: StoryObj = {
	name: "error",
	render: () => (
		<Example>
			<Example.Item title="error">
				<Select name="animal" placeholder="Select an animal" hasError>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
		</Example>
	),
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<Example>
			<Example.Item title="disabled">
				<Select
					name="animal-2"
					placeholder="Select an animal"
					disabled
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const [custom] = canvas.getAllByRole("button");

		expect(custom).toBeDisabled();
	},
};

export const fallback: StoryObj = {
	name: "test: fallbackAdjustLayout",
	render: () => (
		<Example>
			<Example.Item title="fallback">
				<Select
					name="animal"
					placeholder="Select an animal"
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					{[...Array(100)].map((_, index) => (
						<Select.Option key={index} value={`item-${index}`}>
							Item {index + 1}
						</Select.Option>
					))}
				</Select>
				<div style={{ height: "1000px" }}></div>
				<Select
					name="animal"
					placeholder="Select an animal"
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					{[...Array(100)].map((_, index) => (
						<Select.Option key={index} value={`item-${index}`}>
							Item {index + 1}
						</Select.Option>
					))}
				</Select>
			</Example.Item>
		</Example>
	),
};

export const formControl: StoryObj = {
	name: "test: with FormControl",
	render: () => (
		<Example>
			<Example.Item title="FormControl">
				<FormControl hasError>
					<FormControl.Label>Animal</FormControl.Label>
					<Select name="animal" placeholder="Select an animal">
						<Select.Option value="dog">Dog</Select.Option>
						<Select.Option value="turtle">Turtle</Select.Option>
					</Select>
					<FormControl.Error>This field is required</FormControl.Error>
				</FormControl>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		const trigger = canvas.getByRole("button", { name: /Animal/ });

		expect(trigger).toHaveAccessibleName("Animal Select an animal");
		expect(trigger).toHaveAccessibleDescription("This field is required");
	},
};

export const testComposition: StoryObj = {
	name: "test: composition",
	render: () => (
		<Example>
			<Example.Item title="default with options">
				<Select
					name="animal"
					id="animal"
					placeholder="Select an animal"
					inputAttributes={{
						"aria-label": "Select an animal",
					}}
				>
					<Select.Group>
						<Select.Option value="dog">Dog</Select.Option>
						<Select.Option value="turtle">Turtle</Select.Option>
					</Select.Group>
					<Select.Group>
						<div>hello</div>
					</Select.Group>
				</Select>
			</Example.Item>
		</Example>
	),
};

export const nativeRender: StoryObj = {
	name: "native rendering, options, name, id",
	render: () => (
		<Example>
			<Example.Item title="native with option tags">
				<Select
					name="animal"
					id="animal"
					placeholder="Select an animal"
					inputAttributes={{
						"aria-label": "Select an animal",
					}}
				>
					<option value="dog">Dog</option>
					<option value="turtle">Turtle</option>
				</Select>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const select = canvas.getByRole("combobox");

		expect(select).toHaveDisplayValue("Select an animal");
	},
};
