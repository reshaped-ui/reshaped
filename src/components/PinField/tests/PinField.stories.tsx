import { Example } from "utilities/storybook";
import PinField from "components/PinField";

export default {
	title: "Components/PinField",
	component: PinField,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/pin-field",
		},
	},
};

export const base = () => (
	<Example>
		<Example.Item title="no value">
			<PinField name="pin" inputAttributes={{ "aria-label": "Pin" }} />
		</Example.Item>

		<Example.Item title="defaultValue: 1234">
			<PinField name="pin2" defaultValue="1234" inputAttributes={{ "aria-label": "Pin" }} />
		</Example.Item>

		<Example.Item title="value: 12">
			<PinField name="pin3" value="12" inputAttributes={{ "aria-label": "Pin" }} />
		</Example.Item>

		<Example.Item title="defaultValue: 12, valueLength: 6">
			<PinField
				name="pin4"
				defaultValue="12"
				valueLength={6}
				inputAttributes={{ "aria-label": "Pin" }}
			/>
		</Example.Item>

		<Example.Item title="defaultValue: ab, charPattern: alphabetic">
			<PinField
				name="pin5"
				defaultValue="ab"
				pattern="alphabetic"
				inputAttributes={{ "aria-label": "Pin" }}
			/>
		</Example.Item>

		<Example.Item title="defaultValue: ab, charPattern: alphanumeric">
			<PinField
				name="pin6"
				defaultValue="ab"
				pattern="alphanumeric"
				inputAttributes={{ "aria-label": "Pin" }}
			/>
		</Example.Item>
	</Example>
);

export const variant = () => (
	<Example>
		<Example.Item title="variant: faded">
			<PinField name="pin" variant="faded" inputAttributes={{ "aria-label": "Pin" }} />
		</Example.Item>
	</Example>
);

export const size = () => (
	<Example>
		<Example.Item title="size: small">
			<PinField name="pin" size="small" inputAttributes={{ "aria-label": "Pin" }} />
		</Example.Item>

		<Example.Item title="size: medium">
			<PinField name="pin" size="medium" inputAttributes={{ "aria-label": "Pin" }} />
		</Example.Item>

		<Example.Item title="size: large">
			<PinField name="pin" size="large" inputAttributes={{ "aria-label": "Pin" }} />
		</Example.Item>

		<Example.Item title="size: xlarge">
			<PinField name="pin" size="xlarge" inputAttributes={{ "aria-label": "Pin" }} />
		</Example.Item>

		<Example.Item title="size: responsive, s: medium, m+: xlarge">
			<PinField
				name="pin"
				size={{ s: "medium", m: "xlarge" }}
				inputAttributes={{ "aria-label": "Pin" }}
			/>
		</Example.Item>
	</Example>
);
