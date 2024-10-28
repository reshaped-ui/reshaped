import Card from "components/Card";
import Button from "components/Button";
import View from "components/View";
import MenuItem from "components/MenuItem";
import Theme, { useTheme } from "components/Theme";
import { Example } from "utilities/storybook";
import Reshaped from "components/Reshaped";

export default {
	title: "Utilities/Theme",
	component: Theme,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/theme",
		},
	},
};

const UncontrolledDemo = () => {
	const { setTheme, theme } = useTheme();

	return (
		<Button color="primary" onClick={() => setTheme(theme === "reshaped" ? "slate" : "reshaped")}>
			Toggle theme
		</Button>
	);
};

export const uncontrolled = () => {
	return (
		<Example>
			<Example.Item title="switches theme using useTheme hooks">
				<UncontrolledDemo />
			</Example.Item>
		</Example>
	);
};

const NestedOne = () => {
	const { invertColorMode } = useTheme();

	return (
		<Button color="primary" variant="faded" onClick={invertColorMode}>
			Slate
		</Button>
	);
};

export const nestedReshaped = () => {
	const { invertColorMode } = useTheme();

	return (
		<Example>
			<Example.Item title="reshaped + nested slate">
				<View gap={2} direction="row">
					<Button color="primary" variant="faded" onClick={invertColorMode}>
						Reshaped
					</Button>
					<Reshaped theme="slate" scoped>
						<NestedOne />
					</Reshaped>
				</View>
			</Example.Item>
		</Example>
	);
};

const Demo = () => {
	const { invertColorMode } = useTheme();

	return (
		<View gap={3}>
			<Button onClick={invertColorMode}>Invert mode</Button>

			<MenuItem selected>Test transition</MenuItem>

			<Card>Default card</Card>

			<Theme colorMode="inverted">
				<Card>Inverted card</Card>
			</Theme>
		</View>
	);
};

export const edgeCases = () => (
	<Example>
		<Example.Item title="should have no transitions while switching color mode">
			<Demo />
		</Example.Item>
	</Example>
);
