import React from "react";
import { describe, expect, test } from "vitest";
import { page, userEvent } from "vitest/browser";

import Freeze from "@/components/_private/Freeze";
import { render } from "@/tests/render";

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
		<div>
			<button onClick={() => update(true)}>Freeze and update</button>
			<button onClick={() => update(false)}>Unfreeze and update</button>

			<div data-testid="frozen-state">{frozen ? "Frozen" : "Active"}</div>

			<ValueContext.Provider value={value}>
				<Freeze frozen={frozen}>
					<div data-testid="prop-value">Prop: {value}</div>
					<ContextValue />
				</Freeze>
			</ValueContext.Provider>
		</div>
	);
};

describe("Internal/Freeze", () => {
	test("base", async () => {
		await render(<Demo />);
		const freezeButton = page.getByRole("button", { name: "Freeze and update", exact: true });
		const unfreezeButton = page.getByRole("button", { name: "Unfreeze and update", exact: true });
		const frozenState = page.getByTestId("frozen-state");
		const propValue = page.getByTestId("prop-value");
		const contextValue = page.getByTestId("context-value");

		await userEvent.click(freezeButton);

		// Updates coming in the same render as freezing are ignored
		await expect.element(frozenState).toHaveTextContent("Frozen");
		await expect.element(propValue).toHaveTextContent("Prop: 0");
		await expect.element(contextValue).toHaveTextContent("Context: 0");

		// Frozen content stays visible even though it's suspended
		await expect.element(propValue).toBeVisible();
		await expect.element(contextValue).toBeVisible();

		await userEvent.click(freezeButton);
		await expect.element(propValue).toHaveTextContent("Prop: 0");

		await userEvent.click(unfreezeButton);

		await expect.element(frozenState).toHaveTextContent("Active");
		await expect.element(propValue).toHaveTextContent("Prop: 3");
		await expect.element(contextValue).toHaveTextContent("Context: 3");
		await expect.element(propValue).toBeVisible();
	});

	test("freezing in a transition", async () => {
		await render(<Demo transition />);

		await userEvent.click(page.getByRole("button", { name: "Freeze and update", exact: true }));

		// Transitions can't commit a frozen render, so they shouldn't be blocked by it
		await expect.element(page.getByTestId("frozen-state")).toHaveTextContent("Frozen");
		await expect.element(page.getByTestId("prop-value")).toHaveTextContent("Prop: 1");
		await expect.element(page.getByTestId("prop-value")).toBeVisible();
	});

	test("renders children when not frozen", async () => {
		await render(
			<Freeze frozen={false}>
				<div>Content</div>
			</Freeze>
		);

		await expect.element(page.getByText("Content")).toBeVisible();
	});
});
