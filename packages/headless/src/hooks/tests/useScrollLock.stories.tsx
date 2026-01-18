import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, userEvent } from "storybook/test";

import useScrollLock from "../useScrollLock";

export default {
	title: "Headless/Hooks/useScrollLock",
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
				<button onClick={scrollLocked ? unlockScroll : lockScroll}>
					{scrollLocked ? "Unlock" : "Lock"}
				</button>
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
			<div style={{ overflow: "auto", height: 100 }} ref={originRef} data-testid="root">
				<div style={{ height: 200, padding: 15, backgroundColor: "#1f1f1f", borderRadius: 8 }}>
					<button onClick={scrollLocked ? unlockScroll : lockScroll}>Toggle</button>
				</div>
			</div>
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
			<div style={{ overflow: "auto", height: 100 }} ref={containerRef} data-testid="root">
				<button onClick={scrollLocked ? unlockScroll : lockScroll}>Toggle</button>
			</div>
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
			<div style={{ display: "flex", gap: 16, flexDirection: "row" }} ref={containerRef}>
				<button onClick={globalLock.scrollLocked ? globalLock.unlockScroll : globalLock.lockScroll}>
					Toggle
				</button>
				<button onClick={scopedLock.scrollLocked ? scopedLock.unlockScroll : scopedLock.lockScroll}>
					Toggle
				</button>
			</div>
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
