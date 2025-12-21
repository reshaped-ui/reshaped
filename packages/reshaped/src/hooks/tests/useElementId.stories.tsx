import { StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";

import useElementId from "hooks/useElementId";

export default {
	title: "Hooks/useElementId",
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

const Component: React.FC<{ id?: string }> = (props) => {
	const id = useElementId(props.id);

	return <div id={id}>{id}</div>;
};

export const id: StoryObj = {
	name: "passed id",
	render: () => {
		return <Component id="hey" />;
	},
	play: async () => {
		waitFor(() => {
			expect(document.querySelector("#hey")).toBeTruthy();
		});
	},
};
