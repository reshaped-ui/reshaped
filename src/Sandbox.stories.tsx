import View from "components/View";
import Image from "components/Image";
import Checkbox from "components/Checkbox";

export default {
	title: "Sandbox",
};

const Preview = (props: { children: React.ReactNode }) => {
	return (
		<View padding={20} gap={6}>
			<View position="absolute" insetTop={0} insetStart={0}>
				<Image src="./logo.svg" />
			</View>

			{props.children}
		</View>
	);
};

export const preview = () => {
	return (
		<Preview>
			<View gap={4} direction="row">
				<View.Item grow>
					<Checkbox name="animal" value="dog" size="small">
						Checkbox
					</Checkbox>
				</View.Item>
				<View.Item grow>
					<Checkbox name="animal" value="dog" size="small" indeterminate>
						Checkbox
					</Checkbox>
				</View.Item>
			</View>

			<View gap={4} direction="row">
				<View.Item grow>
					<Checkbox name="animal" value="dog" size="medium">
						Checkbox
					</Checkbox>
				</View.Item>
				<View.Item grow>
					<Checkbox name="animal" value="dog" size="medium" indeterminate>
						Checkbox
					</Checkbox>
				</View.Item>
			</View>

			<View.Item gapBefore={8}>
				<View gap={4} direction="row">
					<View.Item grow>
						<Checkbox name="animal" value="dog" size="large">
							Checkbox
						</Checkbox>
					</View.Item>
					<View.Item grow>
						<Checkbox name="animal" value="dog" size="large" indeterminate>
							Checkbox
						</Checkbox>
					</View.Item>
				</View>
			</View.Item>
		</Preview>
	);
};
