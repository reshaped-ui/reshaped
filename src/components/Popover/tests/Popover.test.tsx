import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Popover from "components/Popover";
import Reshaped from "components/Reshaped";

const fixtures = {
	content: "Content",
	openText: "Open",
	className: "test-className",
	id: "test-id",
};

describe("Components/Popover", () => {
	test("doesn't render children", () => {
		render(
			<Reshaped>
				<Popover>
					<Popover.Content>{fixtures.content}</Popover.Content>
				</Popover>
			</Reshaped>
		);

		expect(screen.queryByText(fixtures.content)).not.toBeInTheDocument();
	});

	test("works as controlled, active by default", async () => {
		const handleCloseMock = jest.fn();
		const handleOpenMock = jest.fn();

		const Component = () => {
			return (
				<Reshaped>
					<Popover active onClose={handleCloseMock} onOpen={handleOpenMock}>
						<Popover.Trigger>
							{(attributes) => (
								<button type="button" {...attributes}>
									{fixtures.openText}
								</button>
							)}
						</Popover.Trigger>
						<Popover.Content>{fixtures.content}</Popover.Content>
					</Popover>
				</Reshaped>
			);
		};

		render(<Component />);

		const elButton = screen.getByText(fixtures.openText);

		expect(elButton).toHaveAttribute("aria-controls");
		expect(handleOpenMock).not.toBeCalled();
		expect(screen.queryByText(fixtures.content)).toBeInTheDocument();

		await userEvent.keyboard("{Escape}");

		await waitFor(() => {
			expect(handleCloseMock).toBeCalledTimes(1);
		});
	});

	test("works as controlled, inactive by default", async () => {
		const handleOpenMock = jest.fn();

		const Component = () => {
			return (
				<Reshaped>
					<Popover active={false} onOpen={handleOpenMock}>
						<Popover.Trigger>
							{(attributes) => (
								<button type="button" {...attributes}>
									{fixtures.openText}
								</button>
							)}
						</Popover.Trigger>
						<Popover.Content>{fixtures.content}</Popover.Content>
					</Popover>
				</Reshaped>
			);
		};

		render(<Component />);

		const elButton = screen.getByText(fixtures.openText);

		expect(elButton).not.toHaveAttribute("aria-controls");
		expect(screen.queryByText(fixtures.content)).not.toBeInTheDocument();

		await userEvent.click(elButton);

		await waitFor(() => {
			expect(handleOpenMock).toBeCalledTimes(1);
			expect(screen.queryByText(fixtures.content)).not.toBeInTheDocument();
		});
	});

	test("works as uncontrolled", async () => {
		const handleOpen = jest.fn();
		const handleClose = jest.fn();

		render(
			<Reshaped>
				<Popover defaultActive onOpen={handleOpen} onClose={handleClose}>
					<Popover.Trigger>
						{(attributes) => (
							<button type="button" {...attributes}>
								{fixtures.openText}
							</button>
						)}
					</Popover.Trigger>
					<Popover.Content>{fixtures.content}</Popover.Content>
				</Popover>
			</Reshaped>
		);

		const elButton = screen.getByText(fixtures.openText);

		expect(elButton).toHaveAttribute("aria-controls");
		expect(handleOpen).not.toBeCalled();
		expect(screen.queryByText(fixtures.content)).toBeInTheDocument();

		await userEvent.keyboard("{Escape}");

		await waitFor(() => {
			act(() => {
				expect(handleClose).toBeCalledTimes(1);
			});
		});
	});

	test("works with hover trigger type", async () => {
		const handleOpen = jest.fn();
		const handleClose = jest.fn();

		render(
			<Reshaped>
				<Popover defaultActive triggerType="hover" onOpen={handleOpen} onClose={handleClose}>
					<Popover.Trigger>
						{(attributes) => (
							<button type="button" {...attributes}>
								{fixtures.openText}
							</button>
						)}
					</Popover.Trigger>
					<Popover.Content>{fixtures.content}</Popover.Content>
				</Popover>
			</Reshaped>
		);

		const elButton = screen.getByText(fixtures.openText);

		expect(elButton).not.toHaveAttribute("aria-controls");
		expect(handleOpen).not.toBeCalled();

		await waitFor(() => {
			expect(screen.queryByText(fixtures.content)).toBeInTheDocument();
		});

		await userEvent.unhover(elButton);

		await waitFor(() => {
			expect(handleClose).toBeCalledTimes(1);
		});
	});
});
