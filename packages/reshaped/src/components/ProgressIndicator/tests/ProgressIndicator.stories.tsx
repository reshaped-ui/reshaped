import { StoryObj } from "@storybook/react-vite";
import React from "react";

import Button from "@/components/Button";
import ProgressIndicator from "@/components/ProgressIndicator";
import Text from "@/components/Text";
import View from "@/components/View";
import { Example } from "@/utilities/storybook";

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

						<View
							borderRadius="medium"
							overflow="hidden"
							width="300px"
							backgroundColor="black"
							height="200px"
						>
							<View
								position="absolute"
								insetBottom={4}
								insetStart={4}
								insetEnd={4}
								align="center"
								justify="center"
							>
								<ProgressIndicator total={total} activeIndex={activeIndex} color="media" />
							</View>
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
					<View
						borderRadius="medium"
						overflow="hidden"
						width="300px"
						backgroundColor="black"
						height="200px"
					>
						<View
							position="absolute"
							insetBottom={4}
							insetStart={4}
							insetEnd={4}
							align="center"
							justify="center"
						>
							<ProgressIndicator total={10} activeIndex={5} color="media" />
						</View>
					</View>
				</Example.Item>
			</Example>
		);
	},
};
