import { StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import useToggle from "../useToggle";

export default {
	title: "Hooks/useToggle",
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

export const toggle: StoryObj = {
	name: "toggle",
	render: () => {
		const { toggle, active } = useToggle();

		return (
			<button onClick={() => toggle()} data-active={active}>
				{active ? "Deactivate" : "Activate"}
			</button>
		);
	},
	play: async ({ canvas }) => {
		const button = canvas.getAllByRole("button")[0];

		expect(button.getAttribute("data-active")).toBe("false");

		await userEvent.click(button);

		expect(button.getAttribute("data-active")).toBe("true");

		await userEvent.click(button);

		expect(button.getAttribute("data-active")).toBe("false");
	},
};

export const activate: StoryObj = {
	name: "activate",
	render: () => {
		const { activate, active } = useToggle();

		return (
			<button onClick={activate} data-active={active}>
				Activate
			</button>
		);
	},
	play: async ({ canvas }) => {
		const button = canvas.getAllByRole("button")[0];

		expect(button.getAttribute("data-active")).toBe("false");

		await userEvent.click(button);

		expect(button.getAttribute("data-active")).toBe("true");
	},
};

export const deactivate: StoryObj = {
	name: "deactivate",
	render: () => {
		const { deactivate, active } = useToggle(true);

		return (
			<button onClick={deactivate} data-active={active}>
				Deactivate
			</button>
		);
	},
	play: async ({ canvas }) => {
		const button = canvas.getAllByRole("button")[0];

		expect(button.getAttribute("data-active")).toBe("true");

		await userEvent.click(button);

		expect(button.getAttribute("data-active")).toBe("false");
	},
};
