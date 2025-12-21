import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Alert from "components/Alert";
import Link from "components/Link";
import IconZap from "icons/Zap";
import { Example, Placeholder } from "utilities/storybook";

export default {
	title: "Components/Alert",
	component: Alert,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/alert",
		},
	},
};

export const color = {
	name: "color",
	render: () => (
		<Example>
			{(["neutral", "primary", "critical", "positive", "warning"] as const).map((color) => (
				<Example.Item title={`color: ${color}`} key={color}>
					<Alert
						color={color}
						title="Alert title goes here"
						icon={IconZap}
						actionsSlot={
							<>
								<Link
									variant="plain"
									color={color === "neutral" ? "primary" : color}
									onClick={() => {}}
								>
									View now
								</Link>
								<Link
									variant="plain"
									color={color === "neutral" ? "primary" : color}
									onClick={() => {}}
								>
									Dismiss
								</Link>
							</>
						}
					>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard
					</Alert>
				</Example.Item>
			))}
		</Example>
	),
};

export const inline = {
	name: "inline",
	render: () => (
		<Example>
			<Example.Item title="inline: true">
				<Alert
					inline
					title="Alert title goes here"
					icon={IconZap}
					actionsSlot={
						<>
							<Link variant="plain" onClick={() => {}}>
								View now
							</Link>
							<Link variant="plain" onClick={() => {}}>
								Dismiss
							</Link>
						</>
					}
				>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
					been the industry's standard
				</Alert>
			</Example.Item>
		</Example>
	),
};

export const bleed = {
	name: "bleed",
	render: () => (
		<Example>
			<Example.Item title="bleed: 4">
				<Alert bleed={4} icon={IconZap}>
					Content
				</Alert>
			</Example.Item>
			<Example.Item title="bleed: [s] 4, [m+] 0">
				<Alert bleed={{ s: 4, m: 0 }} icon={IconZap}>
					Content
				</Alert>
			</Example.Item>
		</Example>
	),
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Alert className="test-classname" attributes={{ id: "test-id" }}>
				<Placeholder />
			</Alert>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
