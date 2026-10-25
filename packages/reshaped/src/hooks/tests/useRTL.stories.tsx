import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, type MockInstance, spyOn, userEvent, waitFor } from "storybook/test";

import Reshaped from "@/components/Reshaped";
import useRTL from "../useRTL";

export default {
	title: "Hooks/useRTL",
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

const Component = () => {
	const [rtl, setRTL] = useRTL();

	React.useEffect(() => {
		setRTL(true);
	}, [setRTL]);

	return <div>{rtl ? "RTL" : "LTR"}</div>;
};

export const setRTL: StoryObj = {
	name: "setRTL",
	render: () => <Component />,
	play: async () => {
		expect(document.documentElement).toHaveAttribute("dir", "rtl");
	},
};

const Consumer = (props: { index: number }) => {
	const [rtl, setRTL] = useRTL();

	return (
		<button type="button" onClick={() => setRTL(!rtl)}>
			{props.index}: {rtl ? "RTL" : "LTR"}
		</button>
	);
};

const spies: {
	setAttribute?: MockInstance<Element["setAttribute"]>;
	observe?: MockInstance<MutationObserver["observe"]>;
} = {};

export const multipleConsumers: StoryObj = {
	name: "multiple consumers, provider syncs dir once",
	parameters: {
		disableWrapper: true,
	},
	beforeEach: () => {
		spies.setAttribute = spyOn(Element.prototype, "setAttribute");
		spies.observe = spyOn(MutationObserver.prototype, "observe");

		return () => {
			spies.setAttribute?.mockRestore();
			spies.observe?.mockRestore();
		};
	},
	render: () => (
		<Reshaped theme="slate">
			{Array.from({ length: 20 }, (_, index) => (
				<Consumer key={index} index={index} />
			))}
		</Reshaped>
	),
	play: async () => {
		const root = document.documentElement;
		const dirSetCalls = spies.setAttribute!.mock.calls.filter(
			(args, index) => spies.setAttribute!.mock.contexts[index] === root && args[0] === "dir"
		);
		const rootObserveCalls = spies.observe!.mock.calls.filter((args) => args[0] === root);

		expect(dirSetCalls).toHaveLength(1);
		expect(rootObserveCalls).toHaveLength(1);
	},
};

export const sharedState: StoryObj = {
	name: "setRTL from a consumer updates all consumers",
	parameters: {
		disableWrapper: true,
	},
	render: () => {
		const [mounted, setMounted] = React.useState(false);

		return (
			<Reshaped theme="slate">
				<Consumer index={0} />
				<Consumer index={1} />
				{mounted ? <Consumer index={2} /> : <button onClick={() => setMounted(true)}>Mount</button>}
			</Reshaped>
		);
	},
	play: async ({ canvas }) => {
		const root = document.documentElement;
		const buttons = canvas.getAllByRole("button");

		expect(root).toHaveAttribute("dir", "ltr");

		await userEvent.click(buttons[0]);

		await waitFor(() => {
			expect(root).toHaveAttribute("dir", "rtl");
			expect(buttons[0]).toHaveTextContent("0: RTL");
			expect(buttons[1]).toHaveTextContent("1: RTL");
		});

		// Consumers mounted later read the current value instead of resetting it
		await userEvent.click(canvas.getByText("Mount"));

		await waitFor(() => {
			expect(root).toHaveAttribute("dir", "rtl");
			expect(canvas.getByText("2: RTL")).toBeInTheDocument();
		});

		await userEvent.click(buttons[1]);

		await waitFor(() => {
			expect(root).toHaveAttribute("dir", "ltr");
			expect(buttons[0]).toHaveTextContent("0: LTR");
			expect(buttons[1]).toHaveTextContent("1: LTR");
			expect(canvas.getByText("2: LTR")).toBeInTheDocument();
		});
	},
};
