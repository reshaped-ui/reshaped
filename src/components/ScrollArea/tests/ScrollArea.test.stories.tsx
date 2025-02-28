import React from "react";
import { StoryObj } from "@storybook/react";
import { expect, fn, userEvent, waitFor } from "@storybook/test";
import Button from "components/Button";
import ScrollArea from "components/ScrollArea";
import View from "components/View";

export default {
	title: "Utilities/ScrollArea/tests",
	component: ScrollArea,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/text",
		},
		// Skip because axe core incorrectly reports contrast issues
		a11y: {
			disable: true,
		},
		chromatic: { disableSnapshot: true },
	},
};

export const onScroll: StoryObj<{ handleScroll: ReturnType<typeof fn> }> = {
	name: "ref, onScroll",
	args: {
		handleScroll: fn(),
	},
	render: (args) => {
		const ref = React.useRef<HTMLDivElement>(null);

		return (
			<View gap={4}>
				<View.Item>
					<Button onClick={() => ref.current?.scrollBy({ top: 50, left: 50 })}>Scroll</Button>
				</View.Item>
				<ScrollArea
					height="100px"
					ref={ref}
					scrollbarDisplay="visible"
					onScroll={args.handleScroll}
				>
					<View backgroundColor="neutral-faded" padding={4} width="1000px" height="200px">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard dummy text ever since the 1500s, when an unknown
						printer took a galley of type and scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
						publishing software like Aldus PageMaker including versions of Lorem Ipsum.
					</View>
				</ScrollArea>
			</View>
		);
	},
	play: async ({ canvas, args }) => {
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);

		await waitFor(() => {
			expect(args.handleScroll).toHaveBeenCalledTimes(1);
			// x value is flaky, so only testing y here
			expect(args.handleScroll).toHaveBeenCalledWith(expect.objectContaining({ y: 0.5 }));
		});
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<ScrollArea className="test-classname" attributes={{ id: "test-id" }}>
				Content
			</ScrollArea>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
