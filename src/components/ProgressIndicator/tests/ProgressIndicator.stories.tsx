import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect } from "storybook/test";

import Button from "components/Button";
import ProgressIndicator from "components/ProgressIndicator";
import Scrim from "components/Scrim";
import Text from "components/Text";
import View from "components/View";
import { Example } from "utilities/storybook";

export default {
	title: "Components/ProgressIndicator",
	component: ProgressIndicator,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/progress-indicator",
		},
	},
};

export const base: StoryObj = {
	name: "base",
	render: () => {
		const [activeIndex, setActiveIndex] = React.useState(0);
		const total = 10;

		return (
			<Example>
				<Example.Item title="base">
					<View gap={4}>
						<View direction="row" gap={2} align="center">
							<Button
								onClick={() => {
									setActiveIndex((prev) => Math.max(0, prev - 1));
								}}
							>
								Previous
							</Button>
							<Button
								onClick={() => {
									setActiveIndex((prev) => Math.min(total - 1, prev + 1));
								}}
							>
								Next
							</Button>
							<Text weight="medium">Index: {activeIndex}</Text>
						</View>

						<View borderRadius="medium" overflow="hidden" width="300px">
							<Scrim
								position="bottom"
								backgroundSlot={<View aspectRatio={16 / 9} backgroundColor="neutral-faded" />}
							>
								<View align="center">
									<ProgressIndicator total={total} activeIndex={activeIndex} color="media" />
								</View>
							</Scrim>
						</View>
					</View>
				</Example.Item>
			</Example>
		);
	},
};

export const color = {
	name: "color",
	render: () => {
		return (
			<Example>
				<Example.Item title="color: primary">
					<ProgressIndicator total={10} activeIndex={5} color="primary" />
				</Example.Item>
				<Example.Item title="color: media">
					<View borderRadius="medium" overflow="hidden" width="300px">
						<Scrim
							position="bottom"
							backgroundSlot={<View aspectRatio={16 / 9} backgroundColor="neutral-faded" />}
						>
							<View align="center">
								<ProgressIndicator total={10} activeIndex={5} color="media" />
							</View>
						</Scrim>
					</View>
				</Example.Item>
			</Example>
		);
	},
};

export const ariaLabel: StoryObj = {
	name: "ariaLabel",
	render: () => <ProgressIndicator total={10} className="test-classname" ariaLabel="Progress" />,
	play: async ({ canvas }) => {
		const progress = canvas.getByRole("progressbar");

		expect(progress).toHaveAttribute("aria-valuenow", "0");
		expect(progress).toHaveAttribute("aria-valuemin", "0");
		expect(progress).toHaveAttribute("aria-valuemax", "9");
		expect(progress).toHaveAccessibleName("Progress");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<ProgressIndicator total={10} className="test-classname" attributes={{ id: "test-id" }} />
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
