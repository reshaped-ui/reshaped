import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, Mock, userEvent, waitFor } from "storybook/test";

import Button from "@/components/Button";
import Expandable from "@/components/Expandable";
import View from "@/components/View";
import { checkTransitions } from "@/utilities/animation";
import { Example, Placeholder } from "@/utilities/storybook";

export default {
	title: "Utility components/Expandable",
	component: Expandable,
};

export const base: StoryObj = {
	name: "orientation",
	render: () => {
		const [active, setActive] = React.useState(false);
		const [activeHorizontal, setActiveHorizontal] = React.useState(false);

		return (
			<Example>
				<Example.Item title="orientation: vertical">
					<View align="start">
						<Button onClick={() => setActive((prev) => !prev)}>Toggle</Button>
					</View>
					<Expandable active={active} attributes={{ "aria-label": "Content" }}>
						<View paddingTop={2}>
							<Placeholder />
						</View>
					</Expandable>
				</Example.Item>

				<Example.Item title="orientation: horizontal">
					<View gap={2} align="start">
						<Button onClick={() => setActiveHorizontal((prev) => !prev)}>Toggle</Button>
						<View direction="row" gap={0} align="center">
							<Expandable
								active={activeHorizontal}
								orientation="horizontal"
								attributes={{ "aria-label": "Content" }}
							>
								<View width="200px" paddingEnd={2}>
									<Placeholder>Horizontal</Placeholder>
								</View>
							</Expandable>
							<Placeholder>Sibling</Placeholder>
						</View>
					</View>
				</Example.Item>
			</Example>
		);
	},
};

export const onAfterClose: StoryObj<{ handleAfterClose: Mock }> = {
	name: "onAfterClose",
	args: {
		handleAfterClose: fn(),
	},
	render: (args) => {
		const [active, setActive] = React.useState(true);

		return (
			<View gap={2} align="start">
				<Button onClick={() => setActive((prev) => !prev)}>Toggle</Button>
				<Expandable
					active={active}
					onAfterClose={args.handleAfterClose}
					attributes={{ "aria-label": "Content" }}
				>
					<Placeholder />
				</Expandable>
			</View>
		);
	},
	play: async ({ canvas, args }) => {
		const { handleAfterClose } = args;
		const trigger = canvas.getByRole("button", { name: "Toggle" });
		const content = canvas.getByRole("region", { hidden: true });

		// Transitions are locked for a frame while the color mode is applied
		await waitFor(() => expect(checkTransitions()).toBe(true));

		expect(handleAfterClose).not.toBeCalled();

		await userEvent.click(trigger);

		// Resolves only once the closing transition is over, not when active changes
		expect(handleAfterClose).not.toBeCalled();
		expect(content).toBeVisible();

		await waitFor(() => expect(handleAfterClose).toBeCalledTimes(1));
		expect(content).not.toBeVisible();

		await userEvent.click(trigger);
		await waitFor(() => expect(content).toBeVisible());
		expect(handleAfterClose).toBeCalledTimes(1);
	},
};
