import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import ActionBar from "components/ActionBar";
import Button from "components/Button";
import View from "components/View";
import useToggle from "hooks/useToggle";
import { Placeholder, Example } from "utilities/storybook";

export default {
	title: "Components/ActionBar",
	component: ActionBar,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/action-bar",
		},
	},
};

const Fixtures = {
	Container: (props: React.PropsWithChildren) => (
		<View backgroundColor="neutral-faded" height="160px" overflow="hidden" borderRadius="medium">
			{props.children}
		</View>
	),
	Actions: () => (
		<View direction="row" gap={2}>
			<Button onClick={() => {}}>Action</Button>
			<Button onClick={() => {}} variant="outline">
				Action
			</Button>
		</View>
	),
};

export const positionRelative = {
	name: "position, positionType: relative",
	render: () => (
		<Example>
			<Example.Item title="position: top">
				<ActionBar position="top">
					<Placeholder />
				</ActionBar>
			</Example.Item>

			<Example.Item title="position: bottom">
				<ActionBar position="bottom">
					<Placeholder />
				</ActionBar>
			</Example.Item>
		</Example>
	),
};

export const positionAbsolute = {
	name: "position, positionType: absolute",
	render: () => (
		<Example>
			<Example.Item title="position: top-start">
				<Fixtures.Container>
					<ActionBar padding={2} position="top-start" positionType="absolute">
						<Fixtures.Actions />
					</ActionBar>
				</Fixtures.Container>
			</Example.Item>

			<Example.Item title="position: top">
				<Fixtures.Container>
					<ActionBar padding={2} position="top" positionType="absolute">
						<Fixtures.Actions />
					</ActionBar>
				</Fixtures.Container>
			</Example.Item>

			<Example.Item title="position: top-end">
				<Fixtures.Container>
					<ActionBar padding={2} position="top-end" positionType="absolute">
						<Fixtures.Actions />
					</ActionBar>
				</Fixtures.Container>
			</Example.Item>

			<Example.Item title="position: bottom-start">
				<Fixtures.Container>
					<ActionBar padding={2} position="bottom-start" positionType="absolute">
						<Fixtures.Actions />
					</ActionBar>
				</Fixtures.Container>
			</Example.Item>

			<Example.Item title="position: bottom">
				<Fixtures.Container>
					<ActionBar padding={2} position="bottom" positionType="absolute">
						<Fixtures.Actions />
					</ActionBar>
				</Fixtures.Container>
			</Example.Item>

			<Example.Item title="position: bottom-end">
				<Fixtures.Container>
					<ActionBar padding={2} position="bottom-end" positionType="absolute">
						<Fixtures.Actions />
					</ActionBar>
				</Fixtures.Container>
			</Example.Item>
		</Example>
	),
};

export const positionFixed = {
	name: "position, positionType: fixed",
	render: () => (
		<>
			<ActionBar padding={2} position="top-start" positionType="fixed">
				<Fixtures.Actions />
			</ActionBar>

			<ActionBar padding={2} position="top" positionType="fixed">
				<Fixtures.Actions />
			</ActionBar>

			<ActionBar padding={2} position="top-end" positionType="fixed">
				<Fixtures.Actions />
			</ActionBar>

			<ActionBar padding={2} position="bottom-start" positionType="fixed">
				<Fixtures.Actions />
			</ActionBar>

			<ActionBar padding={2} position="bottom" positionType="fixed">
				<Fixtures.Actions />
			</ActionBar>

			<ActionBar padding={2} position="bottom-end" positionType="fixed">
				<Fixtures.Actions />
			</ActionBar>

			<div style={{ height: 2000 }} />
		</>
	),
};

export const elevated = {
	name: "elevated",
	render: () => (
		<Example>
			<Example.Item title="elevated, position: top">
				<ActionBar position="top" elevated>
					<Placeholder />
				</ActionBar>
			</Example.Item>

			<Example.Item title="elevated, position: bottom">
				<ActionBar elevated>
					<Placeholder />
				</ActionBar>
			</Example.Item>

			<Example.Item title="auto elevated, position: bottom">
				<Fixtures.Container>
					<ActionBar position="bottom-end">
						<Fixtures.Actions />
					</ActionBar>
				</Fixtures.Container>
			</Example.Item>
		</Example>
	),
};

export const offset = {
	name: "offset",
	render: () => (
		<Example>
			<Example.Item title="offset 2, position: top">
				<Fixtures.Container>
					<ActionBar position="top" positionType="absolute" offset={2}>
						<Fixtures.Actions />
					</ActionBar>
				</Fixtures.Container>
			</Example.Item>

			<Example.Item title="offset 2, position: bottom-end">
				<Fixtures.Container>
					<ActionBar position="bottom-end" offset={2}>
						<Fixtures.Actions />
					</ActionBar>
				</Fixtures.Container>
			</Example.Item>

			<Example.Item title="offset s: 2, m: 4, position: bottom-end">
				<Fixtures.Container>
					<ActionBar position="bottom-end" offset={{ s: 2, m: 4 }}>
						<Fixtures.Actions />
					</ActionBar>
				</Fixtures.Container>
			</Example.Item>
		</Example>
	),
};

export const active = {
	name: "active",
	render: () => {
		const barToggle = useToggle();

		return (
			<>
				<Button onClick={() => barToggle.toggle()}>Toggle</Button>
				<ActionBar active={barToggle.active} positionType="fixed" position="top-end">
					<Fixtures.Actions />
				</ActionBar>
			</>
		);
	},
};

export const padding = {
	name: "padding, paddingBlock, paddingInline",
	render: () => (
		<Example>
			<Example.Item title="padding: 6">
				<ActionBar padding={6}>
					<Placeholder />
				</ActionBar>
			</Example.Item>

			<Example.Item title="paddingBlock: 2, paddingInline: 4">
				<ActionBar paddingBlock={2} paddingInline={4}>
					<Placeholder />
				</ActionBar>
			</Example.Item>

			<Example.Item title="padding: [s] 4, [m+] 6">
				<ActionBar padding={{ s: 4, m: 6 }}>
					<Placeholder />
				</ActionBar>
			</Example.Item>
		</Example>
	),
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<ActionBar className="test-classname" attributes={{ id: "test-id" }}>
				<Placeholder />
			</ActionBar>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
