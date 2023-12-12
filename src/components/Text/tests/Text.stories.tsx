import React from "react";
import { Example } from "utilities/storybook";
import Text from "components/Text";

export default { title: "Utilities/Text" };

export const variant = () => (
	<Example>
		<Example.Item title="variant: title-1">
			<Text variant="title-1">Title 1</Text>
		</Example.Item>
		<Example.Item title="variant: title-2">
			<Text variant="title-2">Title 2</Text>
		</Example.Item>
		<Example.Item title="variant: title-3">
			<Text variant="title-3">Title 3</Text>
		</Example.Item>
		<Example.Item title="variant: title-4">
			<Text variant="title-4">Title 4</Text>
		</Example.Item>
		<Example.Item title="variant: title-5">
			<Text variant="title-5">Title 5</Text>
		</Example.Item>
		<Example.Item title="variant: title-6">
			<Text variant="title-6">Title 6</Text>
		</Example.Item>
		<Example.Item title="variant: featured-1">
			<Text variant="featured-1">Featured 1</Text>
		</Example.Item>
		<Example.Item title="variant: featured-2">
			<Text variant="featured-2">Featured 2</Text>
		</Example.Item>
		<Example.Item title="variant: featured-3">
			<Text variant="featured-3">Featured 3</Text>
		</Example.Item>
		<Example.Item title="variant: body-1">
			<Text variant="body-1">Body 1</Text>
		</Example.Item>
		<Example.Item title="variant: body-2">
			<Text variant="body-2">Body 2</Text>
		</Example.Item>
		<Example.Item title="variant: body-3">
			<Text variant="body-3">Body 3</Text>
		</Example.Item>
		<Example.Item title="variant: caption-1">
			<Text variant="caption-1">Caption 1</Text>
		</Example.Item>
		<Example.Item title="variant: caption-2">
			<Text variant="caption-2">Caption 2</Text>
		</Example.Item>
		<Example.Item title={["responsive variant", "[s] body-3", "[m+] title-4"]}>
			<Text variant={{ s: "body-3", m: "title-4" }}>Responsive</Text>
		</Example.Item>
	</Example>
);

export const weight = () => (
	<Example>
		<Example.Item title="weight: regular">
			<Text weight="regular">Regular</Text>
		</Example.Item>
		<Example.Item title="weight: medium">
			<Text weight="medium">Medium</Text>
		</Example.Item>
		<Example.Item title="weight: bold">
			<Text weight="bold">Bold</Text>
		</Example.Item>
	</Example>
);

export const color = () => (
	<Example>
		<Example.Item title="color: inherit">
			<Text>Neutral</Text>
		</Example.Item>
		<Example.Item title="color: neutral-faded">
			<Text color="neutral-faded">Faded</Text>
		</Example.Item>
		<Example.Item title="color: positive">
			<Text color="positive">Positive</Text>
		</Example.Item>
		<Example.Item title="color: critical">
			<Text color="critical">Critical</Text>
		</Example.Item>
		<Example.Item title="color: primary">
			<Text color="primary">Primary</Text>
		</Example.Item>
		<Example.Item title="color: disabled">
			<Text color="disabled">Disabled</Text>
		</Example.Item>
	</Example>
);

export const decoration = () => (
	<Example>
		<Example.Item title="decoration: line-through">
			<Text decoration="line-through">Line through</Text>
		</Example.Item>
	</Example>
);

export const maxLines = () => (
	<Example>
		<Example.Item title="maxLines: 2">
			<Text maxLines={1}>
				There are many variations of passages of Lorem Ipsum available, but the majority have
				suffered alteration in some form, by injected humour, or randomised words which don't look
				even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be
				sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum
				generators on the Internet tend to repeat predefined chunks as necessary, making this the
				first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined
				with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.
				The generated Lorem Ipsum is therefore always free from repetition, injected humour, or
				non-characteristic words etc.
			</Text>
		</Example.Item>
	</Example>
);

export const align = () => (
	<Example>
		<Example.Item title="align: start">
			<Text align="start">Text content</Text>
		</Example.Item>
		<Example.Item title="align: center">
			<Text align="center">Text content</Text>
		</Example.Item>
		<Example.Item title="align: end">
			<Text align="end">Text content</Text>
		</Example.Item>

		<Example.Item title={["responsive alignment", "[s]: center", "[m+] start"]}>
			<Text align={{ s: "center", m: "start" }}>Text content</Text>
		</Example.Item>
	</Example>
);
