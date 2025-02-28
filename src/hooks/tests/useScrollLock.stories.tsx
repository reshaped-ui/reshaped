import React from "react";
import { StoryObj } from "@storybook/react";
import { expect, userEvent } from "@storybook/test";
import Button from "components/Button";
import useScrollLock from "hooks/useScrollLock";

export default { title: "Hooks/useScrollLock" };

export const base: StoryObj = {
	name: "base",
	render: () => {
		const { lockScroll, unlockScroll, scrollLocked } = useScrollLock();

		return (
			<React.Fragment>
				<Button onClick={scrollLocked ? unlockScroll : lockScroll}>Toggle</Button>
				<div style={{ height: "150vh" }} />
			</React.Fragment>
		);
	},
	play: async ({ canvas }) => {
		const button = canvas.getAllByRole("button")[0];

		await userEvent.click(button);

		expect(document.body).toHaveStyle("overflow: hidden");

		await userEvent.click(button);

		expect(document.body).not.toHaveStyle("overflow: hidden");
	},
};
