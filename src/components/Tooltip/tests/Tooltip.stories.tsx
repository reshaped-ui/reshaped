import { Example } from "utilities/storybook";
import Tooltip from "components/Tooltip";
import Popover from "components/Popover";
import Button from "components/Button";
import View from "components/View";
import useResponsiveClientValue from "hooks/useResponsiveClientValue";
import Actionable from "components/Actionable";

export default {
	title: "Components/Tooltip",
	component: Tooltip,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/tooltip",
		},
	},
};

const Demo: React.FC<any> = (props) => {
	const { position, ...rest } = props;

	return (
		<Tooltip text={position} position={position} {...rest}>
			{(attributes) => <Button attributes={attributes}>Show tooltip</Button>}
		</Tooltip>
	);
};

const DemoResponsive: React.FC<any> = (props) => {
	const { position, ...rest } = props;
	const screenSize = useResponsiveClientValue({
		s: "small",
		m: "medium",
	});

	return (
		<Tooltip text={position} position={position} {...rest} active={screenSize === "small"}>
			{(attributes) => <Button attributes={attributes}>Show tooltip</Button>}
		</Tooltip>
	);
};

export const position = () => (
	<Example>
		<Example.Item title="position: bottom-start">
			<View direction="row" gap={2}>
				<Demo position="bottom-start" text="Tooltip 1" />
				<Demo position="bottom-start" text="Tooltip 2" />
				<Demo position="bottom-start" text="Tooltip 3" />
			</View>
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

		<Example.Item title="position: start-top">
			<View align="end">
				<Demo position="start-top" />
			</View>
		</Example.Item>

		<Example.Item title="position: start-bottom">
			<View align="end">
				<Demo position="start-bottom" />
			</View>
		</Example.Item>

		<Example.Item title="position: end">
			<Demo position="end" />
		</Example.Item>

		<Example.Item title="position: end-top">
			<Demo position="end-top" />
		</Example.Item>

		<Example.Item title="position: end-bottom">
			<Demo position="end-bottom" />
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
		<Example.Item title="responsive visibility">
			<DemoResponsive text="Responsive" />
		</Example.Item>

		<Example.Item title="without text">
			<Tooltip>{() => <Button>Button</Button>}</Tooltip>
		</Example.Item>

		<Example.Item title="tooltip with popover">
			<Tooltip text="Tooltip" position="top">
				{(attributes) => (
					<Popover position="bottom">
						<Popover.Trigger>
							{(popoverAttributes) => (
								<Button attributes={{ ...attributes, ...popoverAttributes }}>Action</Button>
							)}
						</Popover.Trigger>
						<Popover.Content>Popover</Popover.Content>
					</Popover>
				)}
			</Tooltip>
		</Example.Item>

		<Example.Item title="nested popovers inside a tooltip">
			<View direction="row" gap={2}>
				<Tooltip position="top" text="Hello">
					{(tooltipAttributes) => (
						<Popover position="bottom" width="300px">
							<Popover.Trigger>
								{(attributes) => (
									<Button attributes={{ ...tooltipAttributes, ...attributes }}>
										Tooltip with popover
									</Button>
								)}
							</Popover.Trigger>
							<Popover.Content>
								<View gap={2} align="center" direction="row" justify="space-between">
									Popover content
									<Popover position="bottom" width="300px">
										<Popover.Trigger>
											{(attributes) => <Button attributes={attributes}>Open</Button>}
										</Popover.Trigger>
										<Popover.Content>
											<Popover.Dismissible align="center" closeAriaLabel="Close">
												Another popover content
											</Popover.Dismissible>
										</Popover.Content>
									</Popover>
								</View>
							</Popover.Content>
						</Popover>
					)}
				</Tooltip>
				<Tooltip position="top" text="Hello">
					{(tooltipAttributes) => <Button attributes={tooltipAttributes}>Just a tooltip</Button>}
				</Tooltip>
			</View>
		</Example.Item>
	</Example>
);
