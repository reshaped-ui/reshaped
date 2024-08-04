import { Example } from "utilities/storybook";
import Resizable from "components/Resizable";
import View from "components/View";
import Button from "components/Button";

export default {
	title: "Components/Resizable",
	component: Resizable,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/Resizable",
		},
	},
};

export const base = () => (
	<Example>
		<Example.Item>
			<Resizable height="300px" gap={4}>
				<Resizable.Item minSize="100px">
					<View
						backgroundColor="neutral-faded"
						borderRadius="medium"
						align="center"
						justify="center"
						height="100%"
					>
						Panel
					</View>
				</Resizable.Item>
				<Resizable.Handle />
				<Resizable.Item minSize="100px">
					<View
						backgroundColor="neutral-faded"
						borderRadius="medium"
						align="center"
						justify="center"
						height="100%"
					>
						Panel
					</View>
				</Resizable.Item>
				<Resizable.Handle />
				<Resizable.Item>
					<Resizable height="100%" direction="column">
						<Resizable.Item>
							<View
								backgroundColor="neutral-faded"
								borderRadius="medium"
								align="center"
								justify="center"
								height="100%"
							>
								Panel
							</View>
						</Resizable.Item>
						<Resizable.Handle />
						<Resizable.Item>
							<View
								backgroundColor="neutral-faded"
								borderRadius="medium"
								align="center"
								justify="center"
								height="100%"
							>
								Panel
							</View>
						</Resizable.Item>
						<Resizable.Handle>
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
						</Resizable.Handle>
						<Resizable.Item>
							<View
								backgroundColor="neutral-faded"
								borderRadius="medium"
								align="center"
								justify="center"
								height="100%"
							>
								Panel
							</View>
						</Resizable.Item>
					</Resizable>
				</Resizable.Item>
			</Resizable>
		</Example.Item>
	</Example>
);
