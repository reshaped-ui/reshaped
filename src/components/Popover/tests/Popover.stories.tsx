import { Example } from "utilities/storybook";
import View from "components/View";
import Popover from "components/Popover";
import Button from "components/Button";

export default {
	title: "Components/Popover",
	component: Popover,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/popover",
		},
	},
};

const Demo = (props: any) => {
	const { position, ...rest } = props;
	return (
		<Popover position={position} {...rest}>
			<Popover.Trigger>
				{(attributes) => <Button attributes={attributes}>{position || "Open"}</Button>}
			</Popover.Trigger>
			<Popover.Content>
				<View gap={2} align="start">
					Popover content
					<Button onClick={() => {}}>Button</Button>
				</View>
			</Popover.Content>
		</Popover>
	);
};

export const position = () => (
	<Example>
		<Example.Item title="position: bottom">
			<View align="center" justify="center" gap={8} direction="row">
				<Demo position="bottom-start" />
				<Demo position="bottom" />
				<Demo position="bottom-end" />
			</View>
		</Example.Item>
		<Example.Item title="position: top">
			<View align="center" justify="center" gap={8} direction="row">
				<Demo position="top-start" />
				<Demo position="top" />
				<Demo position="top-end" />
			</View>
		</Example.Item>
		<Example.Item title="position: start">
			<View align="center" justify="center" gap={8} direction="row">
				<Demo position="start-top" />
				<Demo position="start" />
				<Demo position="start-bottom" />
			</View>
		</Example.Item>
		<Example.Item title="position: end">
			<View align="center" justify="center" gap={8} direction="row">
				<Demo position="end-top" />
				<Demo position="end" />
				<Demo position="end-bottom" />
			</View>
		</Example.Item>
		<Example.Item title={["position: bottom", "changes to top-start because it doesn't fit"]}>
			<View align="center">
				<Demo position="bottom" />
			</View>
		</Example.Item>
	</Example>
);

export const width = () => (
	<Example>
		<Example.Item title="width: 400">
			<Demo width="400px" />
		</Example.Item>
		<Example.Item title="width: 100%">
			<Demo width="100%" />
		</Example.Item>
	</Example>
);

export const variant = () => (
	<Example>
		<Example.Item title="variant: headless">
			<Popover variant="headless">
				<Popover.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</Popover.Trigger>
				<Popover.Content>
					<View
						height="100px"
						width="100px"
						borderColor="primary"
						borderRadius="medium"
						backgroundColor="neutral-faded"
					/>
				</Popover.Content>
			</Popover>
		</Example.Item>
	</Example>
);

export const padding = () => (
	<Example>
		<Example.Item title="padding: 0">
			<Demo padding={0} />
		</Example.Item>
		<Example.Item title="padding: 6">
			<Demo padding={6} />
		</Example.Item>
	</Example>
);

export const triggerType = () => (
	<Example>
		<Example.Item title="triggerType: hover">
			<Demo triggerType="hover" />
		</Example.Item>
	</Example>
);
