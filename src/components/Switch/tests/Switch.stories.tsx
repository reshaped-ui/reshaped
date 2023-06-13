import React from "react";
import { Example } from "utilities/storybook";
import Switch from "components/Switch";

export default { title: "Components/Switch" };

export const selection = () => (
	<Example>
		<Example.Item title="unselected">
			<Switch name="active" />
		</Example.Item>
		<Example.Item title="selected, uncontrolled">
			<Switch name="active" defaultChecked />
		</Example.Item>
		<Example.Item title="selected, controlled">
			<Switch name="active" checked />
		</Example.Item>
	</Example>
);

export const size = () => (
	<Example>
		<Example.Item title="size: medium">
			<Switch name="active" size="medium" />
		</Example.Item>
		<Example.Item title="size: small">
			<Switch name="active" size="small" />
		</Example.Item>
	</Example>
);

export const label = () => (
	<Example>
		<Example.Item title="size: medium">
			<Switch name="active">Wi-fi</Switch>
		</Example.Item>
		<Example.Item title="size: small">
			<Switch name="active" size="small">
				Wi-fi
			</Switch>
		</Example.Item>
		<Example.Item title="size: medium, reversed">
			<Switch reversed name="active">
				Wi-fi
			</Switch>
		</Example.Item>
		<Example.Item title="size: small">
			<Switch reversed name="active" size="small">
				Wi-fi
			</Switch>
		</Example.Item>
	</Example>
);

export const disabled = () => (
	<Example>
		<Example.Item title="disabled, unselected">
			<Switch name="active" disabled />
		</Example.Item>
		<Example.Item title="disabled, selected">
			<Switch name="active" disabled defaultChecked />
		</Example.Item>
	</Example>
);
