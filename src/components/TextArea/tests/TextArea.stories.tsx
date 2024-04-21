import { Example } from "utilities/storybook";
import TextArea from "components/TextArea";
import FormControl from "components/FormControl";
import View from "components/View";
import Button from "components/Button";
import Text from "components/Text";
import TextField from "components/TextField";

export default {
	title: "Components/TextArea",
	component: TextArea,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/text-area",
		},
	},
};

export const value = () => (
	<Example>
		<Example.Item title="no value, placeholder">
			<View gap={4}>
				<TextField placeholder="hello" name="22" />
				<TextArea name="Name" placeholder="Enter your name" />
			</View>
		</Example.Item>
		<Example.Item title="value, uncontrolled">
			<TextArea name="Name" placeholder="Enter your name" defaultValue="Reshaped" />
		</Example.Item>
		<Example.Item title="value, controlled">
			<TextArea name="Name" placeholder="Enter your name" value="Reshaped" />
		</Example.Item>
	</Example>
);

export const variants = () => (
	<Example>
		<Example.Item title="variant: faded">
			<TextArea variant="faded" name="Name" placeholder="Enter your name" />
		</Example.Item>

		<Example.Item title="variant: headless">
			<TextArea variant="headless" name="Name" placeholder="Enter your name" />
		</Example.Item>
	</Example>
);

export const size = () => (
	<Example>
		<Example.Item title="size: medium">
			<TextArea name="Name" placeholder="Enter your name" size="medium" />
		</Example.Item>

		<Example.Item title="size: large">
			<TextArea name="Name" placeholder="Enter your name" size="large" />
		</Example.Item>

		<Example.Item title="size: xlarge">
			<TextArea name="Name" placeholder="Enter your name" size="xlarge" />
		</Example.Item>

		<Example.Item title={["responsive size", "[s] large", "[m+] medium"]}>
			<TextArea name="Name" placeholder="Enter your name" size={{ s: "xlarge", m: "medium" }} />
		</Example.Item>
	</Example>
);

export const resize = () => (
	<Example>
		<Example.Item title="resize: none">
			<TextArea name="Name" placeholder="Enter your name" resize="none" />
		</Example.Item>
		<Example.Item title="resize: auto">
			<TextArea name="Name" placeholder="Enter your name" resize="auto" />
		</Example.Item>
	</Example>
);

export const disabled = () => (
	<Example>
		<Example.Item title="disabled, no value">
			<TextArea name="Name" placeholder="Enter your name" disabled />
		</Example.Item>
		<Example.Item title="disabled, value">
			<TextArea name="Name" placeholder="Enter your name" disabled value="Reshaped" />
		</Example.Item>
	</Example>
);

export const error = () => (
	<Example>
		<Example.Item title="error">
			<TextArea name="Name" placeholder="Enter your name" hasError />
		</Example.Item>
	</Example>
);

export const formControl = () => (
	<Example>
		<Example.Item title="with helper">
			<FormControl>
				<FormControl.Label>Name</FormControl.Label>
				<TextArea name="name" placeholder="Enter your name" />
				<FormControl.Helper>Helper</FormControl.Helper>
				<FormControl.Error>This field is required</FormControl.Error>
			</FormControl>
		</Example.Item>
		<Example.Item title="with error">
			<FormControl hasError>
				<FormControl.Label>Name</FormControl.Label>
				<TextArea name="name" placeholder="Enter your name" />
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
				<TextArea.Aligner>
					<TextArea
						variant="headless"
						placeholder="Try something like 'I have a job'"
						name="description"
					/>
				</TextArea.Aligner>
				<View.Item>
					<Button>Next</Button>
				</View.Item>
			</View>
		</Example.Item>
	</Example>
);

export const edgeCases = () => (
	<Example>
		<Example.Item title="long value without breaks">
			<TextArea
				name="hey"
				defaultValue={`<div style="position:relative;width:100%;padding-top:calc(150% + 72px)">
	<iframe src="nskjdfdsdkjfsjkdfhbsjlhdfbsjlhfbs;jhbsdljfhsbljhfsbljhfbsjlfdhbsljhfbsdljhfbsljhfbslufbhsdlfds" />
</div>`}
				resize="auto"
			/>
		</Example.Item>
	</Example>
);
