import React from "react";
import { describe, expect, test } from "vitest";
import { page, userEvent } from "vitest/browser";

import { render } from "@/tests/render";
import useKeyboardArrowNavigation from "../useKeyboardArrowNavigation";

type Options = Omit<Parameters<typeof useKeyboardArrowNavigation>[0], "ref">;

const Component = (props: Options) => {
	const ref = React.useRef<HTMLDivElement>(null);

	useKeyboardArrowNavigation({ ref, ...props });

	return (
		<div style={{ display: "flex", gap: 8 }} ref={ref}>
			<button onClick={() => {}}>Action 1</button>
			<button onClick={() => {}}>Action 2</button>
			<button onClick={() => {}}>Action 3</button>
		</div>
	);
};

const getButtons = () => page.getByRole("button").all();

describe("Hooks/useKeyboardArrowNavigation", () => {
	test("base", async () => {
		await render(<Component />);
		const buttons = await getButtons();

		buttons[0].element().focus();

		await userEvent.keyboard("{ArrowRight}");
		await expect.element(buttons[1]).toHaveFocus();

		await userEvent.keyboard("{ArrowDown}");
		await expect.element(buttons[2]).toHaveFocus();

		await userEvent.keyboard("{ArrowUp}");
		await expect.element(buttons[1]).toHaveFocus();

		await userEvent.keyboard("{ArrowLeft}");
		await expect.element(buttons[0]).toHaveFocus();
	});

	test("orientation: horizontal", async () => {
		await render(<Component orientation="horizontal" />);
		const buttons = await getButtons();

		await expect.element(buttons[0]).toHaveAttribute("tabindex", "0");
		await expect.element(buttons[1]).toHaveAttribute("tabindex", "-1");
		await expect.element(buttons[2]).toHaveAttribute("tabindex", "-1");

		buttons[0].element().focus();

		await userEvent.keyboard("{ArrowRight}");
		await expect.element(buttons[1]).toHaveFocus();

		await userEvent.keyboard("{ArrowLeft}");
		await expect.element(buttons[0]).toHaveFocus();

		await userEvent.keyboard("{ArrowDown}");
		await expect.element(buttons[0]).toHaveFocus();

		await userEvent.keyboard("{ArrowUp}");
		await expect.element(buttons[0]).toHaveFocus();
	});

	test("orientation: vertical", async () => {
		await render(<Component orientation="vertical" />);
		const buttons = await getButtons();

		buttons[0].element().focus();

		await userEvent.keyboard("{ArrowDown}");
		await expect.element(buttons[1]).toHaveFocus();

		await userEvent.keyboard("{ArrowUp}");
		await expect.element(buttons[0]).toHaveFocus();

		await userEvent.keyboard("{ArrowRight}");
		await expect.element(buttons[0]).toHaveFocus();

		await userEvent.keyboard("{ArrowLeft}");
		await expect.element(buttons[0]).toHaveFocus();
	});

	test("circular", async () => {
		await render(<Component circular />);
		const buttons = await getButtons();

		buttons[0].element().focus();

		await userEvent.keyboard("{ArrowRight}");
		await userEvent.keyboard("{ArrowRight}");
		await expect.element(buttons[2]).toHaveFocus();

		await userEvent.keyboard("{ArrowRight}");
		await expect.element(buttons[0]).toHaveFocus();

		await userEvent.keyboard("{ArrowLeft}");
		await expect.element(buttons[2]).toHaveFocus();
	});

	test("not circular by default", async () => {
		await render(<Component />);
		const buttons = await getButtons();

		buttons[2].element().focus();

		await userEvent.keyboard("{ArrowRight}");
		await expect.element(buttons[2]).toHaveFocus();

		buttons[0].element().focus();

		await userEvent.keyboard("{ArrowLeft}");
		await expect.element(buttons[0]).toHaveFocus();
	});

	test("disabled", async () => {
		await render(<Component disabled />);
		const buttons = await getButtons();

		buttons[0].element().focus();

		await userEvent.keyboard("{ArrowRight}");
		await expect.element(buttons[0]).toHaveFocus();
		await expect.element(buttons[0]).not.toHaveAttribute("tabindex");
	});
});
