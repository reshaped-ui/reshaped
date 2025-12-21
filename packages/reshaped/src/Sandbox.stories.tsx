import React, { useState } from "react";

import Card from "components/Card";
import FormControl from "components/FormControl";
import HiddenInput from "components/HiddenInput";
import Image from "components/Image";
import RadioGroup from "components/RadioGroup";
import Text from "components/Text";
import View from "components/View";

export default {
	title: "Sandbox",
	chromatic: { disableSnapshot: true },
};

const Preview: React.FC<{ children: React.ReactNode }> = (props) => {
	return (
		<View padding={25} gap={6}>
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
			<Component />
		</Preview>
	);
};

const Component = () => {
	const [value, setValue] = useState<string>("");

	const options = [
		{
			value: "card",
			label: "Card",
		},
		{
			value: "apple-pay",
			label: "Apple Pay",
		},
		{
			value: "PayPal",
			label: "PayPal",
		},
	];

	return (
		<FormControl group>
			<FormControl.Label>Payment method</FormControl.Label>

			<RadioGroup name="payment-method" value={value} onChange={(args) => setValue(args.value)}>
				<View gap={2} direction="row">
					{options.map((option) => (
						<View.Item grow>
							<Card as="label" selected={value === option.value}>
								<HiddenInput type="radio" name="test-name" value={option.value} />
								<Text>{option.label}</Text>
							</Card>
						</View.Item>
					))}
				</View>
			</RadioGroup>
		</FormControl>
	);
};
