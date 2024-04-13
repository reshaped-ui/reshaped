import { Example } from "utilities/storybook";
import PinField from "components/PinField";
import FormControl from "components/FormControl";

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
			<PinField name="pin" />
		</Example.Item>

		<Example.Item title="defaultValue: 12">
			<PinField name="pin2" defaultValue="12" />
		</Example.Item>

		<Example.Item title="value: 12">
			<PinField name="pin3" value="12" />
		</Example.Item>

		<Example.Item title="defaultValue: 12, valueLength: 6">
			<PinField name="pin4" defaultValue="12" valueLength={6} />
		</Example.Item>

		<Example.Item title="defaultValue: ab, charPattern: alphabetic">
			<PinField name="pin5" defaultValue="ab" pattern="alphabetic" />
		</Example.Item>

		<Example.Item title="defaultValue: ab, charPattern: alphanumeric">
			<PinField name="pin6" defaultValue="ab" pattern="alphanumeric" />
		</Example.Item>
	</Example>
);

export const variant = () => (
	<Example>
		<Example.Item title="variant: faded">
			<PinField name="pin" variant="faded" />
		</Example.Item>
	</Example>
);

export const size = () => (
	<Example>
		<Example.Item title="size: large">
			<PinField name="pin" size="large" />
		</Example.Item>

		<Example.Item title="size: xlarge">
			<PinField name="pin" size="xlarge" />
		</Example.Item>

		<Example.Item title="size: responsive, s: medium, m+: xlarge">
			<PinField name="pin" size={{ s: "medium", m: "xlarge" }} />
		</Example.Item>
	</Example>
);

export const formControl = () => (
	<Example>
		<Example.Item title="with form control">
			<FormControl>
				<FormControl.Label>Label</FormControl.Label>
				<PinField name="pin" />
			</FormControl>
		</Example.Item>
	</Example>
);
