import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, userEvent, within } from "storybook/test";

import Button from "@/components/Button";
import Overlay from "@/components/Overlay";
import useToggle from "@/hooks/useToggle";
import { Example } from "@/utilities/storybook";

export default {
	title: "Utility components/Overlay",
	component: Overlay,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/overlay",
		},
	},
};

export const base: StoryObj = {
	name: "base",
	render: () => {
		const overlayToggle = useToggle(false);

		return (
			<Example>
				<Example.Item title="base">
					<Button onClick={overlayToggle.activate}>Open overlay</Button>
					<Overlay active={overlayToggle.active} onClose={overlayToggle.deactivate}>
						Overlay content
					</Overlay>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);
	},
};

export const transparent: StoryObj = {
	name: "transparent",
	render: () => {
		const overlayToggle = useToggle(false);

		return (
			<Example>
				<Example.Item title="base">
					<Button onClick={overlayToggle.activate}>Open overlay</Button>
					<Overlay active={overlayToggle.active} onClose={overlayToggle.deactivate} transparent>
						Overlay content
					</Overlay>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);
	},
};

export const blurred: StoryObj = {
	name: "blurred",
	render: () => {
		const overlayToggle = useToggle(false);

		return (
			<Example>
				<Example.Item title="base">
					<Button onClick={overlayToggle.activate}>Open overlay</Button>
					<Overlay active={overlayToggle.active} onClose={overlayToggle.deactivate} blurred>
						Overlay content
					</Overlay>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);
	},
};

export const containerRef: StoryObj = {
	name: "containerRef",
	render: () => {
		const containerRef = React.useRef<HTMLDivElement>(null);

		return (
			<>
				<div ref={containerRef} data-testid="test-id" style={{ height: 200 }} />
				<Overlay active containerRef={containerRef}>
					Content
				</Overlay>
			</>
		);
	},
	play: ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const container = canvas.getByTestId("test-id");
		const overlay = canvas.getByText("Content");

		expect(container).toContainElement(overlay);
	},
};

export const containerRefNotContained: StoryObj = {
	name: "containerRef with contained={false}",
	render: () => {
		const containerRef = React.useRef<HTMLDivElement>(null);

		return (
			<>
				<div ref={containerRef} data-testid="test-id" style={{ height: 200 }} />
				<Overlay active containerRef={containerRef} contained={false}>
					Content
				</Overlay>
			</>
		);
	},
	play: ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const container = canvas.getByTestId("test-id");
		const overlay = canvas.getByText("Content");

		expect(container).toContainElement(overlay);
	},
};
