import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, Mock, userEvent } from "storybook/test";

import Button from "components/Button";
import View from "components/View";
import useHandlerRef from "hooks/useHandlerRef";

export default {
	title: "Hooks/useHandlerRef",
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

const Component: React.FC<{ onEffect: () => void; count: number }> = (props) => {
	const { onEffect, count } = props;
	const onEffectRef = useHandlerRef(onEffect);

	React.useEffect(() => {
		onEffectRef.current();
	}, [onEffectRef]);

	return <>Counter: {count}</>;
};

export const base: StoryObj<{ handleEffect: Mock }> = {
	name: "base",
	args: {
		handleEffect: fn(),
	},
	render: (args) => {
		const [count, setCount] = React.useState(0);

		// Creating a new handler on each render
		const handleEffect = () => {
			args.handleEffect(0);
		};

		return (
			<View gap={4}>
				<Button onClick={() => setCount((prev) => prev + 1)}>Increase count</Button>
				<Component onEffect={handleEffect} count={count} />
			</View>
		);
	},
	play: async ({ canvas, args }) => {
		const button = canvas.getAllByRole("button")[0];

		// mount, triggerred twice in dev mode
		expect(args.handleEffect).toHaveBeenCalledTimes(2);

		await userEvent.click(button);

		// Rerendering the component doesn't re-trigger the effect
		expect(args.handleEffect).toHaveBeenCalledTimes(2);
	},
};
