import { Example, Placeholder } from "utilities/storybook";
import Container from "components/Container";

export default {
	title: "Utilities/Container",
	component: Container,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/container",
		},
	},
};

export const padding = () => (
	<Example>
		<Example.Item title="padding: default">
			<Container>
				<Placeholder />
			</Container>
		</Example.Item>
		<Example.Item title="padding: 0">
			<Container padding={0}>
				<Placeholder />
			</Container>
		</Example.Item>
	</Example>
);

export const width = () => (
	<Example>
		<Example.Item title="width: 1024px">
			<Container width="1024px">
				<Placeholder />
			</Container>
		</Example.Item>
		<Example.Item title={["responsive width", "[s]: 400px", "[m+]: 600px"]}>
			<Container width={{ s: "400px", m: "600px" }}>
				<Placeholder />
			</Container>
		</Example.Item>
	</Example>
);

export const layout = () => (
	<Example>
		<Example.Item title="center">
			<Container align="center" justify="center" height="500px">
				<Placeholder />
			</Container>
		</Example.Item>
	</Example>
);
