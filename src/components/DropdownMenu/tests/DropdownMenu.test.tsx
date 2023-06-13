import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DropdownMenu from "components/DropdownMenu";
import Button from "components/Button";
import Reshaped from "components/Reshaped";

const fixtures = {
	content1: "Item 1",
	content2: "Item 2",
};

describe("DropdownMenu", () => {
	test("works when opening and closing", async () => {
		const handleOpen = jest.fn();
		const handleClose = jest.fn();

		render(
			<Reshaped>
				<DropdownMenu onOpen={handleOpen} onClose={handleClose}>
					<DropdownMenu.Trigger>
						{(attributes) => <Button attributes={attributes}>Open</Button>}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item>{fixtures.content1}</DropdownMenu.Item>
						<DropdownMenu.Item>{fixtures.content2}</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu>
			</Reshaped>
		);

		const button = screen.getByRole("button");

		expect(button).toBeInTheDocument();
		expect(button).toMatchSnapshot();
		expect(button).not.toHaveAttribute("aria-controls");
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();

		await userEvent.click(button);
		expect(button).toMatchSnapshot();

		await waitFor(() => {
			const menu = screen.queryByRole("menu");
			const menuItems = screen.queryAllByRole("menuitem");

			expect(screen.queryByText(fixtures.content1)).toBeInTheDocument();
			expect(menu).toBeInTheDocument();
			expect(menuItems).toHaveLength(2);

			const ariaControls = button.getAttribute("aria-controls");
			const dropdownEl = ariaControls && document.getElementById(ariaControls);
			expect(dropdownEl).toBeInTheDocument();

			// TODO: Add support for trapFocus unit testing
			// expect(menuItems[0]).toHaveFocus();

			expect(handleOpen).toBeCalledTimes(1);
		});

		await userEvent.click(button);

		await waitFor(() => {
			expect(handleClose).toBeCalledTimes(1);
		});

		// TODO: Add support for handling removal animation
		// await waitForElementToBeRemoved(() => screen.queryByText(fixtures.content1));
		// expect(screen.queryByText(fixtures.content1)).not.toBeInTheDocument();
	});

	test("works as controlled", async () => {
		const handleOpen = jest.fn();
		const handleClose = jest.fn();

		render(
			<Reshaped>
				<DropdownMenu onOpen={handleOpen} onClose={handleClose} active>
					<DropdownMenu.Trigger>
						{(attributes) => <Button attributes={attributes}>Open</Button>}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item>{fixtures.content1}</DropdownMenu.Item>
						<DropdownMenu.Item>{fixtures.content2}</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu>
			</Reshaped>
		);

		const button = screen.getByRole("button");

		expect(button).toMatchSnapshot();
		expect(handleOpen).toBeCalledTimes(0);

		await userEvent.click(button);
		expect(handleClose).toBeCalledTimes(1);
		// TODO: Add support for handling removal animation
		// expect(button).toMatchSnapshot();
	});

	test("works as uncontrolled", async () => {
		const handleOpen = jest.fn();
		const handleClose = jest.fn();

		render(
			<Reshaped>
				<DropdownMenu onOpen={handleOpen} onClose={handleClose} defaultActive>
					<DropdownMenu.Trigger>
						{(attributes) => <Button attributes={attributes}>Open</Button>}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item>{fixtures.content1}</DropdownMenu.Item>
						<DropdownMenu.Item>{fixtures.content2}</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu>
			</Reshaped>
		);

		const button = screen.getByRole("button");

		expect(button).toMatchSnapshot();
		expect(handleOpen).toBeCalledTimes(0);

		await userEvent.click(button);
		expect(handleClose).toBeCalledTimes(1);

		// TODO: Add support for handling removal animation
		// expect(button).toMatchSnapshot();
	});
});
