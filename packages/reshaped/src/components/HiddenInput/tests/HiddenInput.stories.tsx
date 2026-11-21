import { StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import Badge from "@/components/Badge";
import CheckboxGroup from "@/components/CheckboxGroup";
import HiddenInput from "@/components/HiddenInput";
import RadioGroup from "@/components/RadioGroup";
import View from "@/components/View";
import Example from "@/utilities/storybook/Example";

export default {
	title: "Utility components/HiddenInput",
	component: HiddenInput,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/hidden-input",
		},
	},
};

export const composition: StoryObj = {
	name: "test: composition",
	render: () => {
		const [checkboxValue, setCheckboxValue] = useState<string[]>(["React"]);
		const [radioValue, setRadioValue] = useState<string>("React");

		const options = ["React", "Vue", "Angular", "Svelte"];

		return (
			<Example>
				<Example.Item title="CheckboxGroup">
					<CheckboxGroup
						name="categories"
						value={checkboxValue}
						onChange={(args) => setCheckboxValue(args.value)}
					>
						<View gap={2} direction="row">
							{options.map((option) => (
								<Badge
									as="label"
									color={checkboxValue.includes(option) ? "primary" : "neutral"}
									key={option}
								>
									{option}
									<HiddenInput type="checkbox" value={option} />
								</Badge>
							))}
						</View>
					</CheckboxGroup>
				</Example.Item>
				<Example.Item title="RadioGroup">
					<RadioGroup
						name="categories"
						value={radioValue}
						onChange={(args) => setRadioValue(args.value)}
					>
						<View gap={2} direction="row">
							{options.map((option) => (
								<Badge
									as="label"
									color={radioValue === option ? "primary" : "neutral"}
									key={option}
								>
									{option}
									<HiddenInput type="radio" value={option} />
								</Badge>
							))}
						</View>
					</RadioGroup>
				</Example.Item>
			</Example>
		);
	},
};
