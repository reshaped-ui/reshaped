import { StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";

import useVirtualKeyboard from "../useVirtualKeyboard";

export default {
	title: "Hooks/useVirtualKeyboard",
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

export const height: StoryObj = {
	name: "height",
	render: () => {
		const { height } = useVirtualKeyboard();

		return <div data-testid="root">{height}</div>;
	},
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root");
		const viewport = window.visualViewport!;

		expect(root).toHaveTextContent("0");

		// On-screen keyboard shrinks the visual viewport without changing the layout
		Object.defineProperty(viewport, "height", {
			configurable: true,
			value: window.innerHeight - 300,
		});
		viewport.dispatchEvent(new Event("resize"));

		await waitFor(() => expect(root).toHaveTextContent("300"));

		// @ts-expect-error Removes the stubbed value from the viewport itself
		delete viewport.height;
		viewport.dispatchEvent(new Event("resize"));

		await waitFor(() => expect(root).toHaveTextContent("0"));
	},
};
