import { StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { Example, Placeholder } from "utilities/storybook";
import Dismissible from "components/Dismissible";
import Image from "components/Image";
import View from "components/View";

export default {
	title: "Utilities/Dismissible",
	components: Dismissible,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/dismissible",
		},
	},
};

export const variant = {
	name: "variant",
	render: () => (
		<Example>
			<Example.Item title="variant: default">
				<Dismissible closeAriaLabel="Close banner" onClose={() => {}}>
					<Placeholder />
				</Dismissible>
			</Example.Item>
			<Example.Item title="variant: media">
				<View width="300px">
					<Dismissible variant="media" closeAriaLabel="Close banner" onClose={() => {}}>
						<View aspectRatio={16 / 9}>
							<Image
								height="100%"
								src="https://images.unsplash.com/photo-1607030529528-ca6923e27f77?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80)"
							/>
						</View>
					</Dismissible>
				</View>
			</Example.Item>
		</Example>
	),
};

export const align = {
	name: "align",
	render: () => (
		<Example>
			<Example.Item title="align: center">
				<Dismissible align="center" closeAriaLabel="Close" onClose={() => {}}>
					<Placeholder />
				</Dismissible>
			</Example.Item>

			<Example.Item title="align: center, variant: media">
				<Dismissible align="center" closeAriaLabel="Close" variant="media" onClose={() => {}}>
					<View aspectRatio={16 / 9}>
						<Image
							height="100%"
							src="https://images.unsplash.com/photo-1607030529528-ca6923e27f77?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80)"
						/>
					</View>
				</Dismissible>
			</Example.Item>
		</Example>
	),
};

export const hideCloseButton: StoryObj = {
	name: "hideCloseButton",
	render: () => (
		<Example>
			<Example.Item title="hide close button">
				<div id="root">
					<Dismissible hideCloseButton>
						<Placeholder />
					</Dismissible>
				</div>
			</Example.Item>
		</Example>
	),
	play: ({ canvasElement }) => {
		const root = within(canvasElement.querySelector("#root")!);
		const button = root.queryByRole("button");

		expect(button).not.toBeInTheDocument();
	},
};
