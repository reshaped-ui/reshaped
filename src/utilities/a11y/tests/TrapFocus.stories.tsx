import React from "react";
import { Example } from "utilities/storybook";
import TrapFocus from "../TrapFocus";
import Button from "components/Button";
import useToggle from "hooks/useToggle";
import View from "components/View";
import TextField from "components/TextField";
import RadioGroup from "components/RadioGroup";
import Radio from "components/Radio";
import * as keys from "constants/keys";

export default {
	title: "Internal/TrapFocus",
};

const Editor = () => {
	const pressedCountRef = React.useRef(1);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key !== keys.TAB) return;

		if (pressedCountRef.current % 5) e.preventDefault();
		pressedCountRef.current += 1;
	};

	return (
		<View
			backgroundColor="neutral-faded"
			borderColor="neutral-faded"
			borderRadius="medium"
			padding={4}
			attributes={{ contentEditable: true, onKeyDown: handleKeyDown }}
		/>
	);
};

const Demo = () => {
	const rootRef = React.useRef<HTMLDivElement>(null);
	const trapToggle = useToggle();

	React.useEffect(() => {
		if (!trapToggle.active) return;
		if (!rootRef.current) return;

		const trapFocus = new TrapFocus(rootRef.current);

		trapFocus.trap();
		return () => trapFocus.release();
	}, [trapToggle.active]);

	return (
		<View gap={4}>
			<Button onClick={trapToggle.activate}>Activate</Button>
			{trapToggle.active && (
				<View
					backgroundColor="neutral-faded"
					borderRadius="medium"
					padding={4}
					gap={4}
					attributes={{ ref: rootRef }}
				>
					<Button onClick={() => {}}>Button</Button>
					<Button href="#">Link</Button>
					<TextField name="input" placeholder="Input" />
					<RadioGroup name="radio">
						<Radio value="1">Option 1</Radio>
						<Radio value="2">Option 1</Radio>
					</RadioGroup>
					<Editor />
					<Button onClick={trapToggle.deactivate} attributes={{ tabIndex: -1 }}>
						Excluded
					</Button>
					<Button onClick={trapToggle.deactivate}>Deactivate</Button>
				</View>
			)}
		</View>
	);
};

export const base = () => (
	<Example>
		<Example.Item title="Default">
			<Demo />
		</Example.Item>
	</Example>
);
