import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, userEvent, within } from "storybook/test";

import Button from "@/components/Button";
import Dismissible from "@/components/Dismissible";
import Image from "@/components/Image";
import Text from "@/components/Text";
import { ToastProvider, useToast } from "@/components/Toast";
import View from "@/components/View";
import { Example } from "@/utilities/storybook";
import IconZap from "@/icons/Zap";

export default {
	title: "Components/Toast",
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/toast",
		},
	},
};

const Orientation = () => {
	const toast = useToast();
	const props = {
		icon: IconZap,
		title: "Hey!",
		text: "Event completed",
		actionsSlot: <Button>Action</Button>,
	};

	return (
		<Example>
			<Example.Item title="orientation: horizontal">
				<Button
					onClick={() => {
						toast.show({ ...props });
					}}
				>
					Show toast
				</Button>
			</Example.Item>
			<Example.Item title="orientation: horizontal, without title">
				<Button
					onClick={() => {
						toast.show({ ...props, title: undefined, timeout: 0 });
					}}
				>
					Show toast
				</Button>
			</Example.Item>
			<Example.Item title="orientation: vertical">
				<Button
					onClick={() => {
						toast.show({ ...props, orientation: "vertical" });
					}}
				>
					Show toast
				</Button>
			</Example.Item>
		</Example>
	);
};
export const orientation = { name: "orientation", render: () => <Orientation /> };

const Position = () => {
	const toast = useToast();
	return (
		<Example>
			<Example.Item title="position: bottom-start">
				<Button
					onClick={() => {
						const id = toast.show({
							text: "Event completed",
							position: "bottom-start",
							actionsSlot: <Button onClick={() => toast.hide(id)}>Close</Button>,
						});
					}}
				>
					Show toast
				</Button>
			</Example.Item>
			<Example.Item title="position: bottom">
				<Button
					onClick={() => {
						toast.show({
							text: "Event completed",
							position: "bottom",
						});
					}}
				>
					Show toast
				</Button>
			</Example.Item>
			<Example.Item title="position: bottom-end">
				<Button
					onClick={() => {
						toast.show({
							text: "Event completed",
							position: "bottom-end",
						});
					}}
				>
					Show toast
				</Button>
			</Example.Item>
			<Example.Item title="position: top-start">
				<Button
					onClick={() => {
						toast.show({
							text: "Event completed",
							position: "top-start",
						});
					}}
				>
					Show toast
				</Button>
			</Example.Item>
			<Example.Item title="position: top">
				<Button
					onClick={() => {
						toast.show({
							text: "Event completed",
							position: "top",
						});
					}}
				>
					Show toast
				</Button>
			</Example.Item>
			<Example.Item title="position: top-end">
				<Button
					onClick={() => {
						toast.show({
							text: "Event completed",
							position: "top-end",
						});
					}}
				>
					Show toast
				</Button>
			</Example.Item>
		</Example>
	);
};
export const position = { name: "position", render: () => <Position /> };

const Color = () => {
	const toast = useToast();

	return (
		<Example>
			<Example.Item title="color: neutral">
				<Button
					onClick={() => {
						const id = toast.show({
							text: "Event completed",
							color: "neutral",
							title: "Hey!",
							icon: IconZap,
							actionsSlot: (
								<>
									<Button onClick={() => toast.hide(id)}>Undo</Button>
									<Button onClick={() => toast.hide(id)}>Hide</Button>
								</>
							),
						});
					}}
				>
					Show toast
				</Button>
			</Example.Item>
			<Example.Item title="color: primary">
				<Button
					onClick={() => {
						const id = toast.show({
							text: "Event completed",
							color: "primary",
							title: "Hey!",
							icon: IconZap,
							actionsSlot: (
								<>
									<Button onClick={() => toast.hide(id)}>Undo</Button>
									<Button onClick={() => toast.hide(id)}>Hide</Button>
								</>
							),
						});
					}}
				>
					Show toast
				</Button>
			</Example.Item>
			<Example.Item title="color: positive">
				<Button
					onClick={() => {
						const id = toast.show({
							text: "Event completed",
							color: "positive",
							title: "Hey!",
							icon: IconZap,
							actionsSlot: (
								<>
									<Button onClick={() => toast.hide(id)}>Undo</Button>
									<Button onClick={() => toast.hide(id)}>Hide</Button>
								</>
							),
						});
					}}
				>
					Show toast
				</Button>
			</Example.Item>
			<Example.Item title="color: critical">
				<Button
					onClick={() => {
						const id = toast.show({
							text: "Event completed",
							color: "critical",
							title: "Hey!",
							icon: IconZap,
							actionsSlot: (
								<>
									<Button onClick={() => toast.hide(id)}>Undo</Button>
									<Button onClick={() => toast.hide(id)}>Hide</Button>
								</>
							),
						});
					}}
				>
					Show toast
				</Button>
			</Example.Item>
			<Example.Item title="color: warning">
				<Button
					onClick={() => {
						const id = toast.show({
							text: "Event completed",
							color: "warning",
							title: "Hey!",
							icon: IconZap,
							timeout: 0,
							actionsSlot: (
								<>
									<Button onClick={() => toast.hide(id)}>Undo</Button>
									<Button onClick={() => toast.hide(id)}>Hide</Button>
								</>
							),
						});
					}}
				>
					Show toast
				</Button>
			</Example.Item>
		</Example>
	);
};

export const color = { name: "color", render: () => <Color /> };

const Timeout = () => {
	const toast = useToast();

	return (
		<Example>
			<Example.Item title="timeout: short">
				<Button
					onClick={() => {
						toast.show({
							text: "Event completed",
							timeout: "short",
						});
					}}
				>
					Show toast
				</Button>
			</Example.Item>
			<Example.Item title="timeout: long">
				<Button
					onClick={() => {
						toast.show({
							text: "Event completed",
							timeout: "long",
						});
					}}
				>
					Show toast
				</Button>
			</Example.Item>
			<Example.Item title="timeout: 0">
				<Button
					onClick={() => {
						toast.show({
							text: "Event completed",
							timeout: 0,
						});
					}}
				>
					Show toast
				</Button>
			</Example.Item>
		</Example>
	);
};
export const timeout = { name: "timeout", render: () => <Timeout /> };

const Width = () => {
	const toast = useToast();
	const counterRef = React.useRef(0);
	const widths = ["260px", "360px", "420px"] as const;

	return (
		<Example>
			<Example.Item title="width: literal">
				<Button
					onClick={() => {
						const width = widths[counterRef.current % widths.length];
						counterRef.current += 1;
						toast.show({
							title: `Toast width ${width}`,
							text: "Stack to inspect collapsed and expanded widths",
							width,
						});
					}}
				>
					Show next width toast
				</Button>
			</Example.Item>
			<Example.Item title="width: short">
				<Button
					onClick={() => {
						toast.show({
							title: "Short preset",
							text: "Uses default toast width",
							width: "short",
						});
					}}
				>
					Show short preset
				</Button>
			</Example.Item>
			<Example.Item title="width: long">
				<Button
					onClick={() => {
						toast.show({
							title: "Long preset",
							text: "Uses wider banner-like toast width",
							width: "long",
						});
					}}
				>
					Show long preset
				</Button>
			</Example.Item>
		</Example>
	);
};
export const width = { name: "width", render: () => <Width /> };

const Slots = () => {
	const toast = useToast();

	return (
		<Example>
			<Example.Item title="always expanded, promotion banner">
				<Button
					onClick={() => {
						const id = toast.show({
							children: (
								<View gap={3} direction="row">
									<View aspectRatio={1}>
										<Image
											height="100px"
											src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
											borderRadius="medium"
										/>
									</View>
									<View.Item grow>
										<View gap={1}>
											<Dismissible
												closeAriaLabel="Close notification"
												onClose={() => toast.hide(id)}
											>
												<Text variant="body-2" weight="bold">
													Look at this gradient!
												</Text>
											</Dismissible>
											<Text variant="body-2">
												If you start using more gradients, your product will become even more
												succesful.
											</Text>
										</View>
									</View.Item>
								</View>
							),
							color: "neutral",
							position: "bottom-start",
							timeout: 0,
						});
					}}
				>
					Show toast
				</Button>
			</Example.Item>
		</Example>
	);
};
export const slots = { name: "slots", render: () => <Slots /> };

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
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => {
		const toast = useToast();

		return (
			<Button
				onClick={() => {
					toast.show({
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

const Multiline = () => {
	const toast = useToast();

	return (
		<Button
			onClick={() => {
				toast.show({
					text: "Very long event completed notification message",
				});
			}}
		>
			Show toast
		</Button>
	);
};

const Nested = () => {
	const toast = useToast();

	return (
		<View height="300px" attributes={{ "data-testid": "test-container-id" }}>
			<Button
				onClick={() => {
					toast.show({
						text: "Notification sent",
					});
				}}
			>
				Show toast
			</Button>
		</View>
	);
};
export const edgeCases: StoryObj = {
	name: "test: edge cases",
	render: () => (
		<Example>
			<Example.Item title="Multiline, should support dynamic height">
				<Multiline />
			</Example.Item>

			<Example.Item title="Nested ToastProvider">
				<ToastProvider>
					<Nested />
				</ToastProvider>
			</Example.Item>
		</Example>
	),
};
