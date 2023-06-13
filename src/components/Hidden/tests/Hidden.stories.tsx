import React from "react";
import { Example } from "utilities/storybook";
import Hidden from "components/Hidden";

export default { title: "Utilities/Hidden" };

export const visibility = () => (
	<Example>
		<Example.Item title="hide: always">
			<Hidden hide={true}>Content</Hidden>
		</Example.Item>
		<Example.Item title="shown on s">
			<Hidden hide={{ s: false, m: true }}>Content</Hidden>
		</Example.Item>
		<Example.Item title="shown on l/xl">
			<Hidden hide={{ s: true, l: false }}>Content</Hidden>
		</Example.Item>
		<Example.Item title="shown on m/l/xl">
			<Hidden hide={{ s: true, m: false }}>Content</Hidden>
		</Example.Item>
		<Example.Item title="shown on m">
			<Hidden hide={{ s: true, m: false, l: true }}>Content</Hidden>
		</Example.Item>
		<Example.Item title="shown on s/xl">
			<Hidden hide={{ s: false, m: true, xl: false }}>Content</Hidden>
		</Example.Item>
	</Example>
);

export const inline = () => (
	<Example>
		<Example.Item title="inline, shown on s">
			<div>
				Hello&nbsp;
				<Hidden hide={{ s: false, m: true }} displayStyle="inline">
					world
				</Hidden>
			</div>
		</Example.Item>
		<Example.Item title="flex, shown on s">
			<Hidden hide={{ s: false, m: true }} displayStyle="flex">
				world
			</Hidden>
		</Example.Item>
	</Example>
);
