import { Example } from "utilities/storybook";
import Splitter from "components/Splitter";
import View from "components/View";
import Button from "components/Button";

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
					<Splitter height="100%" direction="column">
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
						<Splitter.Handle>
							{(attributes) => (
								<View
									backgroundColor="primary-faded"
									padding={1}
									align="center"
									borderRadius="small"
								>
									<View.Item>
										<Button attributes={attributes} type="button">
											Drag me
										</Button>
									</View.Item>
								</View>
							)}
						</Splitter.Handle>
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
				</Splitter.Item>
			</Splitter>
		</Example.Item>
	</Example>
);
