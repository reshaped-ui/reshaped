import { Example } from "utilities/storybook";
import Tooltip from "components/Tooltip";
import Button from "components/Button";
import View from "components/View";

export default {
	title: "Components/Tooltip",
	component: Tooltip,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/tooltip",
		},
	},
};

const Demo = (props: any) => {
	const { position, ...rest } = props;

	return (
		<Tooltip text={position} position={position} {...rest}>
			{(attributes) => <Button attributes={attributes}>Show tooltip</Button>}
		</Tooltip>
	);
};

export const position = () => (
	<Example>
		<Example.Item title="position: bottom-start">
			<Demo position="bottom-start" />
		</Example.Item>
		<Example.Item title="position: bottom">
			<Demo position="bottom" />
		</Example.Item>
		<Example.Item title="position: bottom-end">
			<Demo position="bottom-end" />
		</Example.Item>
		<Example.Item title="position: top-start">
			<Demo position="top-start" />
		</Example.Item>
		<Example.Item title="position: top">
			<Demo position="top" />
		</Example.Item>
		<Example.Item title="position: top-end">
			<Demo position="top-end" />
		</Example.Item>

		<Example.Item title="position: start">
			<View align="end">
				<Demo position="start" />
			</View>
		</Example.Item>

		<Example.Item title="position: end">
			<Demo position="end" />
		</Example.Item>
	</Example>
);

export const controlled = () => (
	<Example>
		<Example.Item title="active, controlled, position: bottom">
			<Demo position="bottom" active />
		</Example.Item>
	</Example>
);

export const edgeCases = () => (
	<Example>
		<Example.Item title="without text">
			<Tooltip>{() => <Button>Button</Button>}</Tooltip>
		</Example.Item>
	</Example>
);
