import React from "react";
import { Example } from "utilities/storybook";
import { useToast } from "components/Toast";
import Button from "components/Button";
import View from "components/View";
import Image from "components/Image";
import Text from "components/Text";
import Dismissible from "components/Dismissible";
import IconZap from "icons/Zap";

export default { title: "Components/Toast" };

const Base = () => {
	const toast = useToast();
	return (
		<Button
			onClick={() => {
				const id = toast.show({
					icon: IconZap,
					title: "Hey!",
					text: "Event completed",
					actionsSlot: [
						<Button onClick={() => toast.hide(id)}>Undo</Button>,
						<Button onClick={() => toast.hide(id)}>Show</Button>,
					],
				});

				toast.hide(id);
			}}
		>
			Show toast
		</Button>
	);
};
export const base = () => (
	<Example>
		<Example.Item title="title, children, icon, actions">
			<Base />
		</Example.Item>
	</Example>
);

const Size = () => {
	const toast = useToast();
	const props = {
		icon: IconZap,
		title: "Hey!",
		text: "Event completed",
		actionsSlot: [<Button>Action</Button>],
	};

	return (
		<Example>
			<Example.Item title="size: small">
				<Button
					onClick={() => {
						toast.show({ ...props });
					}}
				>
					Show toast
				</Button>
			</Example.Item>
			<Example.Item title="size: medium">
				<Button
					onClick={() => {
						toast.show({ ...props, size: "medium" });
					}}
				>
					Show toast
				</Button>
			</Example.Item>
			<Example.Item title="large">
				<Button
					onClick={() => {
						toast.show({ ...props, size: "large" });
					}}
				>
					Show toast
				</Button>
			</Example.Item>
		</Example>
	);
};
export const size = () => <Size />;

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
export const position = () => <Position />;

const Color = () => {
	const toast = useToast();

	return (
		<Example>
			<Example.Item title="color: inverted">
				<Button
					onClick={() => {
						const id = toast.show({
							text: "Event completed",
							color: "inverted",
							title: "Hey!",
							icon: IconZap,
							actionsSlot: [<Button onClick={() => toast.hide(id)}>Close</Button>],
						});
					}}
				>
					Show toast
				</Button>
			</Example.Item>
			<Example.Item title="color: neutral">
				<Button
					onClick={() => {
						const id = toast.show({
							text: "Event completed",
							color: "neutral",
							title: "Hey!",
							icon: IconZap,
							actionsSlot: [<Button onClick={() => toast.hide(id)}>Close</Button>],
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
							actionsSlot: [<Button onClick={() => toast.hide(id)}>Close</Button>],
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
							actionsSlot: [<Button onClick={() => toast.hide(id)}>Close</Button>],
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
							actionsSlot: [<Button onClick={() => toast.hide(id)}>Close</Button>],
						});
					}}
				>
					Show toast
				</Button>
			</Example.Item>
		</Example>
	);
};
export const color = () => <Color />;

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
export const timeout = () => <Timeout />;

const Expanded = () => {
	const toast = useToast();

	return (
		<Example>
			<Example.Item title="Custom width coming from Reshaped provider for bottom-start">
				<Button
					onClick={() => {
						toast.show({
							text: "Event completed",
							position: "bottom-start",
						});
					}}
				>
					Show toast
				</Button>
			</Example.Item>
		</Example>
	);
};
export const regionOptions = () => <Expanded />;

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
											<Text variant="body-3">
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
export const slots = () => <Slots />;

const Multiline = () => {
	const toast = useToast();

	return (
		<Example>
			<Example.Item title="Multiline, should support dynamic height">
				<Button
					onClick={() => {
						toast.show({
							text: "Very long event completed notification message",
						});
					}}
				>
					Show toast
				</Button>
			</Example.Item>
		</Example>
	);
};
export const edgeCases = () => <Multiline />;
