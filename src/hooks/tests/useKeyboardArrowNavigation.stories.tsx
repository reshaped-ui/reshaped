import { StoryObj } from "@storybook/react-vite";
import { useRef } from "react";
import { expect, userEvent } from "storybook/test";

import Button from "components/Button";
import View from "components/View";
import useKeyboardArrowNavigation from "hooks/useKeyboardArrowNavigation";

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
			<View gap={2} direction="row" attributes={{ ref }}>
				<Button onClick={() => {}}>Action 1</Button>
				<Button onClick={() => {}}>Action 2</Button>
				<Button onClick={() => {}}>Action 3</Button>
			</View>
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
			<View gap={2} direction="row" attributes={{ ref }}>
				<Button onClick={() => {}}>Action 1</Button>
				<Button onClick={() => {}}>Action 2</Button>
				<Button onClick={() => {}}>Action 3</Button>
			</View>
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
			<View gap={2} direction="column" attributes={{ ref }}>
				<Button onClick={() => {}}>Action 1</Button>
				<Button onClick={() => {}}>Action 2</Button>
				<Button onClick={() => {}}>Action 3</Button>
			</View>
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
			<View gap={2} direction="row" attributes={{ ref }}>
				<Button onClick={() => {}}>Action 1</Button>
				<Button onClick={() => {}}>Action 2</Button>
				<Button onClick={() => {}}>Action 3</Button>
			</View>
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
			<View gap={2} direction="row" attributes={{ ref }}>
				<Button onClick={() => {}}>Action 1</Button>
				<Button onClick={() => {}}>Action 2</Button>
				<Button onClick={() => {}}>Action 3</Button>
			</View>
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
