import View from "components/View";
import Image from "components/Image";
import NumberField from "components/NumberField";

export default {
	title: "Sandbox",
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
			<NumberField name="" decreaseAriaLabel="" increaseAriaLabel="" />
		</Preview>
	);
};
