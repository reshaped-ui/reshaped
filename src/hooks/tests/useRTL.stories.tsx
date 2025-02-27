import React from "react";
import { StoryObj } from "@storybook/react";
import { expect, waitFor } from "@storybook/test";
import Reshaped from "components/Reshaped";
import useRTL from "hooks/useRTL";

export default { title: "Hooks/useRTL" };

const Component = () => {
	const [rtl, setRTL] = useRTL();

	React.useEffect(() => {
		setRTL(true);
	}, [setRTL]);

	return <div>{rtl ? "RTL" : "LTR"}</div>;
};

export const setRTL: StoryObj = {
	name: "setRTL",
	render: () => {
		return (
			<Reshaped theme="reshaped">
				<Component />
			</Reshaped>
		);
	},
	play: async () => {
		waitFor(() => {
			expect(document.documentElement).toHaveAttribute("dir", "rtl");
		});
	},
};
