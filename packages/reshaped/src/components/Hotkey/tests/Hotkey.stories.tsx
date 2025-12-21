import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import TextField from "components/TextField";
import View from "components/View";
import useHotkeys from "hooks/useHotkeys";
import { Example } from "utilities/storybook";

import Hotkey from "../Hotkey";

export default {
	title: "Components/Hotkey",
	component: Hotkey,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/hotkey",
		},
	},
};

const Demo = () => {
	const { checkHotkeyState } = useHotkeys({
		"Meta+v": () => {
			console.log("meta v");
		},
		"Mod+v": () => {
			console.log("mod v");
		},
	});

	return <Hotkey active={checkHotkeyState("k")}>⌘K</Hotkey>;
};

export const base = () => (
	<Example>
		<Example.Item title="Base">
			<Demo />
		</Example.Item>
		<Example.Item title="Active">
			<Hotkey active>⌘K</Hotkey>
		</Example.Item>
		<Example.Item title="Inside input slot">
			<View width="300px">
				<TextField
					name="hey"
					endSlot={<Demo />}
					inputAttributes={{ "aria-label": "hotkey test" }}
				/>
			</View>
		</Example.Item>
	</Example>
);

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Hotkey className="test-classname" attributes={{ id: "test-id" }}>
				⌘K
			</Hotkey>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild as HTMLElement;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
		expect(root?.tagName).toBe("KBD");
	},
};
