import { useRTL } from "@reshaped/headless";
import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect } from "storybook/test";

export default {
	title: "Hooks/useRTL",
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

const Component = () => {
	const [rtl, setRTL] = useRTL();

	React.useEffect(() => {
		setRTL(true);
	}, [setRTL]);

	return <div>{rtl ? "RTL" : "LTR"}</div>;
};

export const setRTL: StoryObj = {
	name: "setRTL",
	render: () => <Component />,
	play: async () => {
		expect(document.documentElement).toHaveAttribute("dir", "rtl");
	},
};
