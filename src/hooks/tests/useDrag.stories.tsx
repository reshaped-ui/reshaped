import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { fireEvent, fn, expect } from "storybook/test";

import Button from "components/Button";
import View from "components/View";
import useDrag from "hooks/_private/useDrag";
import useToggle from "hooks/useToggle";

export default {
	title: "Internal/useDrag",
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

function Example() {
	const [state, setState] = React.useState({ x: 0, y: 0 });
	const disabledToggle = useToggle();

	const { ref, containerRef, active } = useDrag<HTMLDivElement>(
		(args) => {
			setState(args);
		},
		{
			disabled: disabledToggle.active,
		}
	);

	return (
		<View direction="row" gap={4}>
			<View
				backgroundColor="neutral-faded"
				borderRadius="medium"
				width="200px"
				height="200px"
				attributes={{ ref: containerRef }}
			>
				<View
					height={8}
					width={8}
					borderRadius="small"
					animated
					backgroundColor={active ? "primary" : "neutral"}
					attributes={{
						role: "button",
						tabIndex: 0,
						"aria-label": "Drag",
						ref,
						style: { translate: `${state.x}px ${state.y}px`, cursor: active ? "grabbing" : "grab" },
					}}
				/>
			</View>
			<Button onClick={() => disabledToggle.toggle()}>
				{disabledToggle.active ? "Enable" : "Disable"}
			</Button>
		</View>
	);
}

export const base = { name: "base", render: () => <Example /> };

const Demo: React.FC<{
	onDrag: ReturnType<typeof fn>;
	disabled?: boolean;
	orientation?: "horizontal" | "vertical";
}> = (props) => {
	const { ref, containerRef } = useDrag<HTMLDivElement>(
		(options) => {
			props.onDrag(options);
		},
		{
			orientation: props.orientation,
			disabled: props.disabled,
		}
	);

	return (
		<View
			backgroundColor="neutral-faded"
			width="200px"
			height="200px"
			attributes={{ ref: containerRef, "data-testid": "test-id" }}
		>
			<View
				height={8}
				width={8}
				backgroundColor="primary"
				attributes={{
					"data-testid": "test-handle-id",
					ref,
				}}
			/>
		</View>
	);
};

export const mouseEvents: StoryObj<{ handleDrag: ReturnType<typeof fn> }> = {
	name: "onDrag, mouse events",
	args: {
		handleDrag: fn(),
	},
	render: (args) => {
		return <Demo onDrag={args.handleDrag} />;
	},
	play: ({ canvas, args }) => {
		const trigger = canvas.getByTestId("test-handle-id");

		fireEvent.mouseDown(trigger);
		fireEvent.mouseMove(document.body, { clientX: 100, clientY: 50 });

		expect(args.handleDrag).toHaveBeenCalledTimes(1);
		expect(args.handleDrag).toHaveBeenCalledWith(expect.objectContaining({ x: 100, y: 50 }));

		fireEvent.mouseUp(trigger);
		fireEvent.mouseUp(document.body, { clientX: 50, clientY: 100 });

		expect(args.handleDrag).toHaveBeenCalledTimes(1);
	},
};

export const touchEvents: StoryObj<{ handleDrag: ReturnType<typeof fn> }> = {
	name: "onDrag, touch events",
	args: {
		handleDrag: fn(),
	},
	render: (args) => {
		return <Demo onDrag={args.handleDrag} />;
	},
	play: ({ canvas, args }) => {
		const createTouch = (target: HTMLElement, x: number, y: number) => {
			return new Touch({
				identifier: Date.now(),
				target,
				clientX: x,
				clientY: y,
				screenX: x,
				screenY: y,
				pageX: x,
				pageY: y,
			});
		};

		const trigger = canvas.getByTestId("test-handle-id");

		fireEvent.touchStart(trigger, { changedTouches: [createTouch(trigger, 0, 0)] });
		fireEvent.touchMove(document.body, { changedTouches: [createTouch(trigger, 100, 50)] });

		expect(args.handleDrag).toHaveBeenCalledTimes(1);
		expect(args.handleDrag).toHaveBeenCalledWith(expect.objectContaining({ x: 100, y: 50 }));

		fireEvent.touchEnd(trigger);
		fireEvent.touchEnd(document.body, { changedTouches: [createTouch(trigger, 100, 50)] });

		expect(args.handleDrag).toHaveBeenCalledTimes(1);
	},
};

export const orientationHorizontal: StoryObj<{ handleDrag: ReturnType<typeof fn> }> = {
	name: "orientation horizontal",
	args: {
		handleDrag: fn(),
	},
	render: (args) => {
		return <Demo onDrag={args.handleDrag} orientation="horizontal" />;
	},
	play: ({ canvas, args }) => {
		const trigger = canvas.getByTestId("test-handle-id");

		fireEvent.mouseDown(trigger);
		fireEvent.mouseMove(document.body, { clientX: 100, clientY: 50 });

		expect(args.handleDrag).toHaveBeenCalledTimes(1);
		expect(args.handleDrag).toHaveBeenCalledWith(expect.objectContaining({ x: 100, y: 0 }));
	},
};

export const orientationVertical: StoryObj<{ handleDrag: ReturnType<typeof fn> }> = {
	name: "orientation vertical",
	args: {
		handleDrag: fn(),
	},
	render: (args) => {
		return <Demo onDrag={args.handleDrag} orientation="vertical" />;
	},
	play: ({ canvas, args }) => {
		const trigger = canvas.getByTestId("test-handle-id");

		fireEvent.mouseDown(trigger);
		fireEvent.mouseMove(document.body, { clientX: 100, clientY: 50 });

		expect(args.handleDrag).toHaveBeenCalledTimes(1);
		expect(args.handleDrag).toHaveBeenCalledWith(expect.objectContaining({ x: 0, y: 50 }));
	},
};

export const disabled: StoryObj<{ handleDrag: ReturnType<typeof fn> }> = {
	name: "disabled",
	args: {
		handleDrag: fn(),
	},
	render: (args) => {
		return <Demo onDrag={args.handleDrag} disabled />;
	},
	play: ({ canvas, args }) => {
		const trigger = canvas.getByTestId("test-handle-id");

		fireEvent.mouseDown(trigger);
		fireEvent.mouseMove(document.body, { clientX: 100, clientY: 50 });

		expect(args.handleDrag).toHaveBeenCalledTimes(0);
	},
};
