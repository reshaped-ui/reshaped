import { Example } from "utilities/storybook";
import Breadcrumbs from "components/Breadcrumbs";
import Badge from "components/Badge";
import IconZap from "icons/Zap";

export default {
	title: "Components/Breadcrumbs",
	component: Breadcrumbs,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/breadcrumbs",
		},
	},
};

export const color = {
	name: "color",
	render: () => (
		<Example>
			<Example.Item title="color: neutral">
				<Breadcrumbs ariaLabel="breadcrumb neutral">
					<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
					<Breadcrumbs.Item>Item 3</Breadcrumbs.Item>
				</Breadcrumbs>
			</Example.Item>

			<Example.Item title="color: primary">
				<Breadcrumbs color="primary" ariaLabel="breadcrumb primary">
					<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
					<Breadcrumbs.Item>Item 3</Breadcrumbs.Item>
				</Breadcrumbs>
			</Example.Item>
		</Example>
	),
};

export const item = {
	name: "item, disabled",
	render: () => (
		<Example>
			<Example.Item title="disabled item">
				<Breadcrumbs color="primary" ariaLabel="breadcrumb disabled">
					<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}} disabled>
						Disabled item 2
					</Breadcrumbs.Item>
					<Breadcrumbs.Item>Item 3</Breadcrumbs.Item>
				</Breadcrumbs>
			</Example.Item>
		</Example>
	),
};

export const icon = {
	name: "item, icon",
	render: () => (
		<Example>
			<Example.Item title="item with icon">
				<Breadcrumbs color="primary" ariaLabel="breadcrumb with icon">
					<Breadcrumbs.Item icon={IconZap} onClick={() => {}}>
						Item 1
					</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
					<Breadcrumbs.Item>Item 3</Breadcrumbs.Item>
				</Breadcrumbs>
			</Example.Item>
		</Example>
	),
};

export const slots = {
	name: "separator, children",
	render: () => (
		<Example>
			<Example.Item title="slot: separator">
				<Breadcrumbs color="primary" separator="/" ariaLabel="breadcrumb with separator">
					<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
					<Breadcrumbs.Item>Item 3</Breadcrumbs.Item>
				</Breadcrumbs>
			</Example.Item>

			<Example.Item title="custom child content">
				<Breadcrumbs ariaLabel="breadcrumb with custom children">
					<Breadcrumbs.Item onClick={() => {}}>
						<Badge>Item 1</Badge>
					</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>
						<Badge>Item 2</Badge>
					</Breadcrumbs.Item>
					<Breadcrumbs.Item>Item 3</Breadcrumbs.Item>
				</Breadcrumbs>
			</Example.Item>
		</Example>
	),
};

export const collapsed = {
	name: "collapse",
	render: () => (
		<Example>
			<Example.Item title="collapsed, 3 items shown by default">
				<Breadcrumbs
					defaultVisibleItems={3}
					ariaLabel="breadcrumbs one"
					expandAriaLabel="Expand items"
				>
					<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 3</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 4</Breadcrumbs.Item>
					<Breadcrumbs.Item>Item 5</Breadcrumbs.Item>
				</Breadcrumbs>
			</Example.Item>

			<Example.Item title="collapsed, 4 items shown by default">
				<Breadcrumbs
					defaultVisibleItems={4}
					ariaLabel="breadcrumb two"
					expandAriaLabel="Expand items"
				>
					<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 3</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 4</Breadcrumbs.Item>
					<Breadcrumbs.Item>Item 5</Breadcrumbs.Item>
				</Breadcrumbs>
			</Example.Item>

			<Example.Item title="collapsed, 3 items shown by default, not expandable">
				<Breadcrumbs defaultVisibleItems={3} ariaLabel="breadcrumb three" disableExpand>
					<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 3</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 4</Breadcrumbs.Item>
					<Breadcrumbs.Item>Item 5</Breadcrumbs.Item>
				</Breadcrumbs>
			</Example.Item>
		</Example>
	),
};

export const multiline = {
	name: "composition, multiline",
	render: () => (
		<Example>
			<Example.Item title="wraps content when multiline">
				<Breadcrumbs ariaLabel="breadcrumb multiline">
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
						<Breadcrumbs.Item onClick={() => {}} key={i}>
							Item {i}
						</Breadcrumbs.Item>
					))}
				</Breadcrumbs>
			</Example.Item>
		</Example>
	),
};
