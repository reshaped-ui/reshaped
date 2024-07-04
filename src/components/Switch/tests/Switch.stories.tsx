import { Example } from "utilities/storybook";
import Switch from "components/Switch";

export default {
	title: "Components/Switch",
	component: Switch,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/switch",
		},
	},
};

export const selection = () => (
	<Example>
		<Example.Item title="unselected">
			<Switch name="active" inputAttributes={{ "aria-label": "test switch" }} />
		</Example.Item>
		<Example.Item title="selected, uncontrolled">
			<Switch name="active" defaultChecked inputAttributes={{ "aria-label": "test switch" }} />
		</Example.Item>
		<Example.Item title="selected, controlled">
			<Switch name="active" checked inputAttributes={{ "aria-label": "test switch" }} />
		</Example.Item>
	</Example>
);

export const size = () => (
	<Example>
		<Example.Item title="size: medium">
			<Switch name="active" size="medium" inputAttributes={{ "aria-label": "test switch" }} />
		</Example.Item>
		<Example.Item title="size: small">
			<Switch name="active" size="small" inputAttributes={{ "aria-label": "test switch" }} />
		</Example.Item>
		<Example.Item title="size: large">
			<Switch name="active" size="large" inputAttributes={{ "aria-label": "test switch" }} />
		</Example.Item>
	</Example>
);

export const label = () => (
	<Example>
		<Example.Item title="size: medium">
			<Switch name="active" inputAttributes={{ "aria-label": "test switch" }}>
				Wi-fi
			</Switch>
		</Example.Item>
		<Example.Item title="size: small">
			<Switch name="active" size="small" inputAttributes={{ "aria-label": "test switch" }}>
				Wi-fi
			</Switch>
		</Example.Item>
		<Example.Item title="size: medium, reversed">
			<Switch reversed name="active" inputAttributes={{ "aria-label": "test switch" }}>
				Wi-fi
			</Switch>
		</Example.Item>
		<Example.Item title="size: small">
			<Switch reversed name="active" size="small" inputAttributes={{ "aria-label": "test switch" }}>
				Wi-fi
			</Switch>
		</Example.Item>
	</Example>
);

export const disabled = () => (
	<Example>
		<Example.Item title="disabled, unselected">
			<Switch name="active" disabled inputAttributes={{ "aria-label": "test switch" }} />
		</Example.Item>
		<Example.Item title="disabled, selected">
			<Switch
				name="active"
				disabled
				defaultChecked
				inputAttributes={{ "aria-label": "test switch" }}
			/>
		</Example.Item>
	</Example>
);
