import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, userEvent } from "storybook/test";

import Avatar from "@/components/Avatar";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import View from "@/components/View";
import IconCheckmark from "@/icons/Checkmark";
import IconPlus from "@/icons/Plus";
import { Example } from "@/utilities/storybook";

export default {
	title: "Components/Badge",
	component: Badge,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/badge",
		},
	},
};

export const color = {
	name: "variant, color",
	render: () => (
		<Example>
			<Example.Item title="color: neutral">
				<View direction="row" gap={3}>
					<Badge>Badge</Badge>
					<Badge variant="faded">Badge</Badge>
				</View>
			</Example.Item>

			<Example.Item title="color: primary">
				<View direction="row" gap={3}>
					<Badge color="primary">Badge</Badge>
					<Badge variant="faded" color="primary">
						Badge
					</Badge>
				</View>
			</Example.Item>

			<Example.Item title="color: positive">
				<View direction="row" gap={3}>
					<Badge color="positive">Badge</Badge>
					<Badge variant="faded" color="positive">
						Badge
					</Badge>
				</View>
			</Example.Item>

			<Example.Item title="color: critical">
				<View direction="row" gap={3}>
					<Badge color="critical">Badge</Badge>
					<Badge variant="faded" color="critical">
						Badge
					</Badge>
				</View>
			</Example.Item>

			<Example.Item title="color: warning">
				<View direction="row" gap={3}>
					<Badge color="warning">Badge</Badge>
					<Badge variant="faded" color="warning">
						Badge
					</Badge>
				</View>
			</Example.Item>
		</Example>
	),
};

export const size = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: small, not rounded and rounded">
				<View gap={3} direction="row">
					<Badge size="small">Badge</Badge>
					<Badge rounded size="small">
						Badge
					</Badge>
				</View>
			</Example.Item>
			<Example.Item title="size: medium, not rounded and rounded">
				<View gap={3} direction="row">
					<Badge>Badge</Badge>
					<Badge rounded>Badge</Badge>
				</View>
			</Example.Item>
			<Example.Item title="size: large, not rounded and rounded">
				<View gap={3} direction="row">
					<Badge size="large">Badge</Badge>
					<Badge rounded size="large">
						Badge
					</Badge>
				</View>
			</Example.Item>
		</Example>
	),
};

export const icon = {
	name: "icon",
	render: () => (
		<Example>
			<Example.Item title="size: small">
				<View gap={3} direction="row">
					<Badge size="small" icon={IconPlus}>
						Badge
					</Badge>
					<Badge size="small" endIcon={IconPlus}>
						Badge
					</Badge>
					<Badge icon={IconPlus} size="small" />
				</View>
			</Example.Item>
			<Example.Item title="size: medium">
				<View gap={3} direction="row">
					<Badge icon={IconPlus}>Badge</Badge>
					<Badge endIcon={IconPlus}>Badge</Badge>
					<Badge icon={IconPlus} />
				</View>
			</Example.Item>
			<Example.Item title="size: large">
				<View gap={3} direction="row">
					<Badge size="large" icon={IconPlus}>
						Badge
					</Badge>
					<Badge size="large" endIcon={IconPlus}>
						Badge
					</Badge>
					<Badge icon={IconPlus} size="large" />
				</View>
			</Example.Item>
		</Example>
	),
};

export const onDismiss: StoryObj<{ handleDismiss: ReturnType<typeof fn> }> = {
	name: "onDismiss, dismissAriaLabel",
	args: {
		handleDismiss: fn(),
	},
	render: (args) => (
		<Example>
			<Example.Item title="onDismiss">
				<View direction="row" gap={3}>
					<Badge onDismiss={args.handleDismiss} dismissAriaLabel="Dismiss" size="small">
						Badge
					</Badge>

					<Badge onDismiss={args.handleDismiss} dismissAriaLabel="Dismiss" size="medium">
						Badge
					</Badge>

					<Badge onDismiss={args.handleDismiss} dismissAriaLabel="Dismiss" size="large">
						Badge
					</Badge>
				</View>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas, args }) => {
		const dismissTrigger = canvas.getAllByRole("button")[0];

		await userEvent.click(dismissTrigger);

		expect(dismissTrigger).toHaveAccessibleName("Dismiss");
		expect(args.handleDismiss).toHaveBeenCalledTimes(1);
		expect(args.handleDismiss).toHaveBeenCalledWith();
	},
};

export const rounded = {
	name: "rounded",
	render: () => (
		<Example>
			<Example.Item title="rounded, all variants">
				<View direction="row" gap={3}>
					<Badge rounded>Badge</Badge>
					<Badge rounded variant="faded">
						Badge
					</Badge>
				</View>
			</Example.Item>
			<Example.Item
				title={["rounded, all sizes, color: critical", "one character, renders as circle"]}
			>
				<View direction="row" gap={3}>
					<Badge rounded color="critical" size="small">
						2
					</Badge>
					<Badge rounded color="critical">
						2
					</Badge>
					<Badge rounded color="critical" size="large">
						2
					</Badge>
				</View>
			</Example.Item>
		</Example>
	),
};

export const empty = {
	name: "empty",
	render: () => (
		<Example>
			<Example.Item title="empty, not rounded, all sizes, color: critical">
				<View direction="row" gap={3}>
					<Badge size="small" color="critical" />
					<Badge color="critical" />
					<Badge size="large" color="critical" />
				</View>
			</Example.Item>
			<Example.Item title="empty, rounded, all sizes, color: critical">
				<View direction="row" gap={3}>
					<Badge rounded size="small" color="critical" />
					<Badge rounded color="critical" />
					<Badge rounded size="large" color="critical" />
				</View>
			</Example.Item>
			<Example.Item title="empty, rounded, all sizes, color: neutral">
				<View direction="row" gap={3}>
					<Badge rounded size="small" color="neutral" />
					<Badge rounded />
					<Badge rounded size="large" />
				</View>
			</Example.Item>
		</Example>
	),
};

export const highlighted = {
	name: "highlighted",
	render: () => (
		<Example>
			<Example.Item title="highlighted, color: neutral">
				<View gap={3} direction="row">
					<Badge highlighted color="primary">
						Badge
					</Badge>
					<Badge highlighted>Badge</Badge>
				</View>
			</Example.Item>
		</Example>
	),
};

export const container = {
	name: "container",
	render: () => {
		const [hidden, setHidden] = React.useState(false);

		return (
			<Example title={<Button onClick={() => setHidden(!hidden)}>Toggle badges</Button>}>
				<Example.Item title="position: top-end">
					<Badge.Container>
						<Badge color="primary" hidden={hidden}>
							5
						</Badge>
						<Avatar initials="A" squared />
					</Badge.Container>
				</Example.Item>

				<Example.Item title="position: bottom-end">
					<Badge.Container position="bottom-end">
						<Badge color="primary" hidden={hidden}>
							5
						</Badge>
						<Avatar initials="A" squared />
					</Badge.Container>
				</Example.Item>

				<Example.Item title="position: top-end, rounded, multiple digits">
					<Badge.Container>
						<Badge size="small" color="primary" rounded hidden={hidden}>
							123
						</Badge>
						<Avatar initials="A" squared />
					</Badge.Container>
				</Example.Item>

				<Example.Item title="position: top-end, rounded, empty">
					<Badge.Container>
						<Badge color="primary" rounded hidden={hidden} />
						<Avatar initials="A" squared />
					</Badge.Container>
				</Example.Item>

				<Example.Item title={["position: top-end, overlap", "should cover the circular avatar"]}>
					<Badge.Container overlap>
						<Badge size="small" color="primary" rounded hidden={hidden}>
							2
						</Badge>
						<Avatar initials="A" />
					</Badge.Container>
				</Example.Item>

				<Example.Item title={["position: bottom-end, overlap", "should cover the circular avatar"]}>
					<Badge.Container overlap position="bottom-end">
						<Badge size="small" color="primary" rounded hidden={hidden}>
							2
						</Badge>
						<Avatar initials="A" />
					</Badge.Container>
				</Example.Item>

				<Example.Item title={["position: top-end, overlap", "should cover the icon"]}>
					<Badge.Container overlap position="top-end">
						<Badge size="small" color="primary" rounded hidden={hidden} />
						<Icon svg={IconCheckmark} size={5} />
					</Badge.Container>
				</Example.Item>
			</Example>
		);
	},
};

export const href: StoryObj = {
	name: "href",
	render: () => (
		<Badge href="https://reshaped.so" dismissAriaLabel="Dismiss">
			Badge
		</Badge>
	),
	play: async ({ canvas }) => {
		const link = canvas.getByRole("link");

		expect(link).toHaveAttribute("href", "https://reshaped.so");
	},
};

export const onClick: StoryObj<{ handleClick: ReturnType<typeof fn> }> = {
	name: "onClick",
	args: {
		handleClick: fn(),
	},
	render: (args) => <Badge onClick={args.handleClick}>Badge</Badge>,
	play: async ({ canvas, args }) => {
		const button = canvas.getAllByRole("button")[0];

		await userEvent.click(button);

		expect(args.handleClick).toHaveBeenCalledTimes(1);
		expect(args.handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: button }));
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Badge color="primary" className="test-classname" attributes={{ id: "test-id" }} />
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};

export const animated = {
	name: "test: animated",
	render: () => {
		const [active, setActive] = React.useState(false);

		return (
			<Badge onClick={() => setActive(!active)} color={active ? "primary" : "neutral"}>
				Badge
			</Badge>
		);
	},
};
