import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Progress from "components/Progress";

export default {
	title: "Components/Progress/tests",
	component: Progress,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/progress",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const render: StoryObj = {
	name: "rendering",
	render: () => <Progress value={75} min={50} max={100} ariaLabel="progress" />,
	play: async ({ canvas }) => {
		const el = canvas.getByRole("progressbar");

		expect(el).toBeInTheDocument();
		expect(el).toHaveAttribute("aria-valuenow", "75");
		expect(el).toHaveAttribute("aria-valuemin", "50");
		expect(el).toHaveAttribute("aria-valuemax", "100");
		expect(el).toHaveAccessibleName("progress");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Progress className="test-classname" attributes={{ id: "test-id" }} ariaLabel="progress" />
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
