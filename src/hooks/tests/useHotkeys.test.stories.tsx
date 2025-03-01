import { StoryObj } from "@storybook/react";
import { expect, fn, userEvent } from "@storybook/test";
import useHotkeys from "hooks/useHotkeys";

export default {
	title: "Hooks/useHotkeys/tests",
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

const Component = (props: { hotkeys: Record<string, (() => void) | null> }) => {
	const { hotkeys } = props;
	useHotkeys(hotkeys);

	return <div />;
};

export const singleKey: StoryObj<{ handleHotkey: ReturnType<typeof fn> }> = {
	name: "single key",
	args: {
		handleHotkey: fn(),
	},
	render: (args) => <Component hotkeys={{ a: args.handleHotkey }} />,
	play: async ({ args }) => {
		await userEvent.keyboard("a");
		await userEvent.keyboard("b");

		expect(args.handleHotkey).toHaveBeenCalledTimes(1);
	},
};

export const modKey: StoryObj<{ handleHotkey: ReturnType<typeof fn> }> = {
	name: "mod key",
	args: {
		handleHotkey: fn(),
	},
	render: (args) => <Component hotkeys={{ mod: args.handleHotkey }} />,
	play: async ({ args }) => {
		await userEvent.keyboard("{Meta/}");

		expect(args.handleHotkey).toHaveBeenCalledTimes(1);
	},
};

export const modKeyHold: StoryObj<{ handleHotkey: ReturnType<typeof fn> }> = {
	name: "mod key on hold",
	args: {
		handleHotkey: fn(),
	},
	render: (args) => <Component hotkeys={{ "Meta + b": args.handleHotkey }} />,
	play: async ({ args }) => {
		await userEvent.keyboard("{Meta>}bb{/Meta}");
		expect(args.handleHotkey).toHaveBeenCalledTimes(2);
	},
};

export const keyList: StoryObj<{ handleHotkey: ReturnType<typeof fn> }> = {
	name: "key list",
	args: {
		handleHotkey: fn(),
	},
	render: (args) => <Component hotkeys={{ "a,b": args.handleHotkey }} />,
	play: async ({ args }) => {
		await userEvent.keyboard("a");
		expect(args.handleHotkey).toHaveBeenCalledTimes(1);

		await userEvent.keyboard("b");
		expect(args.handleHotkey).toHaveBeenCalledTimes(2);
	},
};

export const keyCombination: StoryObj<{ handleHotkey: ReturnType<typeof fn> }> = {
	name: "key combination",
	args: {
		handleHotkey: fn(),
	},
	render: (args) => <Component hotkeys={{ "a+b": args.handleHotkey }} />,
	play: async ({ args }) => {
		await userEvent.keyboard("{a>}b{/a}");

		expect(args.handleHotkey).toHaveBeenCalledTimes(1);
	},
};

export const keyCombinationFormat: StoryObj<{ handleHotkey: ReturnType<typeof fn> }> = {
	name: "key combination without formatting",
	args: {
		handleHotkey: fn(),
	},
	render: (args) => <Component hotkeys={{ "A  + b": args.handleHotkey }} />,
	play: async ({ args }) => {
		await userEvent.keyboard("{a>}b{/a}");

		expect(args.handleHotkey).toHaveBeenCalledTimes(1);
	},
};

export const keyCombinationOrder: StoryObj<{ handleHotkey: ReturnType<typeof fn> }> = {
	name: "key combination without order",
	args: {
		handleHotkey: fn(),
	},
	render: (args) => <Component hotkeys={{ "b+a": args.handleHotkey }} />,
	play: async ({ args }) => {
		await userEvent.keyboard("{a>}b{/a}");

		expect(args.handleHotkey).toHaveBeenCalledTimes(1);
	},
};

export const keyCombinationMoreThanRequired: StoryObj<{ handleHotkey: ReturnType<typeof fn> }> = {
	name: "key combination, more keys pressed",
	args: {
		handleHotkey: fn(),
	},
	render: (args) => <Component hotkeys={{ "z + x": args.handleHotkey }} />,
	play: async ({ args }) => {
		await userEvent.keyboard("{z>}{x>}c{/x}{/z}");
		// When c is pressed, it doesn't trigger a+b for the second time

		expect(args.handleHotkey).toHaveBeenCalledTimes(1);
	},
};

export const optionModified: StoryObj<{
	handleHotkey: ReturnType<typeof fn>;
	handleHotkeyModified: ReturnType<typeof fn>;
}> = {
	name: "modified with alt/option",
	args: {
		handleHotkey: fn(),
		handleHotkeyModified: fn(),
	},
	render: (args) => (
		<Component hotkeys={{ "alt+n": args.handleHotkeyModified, "alt+shift": args.handleHotkey }} />
	),
	play: async ({ args }) => {
		await userEvent.keyboard("{Alt>}n{/Alt}");
		expect(args.handleHotkeyModified).toHaveBeenCalledTimes(1);

		await userEvent.keyboard("{Alt>}{Shift}{/Alt}");
		expect(args.handleHotkey).toHaveBeenCalledTimes(1);
	},
};
