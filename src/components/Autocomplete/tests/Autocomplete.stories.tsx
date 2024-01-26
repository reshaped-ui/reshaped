import React from "react";
import { Example } from "utilities/storybook";
import Autocomplete from "components/Autocomplete";
import Loader from "components/Loader";
import View from "components/View";

export default {
	title: "Components/Autocomplete",
	component: Autocomplete,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/autocomplete",
		},
	},
};

const Demo = () => {
	const [value, setValue] = React.useState("");

	return (
		<Autocomplete
			name="fruit"
			value={value}
			placeholder="Pick your food"
			onChange={(args) => setValue(args.value)}
		>
			{["Pizza", "Pie", "Ice-cream"].map((v) => {
				if (!v.toLowerCase().includes(value.toLowerCase())) return;

				return (
					<Autocomplete.Item key={v} value={v}>
						{v}
					</Autocomplete.Item>
				);
			})}
		</Autocomplete>
	);
};

const DemoAsync = () => {
	const [value, setValue] = React.useState("");
	const [loading, setLoading] = React.useState(false);

	return (
		<Autocomplete
			name="fruit"
			value={value}
			placeholder="Pick your food"
			onChange={({ value }) => {
				setLoading(true);
				setTimeout(() => {
					setLoading(false);
				}, 500);
				setValue(value);
			}}
		>
			{loading ? (
				<View align="center" justify="center" padding={4}>
					<Loader />
				</View>
			) : (
				["Pizza", "Pie", "Ice-cream"].map((v) => {
					if (!v.toLowerCase().includes(value.toLowerCase())) return;

					return (
						<Autocomplete.Item key={v} value={v}>
							{v}
						</Autocomplete.Item>
					);
				})
			)}
		</Autocomplete>
	);
};

export const base = () => (
	<Example>
		<Example.Item title="Default">
			<Demo />
		</Example.Item>
		<Example.Item title="Async, should keep focus on the first item after reload">
			<DemoAsync />
		</Example.Item>
	</Example>
);
