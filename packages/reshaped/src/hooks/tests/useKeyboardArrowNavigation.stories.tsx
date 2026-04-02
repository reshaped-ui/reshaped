import { StoryObj } from "@storybook/react-vite";
import { useRef } from "react";
import { expect, userEvent } from "storybook/test";

import useKeyboardArrowNavigation from "../useKeyboardArrowNavigation";

export default {
	title: "Hooks/useKeyboardArrowNavigation",
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

export const base: StoryObj = {
	name: "base",
	render: () => {
		const ref = useRef<HTMLDivElement>(null);

		useKeyboardArrowNavigation({ ref });

		return (
			<div style={{ display: "flex", gap: 8, flexDirection: "row" }} ref={ref}>
				<button onClick={() => {}}>Action 1</button>
				<button onClick={() => {}}>Action 2</button>
				<button onClick={() => {}}>Action 3</button>
			</div>
		);
	},
	play: async ({ canvas }) => {
		const buttons = canvas.getAllByRole("button");

		buttons[0].focus();

		await userEvent.keyboard("{ArrowRight/}");

		expect(document.activeElement).toBe(buttons[1]);

		await userEvent.keyboard("{ArrowDown/}");
		expect(document.activeElement).toBe(buttons[2]);

		await userEvent.keyboard("{ArrowUp/}");
		expect(document.activeElement).toBe(buttons[1]);

		await userEvent.keyboard("{ArrowLeft/}");
		expect(document.activeElement).toBe(buttons[0]);
	},
};

export const horizontal: StoryObj = {
	name: "orientation: horizontal",
	render: () => {
		const ref = useRef<HTMLDivElement>(null);

		useKeyboardArrowNavigation({ ref, orientation: "horizontal" });

		return (
			<div style={{ display: "flex", gap: 8, flexDirection: "row" }} ref={ref}>
				<button onClick={() => {}}>Action 1</button>
				<button onClick={() => {}}>Action 2</button>
				<button onClick={() => {}}>Action 3</button>
			</div>
		);
	},
	play: async ({ canvas }) => {
		const buttons = canvas.getAllByRole("button");

		expect(buttons[0]).toHaveAttribute("tabindex", "0");
		expect(buttons[1]).toHaveAttribute("tabindex", "-1");
		expect(buttons[2]).toHaveAttribute("tabindex", "-1");

		buttons[0].focus();

		await userEvent.keyboard("{ArrowRight/}");

		expect(document.activeElement).toBe(buttons[1]);

		await userEvent.keyboard("{ArrowLeft/}");
		expect(document.activeElement).toBe(buttons[0]);

		await userEvent.keyboard("{ArrowDown/}");
		expect(document.activeElement).toBe(buttons[0]);

		await userEvent.keyboard("{ArrowUp/}");
		expect(document.activeElement).toBe(buttons[0]);
	},
};

export const vertical: StoryObj = {
	name: "orientation: vertical",
	render: () => {
		const ref = useRef<HTMLDivElement>(null);

		useKeyboardArrowNavigation({ ref, orientation: "vertical" });

		return (
			<div style={{ display: "flex", gap: 8, flexDirection: "column" }} ref={ref}>
				<button onClick={() => {}}>Action 1</button>
				<button onClick={() => {}}>Action 2</button>
				<button onClick={() => {}}>Action 3</button>
			</div>
		);
	},
	play: async ({ canvas }) => {
		const buttons = canvas.getAllByRole("button");

		buttons[0].focus();

		await userEvent.keyboard("{ArrowDown/}");

		expect(document.activeElement).toBe(buttons[1]);

		await userEvent.keyboard("{ArrowUp/}");
		expect(document.activeElement).toBe(buttons[0]);

		await userEvent.keyboard("{ArrowRight/}");
		expect(document.activeElement).toBe(buttons[0]);

		await userEvent.keyboard("{ArrowLeft/}");
		expect(document.activeElement).toBe(buttons[0]);
	},
};

export const circular: StoryObj = {
	name: "circular",
	render: () => {
		const ref = useRef<HTMLDivElement>(null);

		useKeyboardArrowNavigation({ ref, circular: true });

		return (
			<div style={{ display: "flex", gap: 8, flexDirection: "row" }} ref={ref}>
				<button onClick={() => {}}>Action 1</button>
				<button onClick={() => {}}>Action 2</button>
				<button onClick={() => {}}>Action 3</button>
			</div>
		);
	},
	play: async ({ canvas }) => {
		const buttons = canvas.getAllByRole("button");

		buttons[0].focus();

		await userEvent.keyboard("{ArrowRight/}");
		await userEvent.keyboard("{ArrowRight/}");
		expect(document.activeElement).toBe(buttons[2]);

		await userEvent.keyboard("{ArrowRight/}");
		expect(document.activeElement).toBe(buttons[0]);

		await userEvent.keyboard("{ArrowLeft/}");
		expect(document.activeElement).toBe(buttons[2]);
	},
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => {
		const ref = useRef<HTMLDivElement>(null);

		useKeyboardArrowNavigation({ ref, disabled: true });

		return (
			<div style={{ display: "flex", gap: 8, flexDirection: "row" }} ref={ref}>
				<button onClick={() => {}}>Action 1</button>
				<button onClick={() => {}}>Action 2</button>
				<button onClick={() => {}}>Action 3</button>
			</div>
		);
	},
	play: async ({ canvas }) => {
		const buttons = canvas.getAllByRole("button");

		buttons[0].focus();

		await userEvent.keyboard("{ArrowRight/}");
		expect(document.activeElement).toBe(buttons[0]);
		expect(buttons[0]).not.toHaveAttribute("tabindex");
	},
};
