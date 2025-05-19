import View from "components/View";
import Image from "components/Image";
import Text from "components/Text";
import DropdownMenu from "components/DropdownMenu";
import Select from "components/Select";
import TextField from "components/TextField";
import { ReactNode, useState } from "react";
import Button from "components/Button";
import FormControl from "components/FormControl";
import Skeleton from "components/Skeleton";
import Modal from "components/Modal";

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
			<Button onClick={() => {}}>Hello</Button>
		</Preview>
	);
};
