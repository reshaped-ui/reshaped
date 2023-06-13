import React from "react";
import { Example } from "utilities/storybook";
import Breadcrumbs from "components/Breadcrumbs";
import Badge from "components/Badge";
import Link from "components/Link";
import IconZap from "icons/Zap";

export default { title: "Components/Breadcrumbs" };

export const color = () => (
	<Example>
		<Example.Item title="color: neutral">
			<Breadcrumbs>
				<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
				<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
				<Breadcrumbs.Item>Item 3</Breadcrumbs.Item>
			</Breadcrumbs>
		</Example.Item>

		<Example.Item title="color: primary">
			<Breadcrumbs color="primary">
				<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
				<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
				<Breadcrumbs.Item>Item 3</Breadcrumbs.Item>
			</Breadcrumbs>
		</Example.Item>
	</Example>
);

export const item = () => (
	<Example>
		<Example.Item title="disabled item">
			<Breadcrumbs color="primary">
				<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
				<Breadcrumbs.Item onClick={() => {}} disabled>
					Disabled item 2
				</Breadcrumbs.Item>
				<Breadcrumbs.Item>Item 3</Breadcrumbs.Item>
			</Breadcrumbs>
		</Example.Item>

		<Example.Item title="item with icon">
			<Breadcrumbs color="primary">
				<Breadcrumbs.Item icon={IconZap} onClick={() => {}}>
					Item 1
				</Breadcrumbs.Item>
				<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
				<Breadcrumbs.Item>Item 3</Breadcrumbs.Item>
			</Breadcrumbs>
		</Example.Item>
	</Example>
);

export const slots = () => (
	<Example>
		<Example.Item title="slot: separator">
			<Breadcrumbs color="primary" separator="/">
				<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
				<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
				<Breadcrumbs.Item>Item 3</Breadcrumbs.Item>
			</Breadcrumbs>
		</Example.Item>

		<Example.Item title="custom child content">
			<Breadcrumbs>
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
);

export const collapsed = () => (
	<Example>
		<Example.Item title="collapsed, 3 items shown by default">
			<Breadcrumbs defaultVisibleItems={3}>
				<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
				<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
				<Breadcrumbs.Item onClick={() => {}}>Item 3</Breadcrumbs.Item>
				<Breadcrumbs.Item onClick={() => {}}>Item 4</Breadcrumbs.Item>
				<Breadcrumbs.Item>Item 5</Breadcrumbs.Item>
			</Breadcrumbs>
		</Example.Item>

		<Example.Item title="collapsed, 4 items shown by default">
			<Breadcrumbs defaultVisibleItems={4}>
				<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
				<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
				<Breadcrumbs.Item onClick={() => {}}>Item 3</Breadcrumbs.Item>
				<Breadcrumbs.Item onClick={() => {}}>Item 4</Breadcrumbs.Item>
				<Breadcrumbs.Item>Item 5</Breadcrumbs.Item>
			</Breadcrumbs>
		</Example.Item>
	</Example>
);

export const edgeCases = () => (
	<Example>
		<Example.Item title="wraps content when multiline">
			<Breadcrumbs>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
					<Breadcrumbs.Item onClick={() => {}} key={i}>
						Item {i}
					</Breadcrumbs.Item>
				))}
			</Breadcrumbs>
		</Example.Item>
	</Example>
);
