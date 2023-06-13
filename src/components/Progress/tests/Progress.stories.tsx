import React from "react";
import { Example } from "utilities/storybook";
import View from "components/View";
import Progress from "components/Progress";
import Button from "components/Button";

export default { title: "Components/Progress" };

export const value = () => (
	<Example>
		<Example.Item title="value: 50">
			<Progress value={50} />
		</Example.Item>
		<Example.Item title="value: 20, min: 0, max: 40">
			<Progress value={20} min={0} max={40} />
		</Example.Item>
		<Example.Item title="value: 50, min: 0, max: 40">
			<Progress value={50} min={0} max={40} />
		</Example.Item>
	</Example>
);

export const size = () => (
	<Example>
		<Example.Item title="size: small, value: 50">
			<Progress value={50} size="small" />
		</Example.Item>
		<Example.Item title="size: medium, value: 50">
			<Progress value={50} size="medium" />
		</Example.Item>
	</Example>
);

export const color = () => (
	<Example>
		<Example.Item title="color: critical, value: 50">
			<Progress value={50} color="critical" />
		</Example.Item>
		<Example.Item title="color: positive, value: 50">
			<Progress value={50} color="positive" />
		</Example.Item>
		<Example.Item title="color: white, value: 50">
			<View padding={4} backgroundColor="black" borderRadius="medium">
				<Progress value={50} color="white" />
			</View>
		</Example.Item>
	</Example>
);

export const duration = () => {
	const [active, setActive] = React.useState(false);

	const handleChange = () => {
		setActive((state) => !state);
	};

	return (
		<Example>
			<Example.Item title="duration: 2000">
				<View gap={3}>
					<View.Item>
						<Button onClick={handleChange}>Change</Button>
					</View.Item>

					<Progress value={active ? 100 : 0} duration={2000} />
				</View>
			</Example.Item>
		</Example>
	);
};
