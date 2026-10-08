import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import Freeze from "@/components/_private/Freeze";
import Button from "@/components/Button";
import View from "@/components/View";

export default { title: "Internal/Freeze" };

const ValueContext = React.createContext(0);

const ContextValue = () => {
	const value = React.useContext(ValueContext);

	return <div data-testid="context-value">Context: {value}</div>;
};

const Demo = (props: { transition?: boolean }) => {
	const [frozen, setFrozen] = React.useState(false);
	const [value, setValue] = React.useState(0);

	const update = (nextFrozen: boolean) => {
		const apply = () => {
			setFrozen(nextFrozen);
			setValue((prev) => prev + 1);
		};

		if (props.transition) {
			React.startTransition(apply);
		} else {
			apply();
		}
	};

	return (
		<View gap={4}>
			<View direction="row" gap={2}>
				<Button onClick={() => update(true)}>Freeze and update</Button>
				<Button onClick={() => update(false)}>Unfreeze and update</Button>
			</View>

			<div data-testid="frozen-state">{frozen ? "Frozen" : "Active"}</div>

			<ValueContext.Provider value={value}>
				<Freeze frozen={frozen}>
					<div data-testid="prop-value">Prop: {value}</div>
					<ContextValue />
				</Freeze>
			</ValueContext.Provider>
		</View>
	);
};

export const base: StoryObj = {
	name: "base",
	render: () => <Demo />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const [freezeButton, unfreezeButton] = canvas.getAllByRole("button");

		await userEvent.click(freezeButton);

		// Updates coming in the same render as freezing are ignored
		expect(canvas.getByTestId("frozen-state")).toHaveTextContent("Frozen");
		expect(canvas.getByTestId("prop-value")).toHaveTextContent("Prop: 0");
		expect(canvas.getByTestId("context-value")).toHaveTextContent("Context: 0");

		// Frozen content stays visible even though it's suspended
		expect(canvas.getByTestId("prop-value")).toBeVisible();
		expect(canvas.getByTestId("context-value")).toBeVisible();

		await userEvent.click(freezeButton);
		expect(canvas.getByTestId("prop-value")).toHaveTextContent("Prop: 0");

		await userEvent.click(unfreezeButton);

		await waitFor(() => {
			expect(canvas.getByTestId("frozen-state")).toHaveTextContent("Active");
			expect(canvas.getByTestId("prop-value")).toHaveTextContent("Prop: 3");
			expect(canvas.getByTestId("context-value")).toHaveTextContent("Context: 3");
		});
		expect(canvas.getByTestId("prop-value")).toBeVisible();
	},
};

export const transition: StoryObj = {
	name: "test: freezing in a transition",
	render: () => <Demo transition />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const [freezeButton] = canvas.getAllByRole("button");

		await userEvent.click(freezeButton);

		// Transitions can't commit a frozen render, so they shouldn't be blocked by it
		await waitFor(() => {
			expect(canvas.getByTestId("frozen-state")).toHaveTextContent("Frozen");
			expect(canvas.getByTestId("prop-value")).toHaveTextContent("Prop: 1");
		});
		expect(canvas.getByTestId("prop-value")).toBeVisible();
	},
};
