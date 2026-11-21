import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, waitFor } from "storybook/test";

import Avatar from "@/components/Avatar";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import View from "@/components/View";
import { Example } from "@/utilities/storybook";
import IconCheckmark from "@/icons/Checkmark";
import IconPlus from "@/icons/Plus";

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
					{/* Test with touch hitbox */}
					<Badge icon={IconPlus} size="small" rounded onClick={() => {}} />
				</View>
			</Example.Item>
			<Example.Item title="size: medium">
				<View gap={3} direction="row">
					<Badge icon={IconPlus}>Badge</Badge>
					<Badge endIcon={IconPlus}>Badge</Badge>
					<Badge icon={IconPlus} />
					<Badge icon={IconPlus} rounded onClick={() => {}} />
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
					<Badge icon={IconPlus} size="large" rounded onClick={() => {}} />
				</View>
			</Example.Item>
		</Example>
	),
};

export const onDismiss: StoryObj = {
	name: "onDismiss, dismissAriaLabel",
	render: () => (
		<Example>
			<Example.Item title="onDismiss">
				<View direction="row" gap={3}>
					<Badge onDismiss={() => {}} dismissAriaLabel="Dismiss" size="small">
						Badge
					</Badge>

					<Badge onDismiss={() => {}} dismissAriaLabel="Dismiss" size="medium">
						Badge
					</Badge>

					<Badge onDismiss={() => {}} dismissAriaLabel="Dismiss" size="large">
						Badge
					</Badge>
				</View>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		const dismissTriggers = canvas.getAllByRole("button", { name: "Dismiss" });

		expect(dismissTriggers).toHaveLength(3);
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

export const cutout: StoryObj = {
	name: "container, cutout",
	render: () => {
		const [hidden, setHidden] = React.useState(false);
		const [count, setCount] = React.useState(5);

		return (
			<Example
				title={
					<View direction="row" gap={2}>
						<Button onClick={() => setHidden(!hidden)}>Toggle badge</Button>
						<Button onClick={() => setCount(count === 5 ? 128 : 5)}>Toggle count</Button>
					</View>
				}
			>
				<Example.Item title="cutout, on a colored background">
					<View backgroundColor="primary-faded" padding={6} align="start">
						<Badge.Container overlap attributes={{ "data-testid": "container" }}>
							<Badge color="primary" rounded hidden={hidden}>
								{count}
							</Badge>
							<Avatar
								src="https://images.unsplash.com/photo-1536880756060-98a6a140f0a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80"
								size={16}
							/>
						</Badge.Container>
					</View>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const container = canvas.getByTestId("container");
		const content = container.lastElementChild as HTMLElement;

		await waitFor(() => {
			expect(container.style.getPropertyValue("--rs-badge-width")).not.toBe("");
		});
		expect(getComputedStyle(content).maskImage).toContain("gradient");
	},
};

export const truncation: StoryObj = {
	name: "test: truncation",
	render: () => (
		<Example>
			<Example.Item title={["truncation", "text is truncated, badge is not wider than 200px"]}>
				<View width="200px" align="start" gap={3} attributes={{ "data-testid": "root" }}>
					<Badge attributes={{ "data-testid": "badge" }}>
						Badge with a very long text that should get truncated
					</Badge>
					<Badge icon={IconPlus} endIcon={IconPlus} attributes={{ "data-testid": "badge" }}>
						Badge with a very long text that should get truncated
					</Badge>
					<Badge
						onDismiss={() => {}}
						dismissAriaLabel="Dismiss"
						attributes={{ "data-testid": "badge" }}
					>
						Badge with a very long text that should get truncated
					</Badge>
				</View>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		const badges = canvas.getAllByTestId("badge");

		badges.forEach((badge) => {
			// Badge is not growing wider than its parent
			expect(badge.getBoundingClientRect().width).toBeLessThanOrEqual(200);

			// Badge text is rendered on a single line and gets clipped
			const text = badge.querySelector("div")!;

			expect(text.scrollWidth).toBeGreaterThan(text.clientWidth);
			expect(getComputedStyle(text).textOverflow).toBe("ellipsis");
		});
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
