import View from "components/View";
import Image from "components/Image";
import FormControl from "components/FormControl";
import Autocomplete from "components/Autocomplete";
import { useState } from "react";

export default {
	title: "Sandbox",
};

export const preview = () => {
	const [value, setValue] = useState("");

	return (
		<View padding={20}>
			<View position="absolute" insetTop={0} insetStart={0}>
				<Image src="./logo.svg" />
			</View>

			<FormControl>
				<FormControl.Label>Food</FormControl.Label>
				<Autocomplete
					name="fruit"
					placeholder="Pick your food"
					value={value}
					onChange={(args) => setValue(args.value)}
				>
					{["Pizza", "Pie", "Ice-cream"].map((v) => {
						return (
							<Autocomplete.Item key={v} value={v} disabled={v === "Pie"}>
								{v}
							</Autocomplete.Item>
						);
					})}
				</Autocomplete>
			</FormControl>
		</View>
	);
};
