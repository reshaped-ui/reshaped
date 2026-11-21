import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Button from "@/components/Button";
import Card from "@/components/Card";
import MenuItem from "@/components/MenuItem";
import Popover from "@/components/Popover";
import Theme, { useTheme } from "@/components/Theme";
import View from "@/components/View";
import { Example } from "@/utilities/storybook";

export default {
	title: "Utility components/Theme",
	component: Theme,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/theme",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const scoped: StoryObj = {
	name: "scoped",
	render: () => (
		<Example>
			<Example.Item title="scoped, single">
				<Theme name="reshaped">
					<Card attributes={{ "data-testid": "test-id" }}>
						<Button color="primary">Action</Button>
					</Card>
				</Theme>
			</Example.Item>

			<Example.Item title="scoped, multiple">
				<Theme name={["reshaped", "figma"]}>
					<Card attributes={{ "data-testid": "test-id-multi" }}>
						<View direction="row" gap={4}>
							<Button color="primary">Action</Button>

							<Popover>
								<Popover.Trigger>
									{(attributes) => <Button attributes={attributes}>Popover</Button>}
								</Popover.Trigger>
								<Popover.Content>Content</Popover.Content>
							</Popover>
						</View>
					</Card>
				</Theme>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const root = canvas.getByTestId("test-id").parentNode;
		const rootMultiple = canvas.getByTestId("test-id-multi").parentNode;

		expect(root).toHaveAttribute("data-rs-theme", "reshaped");
		expect(root).toHaveAttribute("data-rs-color-mode", "dark");

		expect(rootMultiple).toHaveAttribute("data-rs-theme", " reshaped figma ");
		expect(root).toHaveAttribute("data-rs-color-mode", "dark");
	},
};

export const disabledTransition = {
	name: "disabled transitions",
	render: () => {
		const { invertColorMode } = useTheme();

		return (
			<Example>
				<Example.Item title="should have no transitions while switching color mode">
					<View gap={3}>
						<Button onClick={invertColorMode}>Invert mode</Button>

						<MenuItem selected>Test transition</MenuItem>

						<Card>Default card</Card>

						<Theme colorMode="inverted">
							<Card>Inverted card</Card>
						</Theme>
					</View>
				</Example.Item>
			</Example>
		);
	},
};
