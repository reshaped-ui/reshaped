import { Example } from "utilities/storybook";
import Tooltip from "components/Tooltip";
import Popover from "components/Popover";
import Button from "components/Button";
import View from "components/View";
import useResponsiveClientValue from "hooks/useResponsiveClientValue";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { StoryObj } from "@storybook/react-vite";

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

export const position = {
	name: "position",
	render: () => (
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
	),
};

export const color = {
	name: "color",
	render: () => (
		<Example>
			<Example.Item title="color: inverted">
				<Demo color="inverted" position="bottom" />
			</Example.Item>
			<Example.Item title="color: dark">
				<Demo color="dark" position="bottom" />
			</Example.Item>
		</Example>
	),
};

export const defaultActive: StoryObj<{
	handleOpen: ReturnType<typeof fn>;
	handleClose: ReturnType<typeof fn>;
}> = {
	name: "uncontrolled",
	args: {
		handleOpen: fn(),
		handleClose: fn(),
	},
	render: (args) => (
		<Tooltip text="Content" onOpen={args.handleOpen} onClose={args.handleClose}>
			{(attributes) => <Button attributes={attributes}>Trigger</Button>}
		</Tooltip>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.hover(trigger);

		await waitFor(() => {
			expect(args.handleOpen).toHaveBeenCalledTimes(1);
			expect(args.handleOpen).toHaveBeenCalledWith();
		});

		const item = canvas.getByText("Content");
		expect(item).toBeInTheDocument();

		await userEvent.unhover(trigger);

		await waitFor(() => {
			expect(args.handleClose).toHaveBeenCalledTimes(1);
			expect(args.handleClose).toHaveBeenCalledWith({});
			expect(item).not.toBeInTheDocument();
		});
	},
};

export const edgeCases = {
	name: "test: edge cases",
	render: () => (
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
	),
};
