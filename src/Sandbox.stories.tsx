import View from "components/View";
import Image from "components/Image";
import Button from "components/Button";
import React from "react";
import Badge from "components/Badge";
import FormControl from "components/FormControl";
import Autocomplete from "components/Autocomplete";
import IconZap from "icons/Zap";

export default {
	title: "Sandbox",
	chromatic: { disableSnapshot: true },
};

const Preview: React.FC<{ children: React.ReactNode }> = (props) => {
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
			<Component />
		</Preview>
	);
};

const Component = () => {
	const options = [
		"Pizza",
		"Pie",
		"Ice-cream",
		"Fries",
		"Salad",
		"Option 4",
		"Option 5",
		"Option 6",
	];

	const inputRef = React.useRef<HTMLInputElement>(null);
	const [values, setValues] = React.useState<string[]>([
		"Option 4",
		"Option 5",
		"Option 6",
		"Pizza",
		"Ice-cream",
	]);
	const [query, setQuery] = React.useState("");

	const handleDismiss = (dismissedValue: string) => {
		const nextValues = values.filter((value) => value !== dismissedValue);
		setValues(nextValues);
		inputRef.current?.focus();
	};

	const valuesNode = values.map((value) => (
		<Badge dismissAriaLabel="Dismiss value" onDismiss={() => handleDismiss(value)} key={value}>
			{value}
		</Badge>
	));

	return (
		<FormControl>
			<FormControl.Label>Food</FormControl.Label>
			<Autocomplete
				name="fruit"
				value={query}
				placeholder="Pick your food"
				startSlot={valuesNode}
				multiline
				endSlot={<Button icon={IconZap} size="small" />}
				suffix="m2"
				inputAttributes={{ ref: inputRef }}
				onChange={(args) => setQuery(args.value)}
				onItemSelect={(args) => {
					setQuery("");
					setValues((prev) => [...prev, args.value]);
				}}
			>
				{options.map((v) => {
					if (!v.toLowerCase().includes(query.toLowerCase())) return;
					if (values.includes(v)) return;

					return (
						<Autocomplete.Item key={v} value={v}>
							{v}
						</Autocomplete.Item>
					);
				})}
			</Autocomplete>
		</FormControl>
	);
};
