import { StoryObj } from "@storybook/react-vite";
import { expect, within, userEvent, waitFor } from "storybook/test";
import { useToast, ToastProvider } from "components/Toast";
import Button from "components/Button";

export default {
	title: "Components/Toast/tests",
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/toast",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const base: StoryObj = {
	name: "base",
	render: () => {
		const toast = useToast();

		return (
			<Button
				onClick={() => {
					const id = toast.show({
						title: "Title",
						text: "Text",
						children: "Children",
						startSlot: "Slot",
						actionsSlot: (
							<Button attributes={{ "data-testid": "trigger-id" }} onClick={() => toast.hide(id)}>
								Trigger
							</Button>
						),
					});
				}}
			>
				Show toast
			</Button>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const button = canvas.getAllByRole("button")[0];

		await userEvent.click(button);

		const title = canvas.getByText("Title");
		const text = canvas.getByText("Text");
		const children = canvas.getByText("Children");
		const slot = canvas.getByText("Slot");
		const action = canvas.getByTestId("trigger-id");

		expect(title).toBeInTheDocument();
		expect(text).toBeInTheDocument();
		expect(children).toBeInTheDocument();
		expect(slot).toBeInTheDocument();
		expect(action).toBeInTheDocument();

		await userEvent.click(action);

		await waitFor(() => {
			expect(title).not.toBeInTheDocument();
		});
	},
};

const NestedDemo = () => {
	const toast = useToast();

	return (
		<Button
			onClick={() => {
				toast.show({
					text: "Content",
				});
			}}
		>
			Show toast
		</Button>
	);
};

export const nested: StoryObj = {
	name: "ToastProvider",
	render: () => {
		return (
			<div data-testid="test-container-id">
				<ToastProvider>
					<NestedDemo />
				</ToastProvider>
			</div>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const button = canvas.getAllByRole("button")[0];

		await userEvent.click(button);

		const container = canvas.getByTestId("test-container-id");
		const toast = within(container).getByText("Content");

		expect(toast).toBeInTheDocument();
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => {
		const toast = useToast();

		return (
			<Button
				onClick={() => {
					const id = toast.show({
						text: "Content",
						attributes: { "data-testid": "test-id" },
						className: "test-classname",
					});
				}}
			>
				Show toast
			</Button>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const button = canvas.getAllByRole("button")[0];

		await userEvent.click(button);

		const toast = canvas.getByTestId("test-id");

		expect(toast).toBeInTheDocument();
		expect(toast).toHaveClass("test-classname");
	},
};
