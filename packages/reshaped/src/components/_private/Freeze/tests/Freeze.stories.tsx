import React from "react";

import Freeze from "@/components/_private/Freeze";
import Button from "@/components/Button";
import View from "@/components/View";

export default {
	title: "Internal/Freeze",
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

const ValueContext = React.createContext(0);

const ContextValue = () => {
	const value = React.useContext(ValueContext);

	return <div data-testid="context-value">Context: {value}</div>;
};

const Demo = () => {
	const [frozen, setFrozen] = React.useState(false);
	const [value, setValue] = React.useState(0);

	const update = (nextFrozen: boolean) => {
		setFrozen(nextFrozen);
		setValue((prev) => prev + 1);
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

export const base = { name: "base", render: () => <Demo /> };
