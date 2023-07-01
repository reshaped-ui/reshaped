import React from "react";
import { Example } from "utilities/storybook";
import useHotkeys from "hooks/useHotkeys";
import View from "components/View";
import TextField from "components/TextField";
import Hotkey from "../Hotkey";

export default { title: "Components/Hotkey" };

const Demo = () => {
	const { checkHotkeyState } = useHotkeys({
		"Meta+k": () => {},
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
