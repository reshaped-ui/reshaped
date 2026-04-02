import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, Mock, userEvent } from "storybook/test";

import useHandlerRef from "../useHandlerRef";

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
			<div style={{ display: "flex", gap: "4px" }}>
				<button onClick={() => setCount((prev) => prev + 1)}>Increase count</button>
				<Component onEffect={handleEffect} count={count} />
			</div>
		);
	},
	play: async ({ canvas, args }) => {
		const button = canvas.getAllByRole("button")[0];

		// mount, triggered twice in dev mode
		expect(args.handleEffect).toHaveBeenCalledTimes(2);

		await userEvent.click(button);

		// Rerendering the component doesn't re-trigger the effect
		expect(args.handleEffect).toHaveBeenCalledTimes(2);
	},
};
