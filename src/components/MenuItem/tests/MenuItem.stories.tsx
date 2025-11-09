import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import Hotkey from "components/Hotkey";
import MenuItem from "components/MenuItem";
import Text from "components/Text";
import View from "components/View";
import IconZap from "icons/Zap";
import { Example, Placeholder } from "utilities/storybook";

export default {
	title: "Components/MenuItem",
	component: MenuItem,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/menu-item",
		},
	},
};

export const size = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: small">
				<MenuItem size="small" icon={IconZap} onClick={() => {}} endSlot={<Hotkey>⌘K</Hotkey>}>
					Menu item
				</MenuItem>
			</Example.Item>
			<Example.Item title="size: medium">
				<MenuItem icon={IconZap} onClick={() => {}}>
					Menu item
				</MenuItem>
			</Example.Item>
			<Example.Item title="size: large">
				<MenuItem size="large" icon={IconZap} onClick={() => {}}>
					Menu item
				</MenuItem>
			</Example.Item>
			<Example.Item title={["responsive size", "[s] small", "[m] medium", "[l+] large"]}>
				<MenuItem size={{ s: "small", m: "medium", l: "large" }} icon={IconZap} onClick={() => {}}>
					Menu item
				</MenuItem>
			</Example.Item>
		</Example>
	),
};

export const color = {
	name: "color",
	render: () => (
		<Example>
			<Example.Item title="color: neutral">
				<MenuItem color="neutral" icon={IconZap}>
					Menu item
				</MenuItem>
			</Example.Item>
			<Example.Item title="color: primary">
				<MenuItem color="primary" icon={IconZap}>
					Menu item
				</MenuItem>
			</Example.Item>
			<Example.Item title="color: critical">
				<MenuItem color="critical" icon={IconZap}>
					Menu item
				</MenuItem>
			</Example.Item>
		</Example>
	),
};

export const selected = {
	name: "selected",
	render: () => (
		<Example>
			<Example.Item title="selected, color: neutral">
				<MenuItem color="neutral" selected icon={IconZap}>
					Menu item
				</MenuItem>
			</Example.Item>
			<Example.Item title="selected, color: primary">
				<MenuItem color="primary" selected icon={IconZap}>
					Menu item
				</MenuItem>
			</Example.Item>
			<Example.Item title="selected, color: critical">
				<MenuItem color="critical" selected icon={IconZap}>
					Menu item
				</MenuItem>
			</Example.Item>
		</Example>
	),
};

export const roundedCorners = {
	name: "roundedCorners",
	render: () => (
		<Example>
			<Example.Item title="roundedCorners">
				<MenuItem roundedCorners selected icon={IconZap}>
					Menu item
				</MenuItem>
			</Example.Item>

			<Example.Item title={["responsive roundedCorners", "[s]: false", "[m+]: true"]}>
				<MenuItem roundedCorners={{ s: false, m: true }} selected icon={IconZap}>
					Menu item
				</MenuItem>
			</Example.Item>
		</Example>
	),
};

export const slots = {
	name: "startSlot, endSlot",
	render: () => (
		<Example>
			<Example.Item title="startSlot, endSlot, selected">
				<MenuItem startSlot={<Placeholder h={20} />} endSlot={<Placeholder h={20} />} selected>
					Menu item
				</MenuItem>
			</Example.Item>
		</Example>
	),
};

export const aligner = {
	name: "aligner",
	render: () => (
		<Example>
			<Example.Item title="size: small">
				<View gap={2}>
					<Text variant="title-6">Heading</Text>
					<MenuItem.Aligner>
						<MenuItem size="small" selected onClick={() => {}}>
							Menu item
						</MenuItem>
					</MenuItem.Aligner>
				</View>
			</Example.Item>

			<Example.Item title="size: medium">
				<View gap={2}>
					<Text variant="title-6">Heading</Text>
					<MenuItem.Aligner>
						<MenuItem selected>Menu item</MenuItem>
					</MenuItem.Aligner>
				</View>
			</Example.Item>

			<Example.Item title="size: large">
				<View gap={2}>
					<Text variant="title-6">Heading</Text>
					<MenuItem.Aligner>
						<MenuItem size="large" selected>
							Menu item
						</MenuItem>
					</MenuItem.Aligner>
				</View>
			</Example.Item>
		</Example>
	),
};

export const href: StoryObj = {
	name: "href",
	render: () => <MenuItem href="https://reshaped.so">Trigger</MenuItem>,
	play: async ({ canvas }) => {
		const el = canvas.getByRole("link");

		expect(el).toHaveAttribute("href", "https://reshaped.so");
	},
};

export const onClick: StoryObj<{ handleClick: ReturnType<typeof fn> }> = {
	name: "onClick",
	args: {
		handleClick: fn(),
	},
	render: (args) => <MenuItem onClick={args.handleClick}>Trigger</MenuItem>,
	play: async ({ canvas, args }) => {
		const { handleClick } = args;
		const el = canvas.getAllByRole("button")[0];

		await userEvent.click(el);

		expect(el).toHaveAttribute("type", "button");
		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: el }));
	},
};

export const hrefOnClick: StoryObj<{ handleClick: ReturnType<typeof fn> }> = {
	name: "href + onClick",
	args: {
		handleClick: fn(),
	},
	render: (args) => (
		<MenuItem
			onClick={(e) => {
				e.preventDefault();
				args.handleClick(e);
			}}
			href="https://reshaped.so"
		>
			Trigger
		</MenuItem>
	),
	play: async ({ canvas, args }) => {
		const { handleClick } = args;
		const el = canvas.getByRole("link");

		await userEvent.click(el);

		expect(el).toHaveAttribute("href", "https://reshaped.so");
		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: el }));
	},
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<MenuItem disabled onClick={() => {}}>
			Trigger
		</MenuItem>
	),
	play: async ({ canvas }) => {
		const el = canvas.getAllByRole("button")[0];

		expect(el).toBeDisabled();
	},
};

export const as: StoryObj = {
	name: "as, render",
	render: () => (
		<Example>
			<Example.Item title="render, disabled">
				<MenuItem
					disabled
					onClick={() => {}}
					render={(props) => <section {...props} />}
					attributes={{ "data-testid": "render-el" }}
				>
					Trigger
				</MenuItem>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const renderEl = canvas.getByTestId("render-el");

		expect(renderEl.tagName).toBe("SECTION");
		expect(renderEl).toHaveAttribute("aria-disabled", "true");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<MenuItem className="test-classname" attributes={{ id: "test-id" }}>
				Trigger
			</MenuItem>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};

export const alignerClassName: StoryObj = {
	name: "aligner, className, attributes",
	render: () => (
		<div data-testid="root">
			<MenuItem.Aligner className="test-classname" attributes={{ id: "test-id" }}>
				<MenuItem>Trigger</MenuItem>
			</MenuItem.Aligner>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
