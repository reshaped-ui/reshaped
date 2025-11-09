import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import Switch from "components/Switch";
import View from "components/View";
import { Example } from "utilities/storybook";

export default {
	title: "Components/Switch",
	component: Switch,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/switch",
		},
	},
};

export const size = () => (
	<Example>
		<Example.Item title="size: medium">
			<Switch name="active" size="medium" inputAttributes={{ "aria-label": "test switch" }} />
		</Example.Item>
		<Example.Item title="size: small">
			<Switch name="active" size="small" inputAttributes={{ "aria-label": "test switch" }} />
		</Example.Item>
		<Example.Item title="size: large">
			<Switch name="active" size="large" inputAttributes={{ "aria-label": "test switch" }} />
		</Example.Item>
		<Example.Item title="size: responsive, s: small, m: large">
			<Switch
				name="active"
				size={{ s: "small", m: "large" }}
				inputAttributes={{ "aria-label": "test switch" }}
			/>
		</Example.Item>
	</Example>
);

export const label = () => (
	<Example>
		<Example.Item title="size: medium">
			<View direction="row" gap={8}>
				<Switch name="active" inputAttributes={{ "aria-label": "test switch" }}>
					Wi-fi
				</Switch>
				<Switch reversed name="active" inputAttributes={{ "aria-label": "test switch" }}>
					Wi-fi
				</Switch>
			</View>
		</Example.Item>
		<Example.Item title="size: small">
			<View direction="row" gap={8}>
				<Switch name="active" size="small" inputAttributes={{ "aria-label": "test switch" }}>
					Wi-fi
				</Switch>
				<Switch
					reversed
					name="active"
					size="small"
					inputAttributes={{ "aria-label": "test switch" }}
				>
					Wi-fi
				</Switch>
			</View>
		</Example.Item>

		<Example.Item title="size: large">
			<View direction="row" gap={8}>
				<Switch name="active" size="large" inputAttributes={{ "aria-label": "test switch" }}>
					Wi-fi
				</Switch>
				<Switch
					reversed
					name="active"
					size="large"
					inputAttributes={{ "aria-label": "test switch" }}
				>
					Wi-fi
				</Switch>
			</View>
		</Example.Item>
	</Example>
);

export const defaultChecked: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "defaultChecked, uncontrolled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<Switch name="test-name" defaultChecked onChange={args.handleChange}>
			Label
		</Switch>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("checkbox");

		expect(input).toBeChecked();

		await userEvent.click(input);

		expect(args.handleChange).toBeCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "test-name",
			checked: false,
			event: expect.objectContaining({ target: input }),
		});
		expect(input).not.toBeChecked();
	},
};

export const checked: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "checked, uncontrolled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<Switch name="test-name" checked onChange={args.handleChange}>
			Label
		</Switch>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("checkbox");

		expect(input).toBeChecked();

		await userEvent.click(input);

		expect(args.handleChange).toBeCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "test-name",
			checked: false,
			event: expect.objectContaining({ target: input }),
		});
		expect(input).toBeChecked();
	},
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<Example>
			<Example.Item title="disabled, unselected">
				<Switch name="active" disabled inputAttributes={{ "aria-label": "test switch" }} />
			</Example.Item>
			<Example.Item title="disabled, selected">
				<Switch
					name="active"
					disabled
					defaultChecked
					inputAttributes={{ "aria-label": "test switch" }}
				/>
			</Example.Item>
			<Example.Item title="disabled, with label">
				<Switch name="active" disabled>
					Switch
				</Switch>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		const [input] = canvas.getAllByRole("checkbox");
		expect(input).toBeDisabled();
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Switch
				className="test-classname"
				attributes={{ id: "test-id" }}
				inputAttributes={{ "aria-label": "test select", id: "test-input-id" }}
				name="name"
			>
				Label
			</Switch>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;
		const input = canvas.getByRole("checkbox");

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
		expect(input).toHaveAttribute("id", "test-input-id");
	},
};
