import { render, screen, waitFor, act } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Popover from "components/Popover";
import Reshaped from "components/Reshaped";

const fixtures = {
	content: "Content",
	openText: "Open",
	closeAriaLabel: "Close",
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
		expect(handleOpenMock).not.toHaveBeenCalled();
		expect(screen.queryByText(fixtures.content)).toBeInTheDocument();

		await userEvent.keyboard("{Escape}");

		await waitFor(() => {
			expect(handleCloseMock).toHaveBeenCalledTimes(1);
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
			expect(handleOpenMock).toHaveBeenCalledTimes(1);
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
		expect(handleOpen).not.toHaveBeenCalled();
		expect(screen.queryByText(fixtures.content)).toBeInTheDocument();

		await userEvent.keyboard("{Escape}");

		await waitFor(() => {
			act(() => {
				expect(handleClose).toHaveBeenCalledTimes(1);
			});
		});
	});

	test("works with dismissible", async () => {
		const handleClose = jest.fn();

		render(
			<Reshaped>
				<Popover defaultActive onClose={handleClose}>
					<Popover.Trigger>
						{(attributes) => (
							<button type="button" {...attributes}>
								{fixtures.openText}
							</button>
						)}
					</Popover.Trigger>
					<Popover.Content>
						<Popover.Dismissible closeAriaLabel={fixtures.closeAriaLabel}>
							{fixtures.content}
						</Popover.Dismissible>
					</Popover.Content>
				</Popover>
			</Reshaped>
		);

		const elCloseButton = screen.getByLabelText(fixtures.closeAriaLabel);

		await userEvent.click(elCloseButton);

		expect(handleClose).toHaveBeenCalledTimes(1);
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
		expect(handleOpen).not.toHaveBeenCalled();

		await waitFor(() => {
			expect(screen.queryByText(fixtures.content)).toBeInTheDocument();
		});

		await userEvent.unhover(elButton);

		await waitFor(() => {
			expect(handleClose).toHaveBeenCalledTimes(1);
		});
	});
});
