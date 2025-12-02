import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, userEvent, type Mock } from "storybook/test";

import Button from "components/Button";
import View from "components/View";
import useOnClickOutside from "hooks/useOnClickOutside";

export default {
	title: "Hooks/useOnClickOutside",
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
			<View gap={4} align="start">
				<Button attributes={{ ref }} onClick={() => setTarget("inside")}>
					Trigger
				</Button>
				{target && `Clicked ${target}`}
			</View>
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
			<View gap={4} align="start">
				<Button attributes={{ ref }}>Trigger</Button>
				<Button attributes={{ ref: ref2 }}>Trigger 2</Button>
			</View>
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

		return (
			<View gap={4} align="start">
				<Button attributes={{ ref }}>Trigger</Button>
			</View>
		);
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
			<Button attributes={{ ref }} onClick={() => setCount((prev) => prev + 1)}>
				Trigger
			</Button>
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
