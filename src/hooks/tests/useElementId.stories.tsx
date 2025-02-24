import React from "react";
import { StoryObj } from "@storybook/react";
import { expect, waitFor } from "@storybook/test";
import Reshaped from "components/Reshaped";
import useElementId from "hooks/useElementId";

export default { title: "Hooks/useElementId" };

const Component = (props: { id?: string }) => {
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
