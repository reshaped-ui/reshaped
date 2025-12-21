import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import Link from "components/Link";
import Text from "components/Text";
import IconZap from "icons/Zap";
import { Example } from "utilities/storybook";

export default {
	title: "Components/Link",
	component: Link,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/breadcrumbs",
		},
	},
};

export const variant = {
	name: "variant",
	render: () => (
		<Example>
			<Example.Item title="variant: underline">
				<Link href="http://reshaped.so" attributes={{ target: "_blank" }}>
					Reshaped
				</Link>
			</Example.Item>
			<Example.Item title="variant: plain">
				<Link onClick={() => {}} variant="plain">
					Link
				</Link>
			</Example.Item>
		</Example>
	),
};

export const color = {
	name: "color",
	render: () => (
		<Example>
			<Example.Item title="color: primary">
				<Link color="primary">Link</Link>
			</Example.Item>
			<Example.Item title="color: critical">
				<Link color="critical">Link</Link>
			</Example.Item>
			<Example.Item title="color: positive">
				<Link color="positive">Link</Link>
			</Example.Item>
			<Example.Item title="color: warning">
				<Link color="warning">Link</Link>
			</Example.Item>
			<Example.Item title="color: inherit">
				<Link color="inherit">Link</Link>
			</Example.Item>
		</Example>
	),
};

export const icon = {
	name: "icon",
	render: () => (
		<Example>
			<Example.Item title="icon, variant: underline">
				<Link icon={IconZap}>Link</Link>
			</Example.Item>
			<Example.Item title="icon, variant: plain">
				<Link icon={IconZap} variant="plain">
					Link
				</Link>
			</Example.Item>
			<Example.Item
				title={["icon, variant: underline", "should inherit display-1 size from the parent"]}
			>
				<Text variant="title-3">
					<Link icon={IconZap} variant="underline">
						Instant delivery
					</Link>
				</Text>
			</Example.Item>
		</Example>
	),
};

export const href: StoryObj = {
	name: "href",
	render: () => <Link href="https://reshaped.so">Trigger</Link>,
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
	render: (args) => <Link onClick={args.handleClick}>Trigger</Link>,
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
		<Link
			onClick={(e) => {
				e.preventDefault();
				args.handleClick(e);
			}}
			href="https://reshaped.so"
		>
			Trigger
		</Link>
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
		<Link disabled onClick={() => {}}>
			Trigger
		</Link>
	),
	play: async ({ canvas }) => {
		const el = canvas.getAllByRole("button")[0];

		expect(el).toBeDisabled();
	},
};

export const render: StoryObj = {
	name: "render",
	render: () => <Link render={(props) => <section {...props} />}>Trigger</Link>,
	play: async ({ canvas }) => {
		const el = canvas.getByText("Trigger");

		expect(el).toBeInTheDocument();
		expect(el.tagName).toBe("SECTION");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Link className="test-classname" attributes={{ id: "test-id" }}>
				Trigger
			</Link>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};

export const testMultilineInText = {
	name: "test: multiline",
	render: () => (
		<Example>
			<Example.Item title="should wrap inside the text">
				<div>
					Someone asked me to write this text that is boring to ready for everyone and to add&nbsp;
					<Link href="/">this very very long link</Link> to it.
				</div>
			</Example.Item>
		</Example>
	),
};
