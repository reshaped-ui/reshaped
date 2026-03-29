import React from "react";

import Button from "@/components/Button";
import Image from "@/components/Image";
import View from "@/components/View";

import { useToast } from "./components/Toast";

export default {
	title: "Sandbox",
	chromatic: { disableSnapshot: true },
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
	const widths = ["260px", "360px", "420px"] as const;
	const counterRef = React.useRef(0);
	const toast = useToast();

	return (
		<View align="center" justify="center" height="100%">
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
				Show notification
			</Button>
		</View>
	);
};
