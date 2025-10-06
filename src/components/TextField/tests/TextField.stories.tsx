import { Example, Placeholder } from "utilities/storybook";
import IconZap from "icons/Zap";
import TextField from "components/TextField";
import FormControl from "components/FormControl";
import View from "components/View";
import Text from "components/Text";
import Button from "components/Button";
import Badge from "components/Badge";

export default {
	title: "Components/TextField",
	component: TextField,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/text-field",
		},
	},
};

export const value = () => (
	<Example>
		<Example.Item title="no value, placeholder">
			<TextField name="Name" placeholder="Enter your name" />
		</Example.Item>

		<Example.Item title="value, uncontrolled">
			<TextField name="Name" defaultValue="Reshaped" placeholder="Enter your name" />
		</Example.Item>

		<Example.Item title="value, controlled">
			<TextField name="Name" value="Reshaped" placeholder="Enter your name" />
		</Example.Item>
	</Example>
);

export const variants = () => (
	<Example>
		<Example.Item title="variant: faded">
			<TextField variant="faded" name="Name" placeholder="Enter your name" />
		</Example.Item>

		<Example.Item title="variant: headless">
			<TextField variant="headless" name="Name" placeholder="Enter your name" />
		</Example.Item>
	</Example>
);

export const rounded = () => (
	<Example>
		<Example.Item title="rounded">
			<TextField
				rounded
				name="Name"
				placeholder="Enter your name"
				icon={IconZap}
				prefix="+31"
				endSlot={<Button rounded size="small" icon={IconZap} />}
			/>
		</Example.Item>

		<Example.Item title="rounded, variant: faded">
			<View direction="row" gap={2}>
				<View.Item grow>
					<TextField
						rounded
						variant="faded"
						name="Name"
						placeholder="Enter your name"
						startSlot={
							<Badge rounded size="small">
								Hello
							</Badge>
						}
					/>
				</View.Item>
				<Button rounded>Submit</Button>
			</View>
		</Example.Item>
	</Example>
);

export const disabled = () => (
	<Example>
		<Example.Item title="disabled, no value">
			<TextField name="Name" placeholder="Enter your name" disabled />
		</Example.Item>
		<Example.Item title="disabled, value">
			<TextField name="Name" placeholder="Enter your name" disabled value="Reshaped" />
		</Example.Item>
	</Example>
);

export const error = () => (
	<Example>
		<Example.Item title="error">
			<TextField name="Name" placeholder="Enter your name" hasError />
		</Example.Item>
	</Example>
);

export const attachments = () => (
	<Example>
		<Example.Item title="icon">
			<TextField name="Name" placeholder="Enter your name" value="Reshaped" icon={IconZap} />
		</Example.Item>
		<Example.Item title="endIcon">
			<TextField name="Name" placeholder="Enter your name" value="Reshaped" endIcon={IconZap} />
		</Example.Item>

		<Example.Item title="width affixes">
			<TextField
				name="Name"
				placeholder="Enter your name"
				value="Reshaped"
				endIcon={IconZap}
				icon={IconZap}
				prefix="Estimated value"
				suffix="m2"
			/>
		</Example.Item>

		<Example.Item title="multine">
			<TextField
				name="Name"
				placeholder="Enter your name"
				value="Reshaped"
				endIcon={IconZap}
				icon={IconZap}
				prefix="Estimated value"
				suffix="m2"
				multiline
			/>
		</Example.Item>
	</Example>
);

export const size = () => (
	<Example>
		<Example.Item title="size: small">
			<TextField name="Name" placeholder="Enter your name" size="small" icon={IconZap} />
		</Example.Item>

		<Example.Item title="size: medium">
			<TextField name="Name" placeholder="Enter your name" size="medium" icon={IconZap} />
		</Example.Item>

		<Example.Item title="size: large">
			<TextField name="Name" placeholder="Enter your name" size="large" icon={IconZap} />
		</Example.Item>

		<Example.Item title="size: xlarge">
			<TextField name="Name" placeholder="Enter your name" size="xlarge" icon={IconZap} />
		</Example.Item>

		<Example.Item title={["responsive size", "[s] xlarge", "[m+] medium"]}>
			<TextField
				name="Name"
				placeholder="Enter your name"
				size={{ s: "xlarge", m: "medium" }}
				icon={IconZap}
			/>
		</Example.Item>
	</Example>
);

export const affixes = () => (
	<Example>
		<Example.Item title="prefix">
			<TextField name="phone" placeholder="Enter your phone number" value="Reshaped" prefix="+31" />
		</Example.Item>

		<Example.Item title="suffix">
			<TextField name="area" placeholder="Enter your room ara" value="25" suffix="m2" />
		</Example.Item>
	</Example>
);

export const slots = () => (
	<Example>
		<Example.Item title={["startSlot", "vertical and horizontal padding aligned"]}>
			<TextField
				name="Name"
				placeholder="Enter your name"
				value="Reshaped"
				startSlot={<Placeholder h={20} />}
			/>
		</Example.Item>
		<Example.Item title={["endSlot", "vertical and horizontal padding aligned"]}>
			<TextField
				name="Name"
				placeholder="Enter your name"
				value="Reshaped"
				endSlot={
					<Button
						icon={IconZap}
						size="small"
						onClick={() => {}}
						attributes={{ "aria-label": "Action" }}
					/>
				}
			/>
		</Example.Item>
		<Example.Item title="multiline wrap">
			<TextField
				name="Name"
				placeholder="Enter your name"
				value="Reshaped"
				startSlot={[...Array(10).keys()].map((i) => (
					<Badge size="small" key={i}>
						Item {i + 1}
					</Badge>
				))}
				multiline
			/>
		</Example.Item>
	</Example>
);

export const formControl = () => (
	<Example>
		<Example.Item title="with helper">
			<FormControl>
				<FormControl.Label>Name</FormControl.Label>
				<TextField name="name" placeholder="Enter your name" />
				<FormControl.Helper>Helper</FormControl.Helper>
				<FormControl.Error>This field is required</FormControl.Error>
			</FormControl>
		</Example.Item>
		<Example.Item title="with error">
			<FormControl hasError>
				<FormControl.Label>Name</FormControl.Label>
				<TextField name="name" placeholder="Enter your name" />
				<FormControl.Error>This field is required</FormControl.Error>
			</FormControl>
		</Example.Item>
	</Example>
);

export const aligner = () => (
	<Example>
		<Example.Item title="aligner">
			<View gap={2}>
				<Text variant="featured-2">What problem are you trying to solve?</Text>
				<TextField.Aligner>
					<TextField
						variant="headless"
						placeholder="Try something like 'I have a job'"
						name="description"
					/>
				</TextField.Aligner>
				<View.Item>
					<Button>Next</Button>
				</View.Item>
			</View>
		</Example.Item>
	</Example>
);
