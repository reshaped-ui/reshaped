import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fireEvent, fn, type Mock, spyOn, userEvent } from "storybook/test";

import useOnClickOutside from "../useOnClickOutside";

export default {
	title: "Hooks/useOnClickOutside",
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

const DemoBase = (props: { onOutsideClick: () => void }) => {
	const ref = React.useRef(null);
	const [target, setTarget] = React.useState<"inside" | "outside" | null>(null);

	useOnClickOutside([ref], () => {
		props.onOutsideClick();
		console.log("clicked outside");
		setTarget("outside");
	});

	return (
		<div style={{ display: "flex", gap: 16, flexDirection: "column", alignItems: "flex-start" }}>
			<button
				ref={ref}
				onClick={() => {
					console.log("clicked inside");
					setTarget("inside");
				}}
			>
				Trigger
			</button>
			{target && `Clicked ${target}`}
		</div>
	);
};

export const base: StoryObj<{ handleOutsideClick: Mock }> = {
	name: "base",
	args: {
		handleOutsideClick: fn(),
	},
	render: (args) => <DemoBase onOutsideClick={args.handleOutsideClick} />,
	play: async ({ canvas, args }) => {
		const button = canvas.getAllByRole("button")[0];

		await userEvent.click(button);

		expect(args.handleOutsideClick).not.toHaveBeenCalled();

		await userEvent.click(document.body);

		expect(args.handleOutsideClick).toHaveBeenCalledTimes(1);
		expect(args.handleOutsideClick).toHaveBeenCalledWith();
	},
};

export const rightClick: StoryObj<{ handleOutsideClick: Mock }> = {
	name: "test: right click",
	args: {
		handleOutsideClick: fn(),
	},
	render: (args) => <DemoBase onOutsideClick={args.handleOutsideClick} />,
	play: async ({ canvas, args }) => {
		const button = canvas.getAllByRole("button")[0];

		await userEvent.pointer({ keys: "[MouseRight]", target: button });

		expect(args.handleOutsideClick).not.toHaveBeenCalled();

		await userEvent.pointer({ keys: "[MouseRight]", target: document.body });

		expect(args.handleOutsideClick).toHaveBeenCalledTimes(1);
		expect(args.handleOutsideClick).toHaveBeenCalledWith();

		// Opening another context menu outside
		const preventDefault = (e: Event) => e.preventDefault();
		document.body.addEventListener("contextmenu", preventDefault);
		await userEvent.pointer({ keys: "[MouseRight]", target: document.body });
		document.body.removeEventListener("contextmenu", preventDefault);

		expect(args.handleOutsideClick).toHaveBeenCalledTimes(2);
	},
};

export const keyboardContextMenu: StoryObj<{ handleOutsideClick: Mock }> = {
	name: "test: context menu key",
	args: {
		handleOutsideClick: fn(),
	},
	render: (args) => <DemoBase onOutsideClick={args.handleOutsideClick} />,
	play: async ({ canvas, args }) => {
		const button = canvas.getAllByRole("button")[0];

		// Context menu key doesn't trigger mousedown
		fireEvent.mouseDown(document.body);
		fireEvent.contextMenu(button);

		expect(args.handleOutsideClick).not.toHaveBeenCalled();

		fireEvent.mouseDown(button);
		fireEvent.contextMenu(document.body);

		expect(args.handleOutsideClick).toHaveBeenCalledTimes(1);
	},
};

const DemoRefs = (props: { onOutsideClick: () => void }) => {
	const ref = React.useRef(null);
	const ref2 = React.useRef(null);

	useOnClickOutside([ref, ref2], () => {
		props.onOutsideClick();
	});

	return (
		<div style={{ display: "flex", gap: 16, flexDirection: "column", alignItems: "flex-start" }}>
			<button ref={ref}>Trigger</button>
			<button ref={ref2}>Trigger 2</button>
		</div>
	);
};

export const refs: StoryObj<{ handleOutsideClick: Mock }> = {
	name: "multiple refs",
	args: {
		handleOutsideClick: fn(),
	},
	render: (args) => <DemoRefs onOutsideClick={args.handleOutsideClick} />,
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

const DemoDeps = (props: { onOutsideClick: (props: { count: number }) => void }) => {
	const ref = React.useRef(null);
	const [count, setCount] = React.useState(0);

	useOnClickOutside([ref], () => {
		props.onOutsideClick({ count });
	});

	return (
		<button ref={ref} onClick={() => setCount((prev) => prev + 1)}>
			Trigger
		</button>
	);
};

export const deps: StoryObj<{ handleOutsideClick: Mock }> = {
	name: "test: handler uses latest state",
	args: {
		handleOutsideClick: fn(),
	},
	render: (args) => <DemoDeps onOutsideClick={args.handleOutsideClick} />,
	play: async ({ canvas, args }) => {
		const button = canvas.getAllByRole("button")[0];

		await userEvent.click(document.body);

		expect(args.handleOutsideClick).toHaveBeenLastCalledWith({ count: 0 });

		await userEvent.click(button);
		await userEvent.click(document.body);

		expect(args.handleOutsideClick).toHaveBeenLastCalledWith({ count: 1 });
	},
};

const DemoDisabledItem = () => {
	const ref = React.useRef(null);

	useOnClickOutside([ref], () => {}, { disabled: true });

	return <div ref={ref}>Item</div>;
};

export const disabledListeners: StoryObj = {
	name: "test: disabled doesn't add listeners",
	render: () => {
		const [mounted, setMounted] = React.useState(false);

		return (
			<div>
				<button onClick={() => setMounted(true)}>Mount</button>
				{mounted && Array.from({ length: 10 }).map((_, i) => <DemoDisabledItem key={i} />)}
			</div>
		);
	},
	play: async ({ canvas }) => {
		const spy = spyOn(document, "addEventListener");

		await userEvent.click(canvas.getByRole("button", { name: "Mount" }));

		const types = spy.mock.calls.map((call) => call[0]);
		spy.mockRestore();

		expect(canvas.getAllByText("Item")).toHaveLength(10);
		expect(
			types.filter((type) =>
				["mousedown", "touchstart", "keydown", "click", "contextmenu"].includes(type)
			)
		).toHaveLength(0);
	},
};

const DemoEnable = (props: { onOutsideClick: () => void }) => {
	const ref = React.useRef(null);
	const [enabled, setEnabled] = React.useState(false);

	useOnClickOutside([ref], props.onOutsideClick, { disabled: !enabled });

	return (
		<div style={{ display: "flex", gap: 16, flexDirection: "column", alignItems: "flex-start" }}>
			<input ref={ref} onFocus={() => setEnabled(true)} aria-label="Enable" />
			{enabled && "Enabled"}
		</div>
	);
};

export const enable: StoryObj<{ handleOutsideClick: Mock }> = {
	name: "test: enabled during click inside",
	args: {
		handleOutsideClick: fn(),
	},
	render: (args) => <DemoEnable onOutsideClick={args.handleOutsideClick} />,
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("textbox", { name: "Enable" });

		await userEvent.click(document.body);

		expect(args.handleOutsideClick).not.toHaveBeenCalled();

		// Focus on mousedown enables the hook, so the mousedown happened inside before it was enabled
		await userEvent.click(input);

		expect(canvas.getByText("Enabled")).toBeInTheDocument();
		expect(args.handleOutsideClick).not.toHaveBeenCalled();

		await userEvent.click(document.body);

		expect(args.handleOutsideClick).toHaveBeenCalledTimes(1);
	},
};
