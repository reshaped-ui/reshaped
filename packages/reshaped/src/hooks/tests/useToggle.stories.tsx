import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, userEvent } from "storybook/test";

import Button from "components/Button";
import useToggle from "hooks/useToggle";

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
			<Button onClick={() => toggle()} attributes={{ "data-active": active }}>
				{active ? "Deactivate" : "Activate"}
			</Button>
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
			<React.Fragment>
				<Button onClick={activate} attributes={{ "data-active": active }}>
					Activate
				</Button>
			</React.Fragment>
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
			<Button onClick={deactivate} attributes={{ "data-active": active }}>
				Deactivate
			</Button>
		);
	},
	play: async ({ canvas }) => {
		const button = canvas.getAllByRole("button")[0];

		expect(button.getAttribute("data-active")).toBe("true");

		await userEvent.click(button);

		expect(button.getAttribute("data-active")).toBe("false");
	},
};
