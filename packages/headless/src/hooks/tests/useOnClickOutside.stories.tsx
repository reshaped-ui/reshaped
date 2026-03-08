import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, type Mock, userEvent } from "storybook/test";

import useOnClickOutside from "../useOnClickOutside";

export default {
	title: "Headless/Hooks/useOnClickOutside",
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

export const base: StoryObj<{ handleOutsideClick: Mock }> = {
	name: "base",
	args: {
		handleOutsideClick: fn(),
	},
	render: (args) => {
		const ref = React.useRef(null);
		const [target, setTarget] = React.useState<"inside" | "outside" | null>(null);

		useOnClickOutside([ref], () => {
			args.handleOutsideClick();
			setTarget("outside");
		});

		return (
			<div style={{ display: "flex", gap: 16, flexDirection: "column", alignItems: "flex-start" }}>
				<button ref={ref} onClick={() => setTarget("inside")}>
					Trigger
				</button>
				{target && `Clicked ${target}`}
			</div>
		);
	},
	play: async ({ canvas, args }) => {
		const button = canvas.getAllByRole("button")[0];

		await userEvent.click(button);

		expect(args.handleOutsideClick).not.toHaveBeenCalled();

		await userEvent.click(document.body);

		expect(args.handleOutsideClick).toHaveBeenCalledTimes(1);
		expect(args.handleOutsideClick).toHaveBeenCalledWith();
	},
};

export const refs: StoryObj<{ handleOutsideClick: Mock }> = {
	name: "multiple refs",
	args: {
		handleOutsideClick: fn(),
	},
	render: (args) => {
		const ref = React.useRef(null);
		const ref2 = React.useRef(null);

		useOnClickOutside([ref, ref2], () => {
			args.handleOutsideClick();
		});

		return (
			<div style={{ display: "flex", gap: 16, flexDirection: "column", alignItems: "flex-start" }}>
				<button ref={ref}>Trigger</button>
				<button ref={ref2}>Trigger 2</button>
			</div>
		);
	},
	play: async ({ canvas, args }) => {
		const [button, button2] = canvas.getAllByRole("button");

		await userEvent.click(button);

		expect(args.handleOutsideClick).not.toHaveBeenCalled();

		await userEvent.click(button2);

		expect(args.handleOutsideClick).not.toHaveBeenCalled();

		await userEvent.click(document.body);

		expect(args.handleOutsideClick).toHaveBeenCalledTimes(1);
		expect(args.handleOutsideClick).toHaveBeenCalledWith();
	},
};

export const disabled: StoryObj<{ handleOutsideClick: Mock }> = {
	name: "disabled",
	args: {
		handleOutsideClick: fn(),
	},
	render: (args) => {
		const ref = React.useRef(null);

		useOnClickOutside(
			[ref],
			() => {
				args.handleOutsideClick();
			},
			{
				disabled: true,
			}
		);

		return <button ref={ref}>Trigger</button>;
	},
	play: async ({ args }) => {
		await userEvent.click(document.body);

		expect(args.handleOutsideClick).not.toHaveBeenCalled();
	},
};

export const deps: StoryObj<{ handleOutsideClick: Mock }> = {
	name: "test: handler uses latest state",
	args: {
		handleOutsideClick: fn(),
	},
	render: (args) => {
		const ref = React.useRef(null);
		const [count, setCount] = React.useState(0);

		useOnClickOutside([ref], () => {
			args.handleOutsideClick({ count });
		});

		return (
			<button ref={ref} onClick={() => setCount((prev) => prev + 1)}>
				Trigger
			</button>
		);
	},
	play: async ({ canvas, args }) => {
		const button = canvas.getAllByRole("button")[0];

		await userEvent.click(document.body);

		expect(args.handleOutsideClick).toHaveBeenLastCalledWith({ count: 0 });

		await userEvent.click(button);
		await userEvent.click(document.body);

		expect(args.handleOutsideClick).toHaveBeenLastCalledWith({ count: 1 });
	},
};
