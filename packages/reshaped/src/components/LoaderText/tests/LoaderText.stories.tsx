import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Actionable from "@/components/Actionable";
import LoaderText from "@/components/LoaderText";
import useToggle from "@/hooks/useToggle";
import { Example } from "@/utilities/storybook";
import IconMicrophone from "@/icons/Mic";

export default {
	title: "Components/LoaderText",
	component: LoaderText,
};

export const base = {
	name: "icon, completed",
	render: () => {
		return (
			<Example>
				<Example.Item title="text only">
					<LoaderText>Inspecting code</LoaderText>
				</Example.Item>
				<Example.Item title="with icon">
					<LoaderText icon={IconMicrophone}>Recording audio</LoaderText>
				</Example.Item>
			</Example>
		);
	},
};

export const completed: StoryObj = {
	name: "completed, completedText",
	render: () => {
		const completedToggle = useToggle();

		return (
			<Example>
				<Example.Item title="completed">
					<LoaderText completed>Inspected 5 files</LoaderText>
				</Example.Item>
				<Example.Item title="completed toggle">
					<Actionable onClick={completedToggle.toggle}>
						<LoaderText
							completed={completedToggle.active}
							completedText="Recorded audio"
							icon={IconMicrophone}
						>
							Recording audio
						</LoaderText>
					</Actionable>
				</Example.Item>
			</Example>
		);
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<LoaderText className="test-classname" attributes={{ id: "test-id" }}>
				Loading
			</LoaderText>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
