import React, { useEffect, useRef, useState } from "react";
import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import useRTL from "hooks/useRTL";
import View from "components/View";
import Button from "components/Button";
import useKeyboardArrowNavigation from "hooks/useKeyboardArrowNavigation";

export default {
	title: "Hooks/useKeyboardArrowNavigation",
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

const Foo = () => {
	const ref = useRef<HTMLDivElement>(null);

	useKeyboardArrowNavigation({ ref });

	return (
		<View gap={2} direction="row" attributes={{ ref }}>
			<Button onClick={() => {}}>Action 1</Button>
			<Button onClick={() => {}}>Action 2</Button>
			<Button onClick={() => {}}>Action 3</Button>
		</View>
	);
};

export const base: StoryObj = {
	name: "base",
	render: () => {
		const ref = useRef<HTMLDivElement>(null);

		useKeyboardArrowNavigation({ ref });

		return (
			<View gap={2} direction="row" attributes={{ ref }}>
				<Button onClick={() => {}}>Action 1</Button>
				<Button onClick={() => {}}>Action 2</Button>
				<Button onClick={() => {}}>Action 3</Button>
			</View>
		);
	},
	play: async () => {
		expect(document.documentElement).toHaveAttribute("dir", "rtl");
	},
};
