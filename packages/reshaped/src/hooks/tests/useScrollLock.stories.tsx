import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, userEvent } from "storybook/test";

import Button from "components/Button";
import View from "components/View";
import useScrollLock from "hooks/useScrollLock";
import { Example } from "utilities/storybook";

export default {
	title: "Hooks/useScrollLock",
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

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

export const origin: StoryObj = {
	name: "originRef",
	render: () => {
		const originRef = React.useRef<HTMLDivElement>(null);
		const { lockScroll, unlockScroll, scrollLocked } = useScrollLock({ originRef });

		return (
			<View overflow="auto" height={25} attributes={{ ref: originRef, "data-testid": "root" }}>
				<View height={50} padding={4} backgroundColor="neutral-faded" borderRadius="medium">
					<Button onClick={scrollLocked ? unlockScroll : lockScroll}>Toggle</Button>
				</View>
			</View>
		);
	},
	play: async ({ canvas }) => {
		const button = canvas.getAllByRole("button")[0];
		const root = canvas.getByTestId("root");

		await userEvent.click(button);

		expect(document.body).not.toHaveStyle("overflow: hidden");
		expect(root).toHaveStyle("overflow: hidden");

		await userEvent.click(button);

		expect(root).not.toHaveStyle("overflow: hidden");
	},
};

export const container: StoryObj = {
	name: "containerRef",
	render: () => {
		const containerRef = React.useRef<HTMLDivElement>(null);
		const { lockScroll, unlockScroll, scrollLocked } = useScrollLock({ containerRef });

		return (
			<View height={25} attributes={{ ref: containerRef, "data-testid": "root" }}>
				<Button onClick={scrollLocked ? unlockScroll : lockScroll}>Toggle</Button>
			</View>
		);
	},
	play: async ({ canvas }) => {
		const button = canvas.getAllByRole("button")[0];
		const root = canvas.getByTestId("root");

		await userEvent.click(button);

		expect(document.body).not.toHaveStyle("overflow: hidden");
		expect(root).toHaveStyle("overflow: hidden");

		await userEvent.click(button);

		expect(root).not.toHaveStyle("overflow: hidden");
	},
};

export const testContainerAsync: StoryObj = {
	name: "test: containerRef locked count",
	render: () => {
		const containerRef = React.useRef<HTMLDivElement>(null);
		const globalLock = useScrollLock();
		const scopedLock = useScrollLock({ containerRef });

		return (
			<Example>
				<Example.Item title="calling regular lock and lock with a container only requires a single unlock to remove overflow">
					<View attributes={{ ref: containerRef }} gap={4} direction="row">
						<Button
							onClick={globalLock.scrollLocked ? globalLock.unlockScroll : globalLock.lockScroll}
						>
							Toggle
						</Button>
						<Button
							onClick={scopedLock.scrollLocked ? scopedLock.unlockScroll : scopedLock.lockScroll}
						>
							Toggle
						</Button>
					</View>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const [buttonGlobal, buttonScoped] = canvas.getAllByRole("button");

		await userEvent.click(buttonGlobal);
		expect(document.body).toHaveStyle("overflow: hidden");

		await userEvent.click(buttonScoped);
		await userEvent.click(buttonGlobal);

		expect(document.body).not.toHaveStyle("overflow: hidden");
	},
};
