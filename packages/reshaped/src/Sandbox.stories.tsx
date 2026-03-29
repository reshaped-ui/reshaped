import { useToggle } from "@reshaped/headless";
import React from "react";

import Button from "@/components/Button";
import Dismissible from "@/components/Dismissible";
import Image from "@/components/Image";
import Modal from "@/components/Modal";
import TextField from "@/components/TextField";
import View from "@/components/View";

import type { ModalProps } from "@/components/Modal";

export default {
	title: "Sandbox",
	chromatic: { disableSnapshot: true },
};

const Demo: React.FC<ModalProps & { title?: string; subtitle?: string }> = (props) => {
	const { active: activeProp, title, subtitle, children, ...modalProps } = props;
	const { active, activate, deactivate } = useToggle(activeProp);

	return (
		<>
			<Button onClick={activate}>Open dialog</Button>
			<Modal {...modalProps} active={active} onClose={deactivate}>
				<View gap={3}>
					{(title || subtitle) && (
						<Dismissible onClose={deactivate} closeAriaLabel="Close modal">
							{title && <Modal.Title>{title}</Modal.Title>}
							{subtitle && <Modal.Subtitle>{subtitle}</Modal.Subtitle>}
						</Dismissible>
					)}
					{children ||
						"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."}
					<Button onClick={deactivate}>Close</Button>
					<TextField name="hey" />
					<View height="1000px" backgroundColor="neutral-faded" />
				</View>
			</Modal>
		</>
	);
};

const Preview: React.FC<{ children: React.ReactNode }> = (props) => {
	return (
		<View padding={25} gap={6}>
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
	return <Demo position="start" />;
};
