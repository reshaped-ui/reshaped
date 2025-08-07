import View from "components/View";
import Image from "components/Image";
import React from "react";
import Button from "components/Button";
import { useToast } from "components/Toast";

export default {
	title: "Sandbox",
	chromatic: { disableSnapshot: true },
};

const Preview: React.FC<{ children: React.ReactNode }> = (props) => {
	return (
		<View padding={20} gap={6}>
			<View position="absolute" insetTop={0} insetStart={0}>
				<Image src="./logo.svg" />
			</View>

			{props.children}
		</View>
	);
};

export const preview = () => {
	return (
		<Preview>
			<Component />
		</Preview>
	);
};

const Component = () => {
	const toast = useToast();

	return (
		<View align="center" direction="row" justify="center" gap={4} paddingTop={10}>
			<Button
				color="critical"
				onClick={() => {
					const id = toast.show({
						color: "neutral",
						text: "Product deleted",
						actionsSlot: <Button onClick={() => toast.hide(id)}>Undo</Button>,
					});
				}}
			>
				Delete product
			</Button>
			<Button variant="outline" onClick={() => {}}>
				Edit product
			</Button>
		</View>
	);
};
