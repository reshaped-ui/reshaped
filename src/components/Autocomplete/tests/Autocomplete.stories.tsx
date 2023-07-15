import React from "react";
import { Example } from "utilities/storybook";
import Autocomplete from "components/Autocomplete";

export default { title: "Components/Autocomplete" };

const Demo = () => {
	const [value, setValue] = React.useState("");

	return (
		<Autocomplete
			name="fruit"
			value={value}
			placeholder="Pick your food"
			onChange={({ value }) => setValue(value)}
		>
			{["Pizza", "Pie", "Ice-cream"]
				.filter((v) => v.toLowerCase().includes(value.toLowerCase()))
				.map((v) => (
					<Autocomplete.Item key={v} value={v}>
						{v}
					</Autocomplete.Item>
				))}
		</Autocomplete>
	);
};

export const base = () => (
	<Example>
		<Example.Item title="Default">
			<Demo />
		</Example.Item>
	</Example>
);
