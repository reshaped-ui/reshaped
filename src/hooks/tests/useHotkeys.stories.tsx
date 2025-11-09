import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import View from "components/View";
import useHotkeys from "hooks/useHotkeys";

export default {
	title: "Hooks/useHotkeys",
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

export const base = {
	name: "base",
	render: () => {
		const { checkHotkeyState } = useHotkeys({
			"shift + b + n": () => console.log("pressed"),
			"c + v": () => console.log("c + v"),
			"Meta + k": () => console.log("meta + k"),
			"Meta + f": () => console.log("meta + f"),
			"Meta + v": () => console.log("meta + v"),
			"Meta + b": () => console.log("meta + b"),
			"control + enter": () => console.log("control + enter"),
			"meta + enter": () => console.log("meta + enter"),
			"mod + enter": () => console.log("mod + enter"),
			"mod + ArrowRight": () => console.log("right"),
			"mod + ArrowUp": () => console.log("top"),
			"shift + ArrowRight": () => console.log("right"),
			"shift + ArrowUp": () => console.log("top"),
			"alt+shift+n": () => console.log("alt+shift+n"),
			"shift+alt+n": () => console.log("shift+alt+n"),
			"alt+shiftLeft+n": () => console.log("alt+shiftLeft+n"),
		});
		const active = checkHotkeyState("shift + b + n");
		const shiftActive = checkHotkeyState("shift");
		const bActive = checkHotkeyState("b");
		const nActive = checkHotkeyState("n");

		return (
			<View
				animated
				gap={2}
				direction="row"
				backgroundColor={active ? "positive-faded" : undefined}
				padding={2}
				borderRadius="small"
			>
				<View
					paddingInline={4}
					paddingBlock={2}
					borderRadius="small"
					borderColor="neutral-faded"
					animated
					backgroundColor={shiftActive ? "neutral-faded" : "elevation-raised"}
					shadow={shiftActive ? undefined : "raised"}
				>
					Shift
				</View>
				<View
					paddingInline={4}
					paddingBlock={2}
					borderRadius="small"
					borderColor="neutral-faded"
					animated
					backgroundColor={bActive ? "neutral-faded" : "elevation-raised"}
					shadow={bActive ? undefined : "raised"}
				>
					b
				</View>
				<View
					paddingInline={4}
					paddingBlock={2}
					borderRadius="small"
					borderColor="neutral-faded"
					animated
					backgroundColor={nActive ? "neutral-faded" : "elevation-raised"}
					shadow={nActive ? undefined : "raised"}
				>
					n
				</View>
			</View>
		);
	},
};

const Component: React.FC<{ hotkeys: Record<string, (() => void) | null> }> = (props) => {
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
