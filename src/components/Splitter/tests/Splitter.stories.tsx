import { Example } from "utilities/storybook";
import Splitter from "components/Splitter";
import View from "components/View";

export default {
	title: "Components/Splitter",
	component: Splitter,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/splitter",
		},
	},
};

export const base = () => (
	<Example>
		<Example.Item>
			<Splitter height="300px">
				<Splitter.Item>
					<View
						backgroundColor="neutral-faded"
						borderRadius="medium"
						align="center"
						justify="center"
						height="100%"
					>
						Panel
					</View>
				</Splitter.Item>
				<Splitter.Handle />
				<Splitter.Item>
					<View
						backgroundColor="neutral-faded"
						borderRadius="medium"
						align="center"
						justify="center"
						height="100%"
					>
						Panel
					</View>
				</Splitter.Item>
				<Splitter.Handle />
				<Splitter.Item>
					<View
						backgroundColor="neutral-faded"
						borderRadius="medium"
						align="center"
						justify="center"
						height="100%"
					>
						Panel
					</View>
				</Splitter.Item>
			</Splitter>
		</Example.Item>
	</Example>
);
