import React from "react";
import { Example } from "utilities/storybook";
import Autocomplete from "components/Autocomplete";
import Loader from "components/Loader";
import View from "components/View";
import Badge from "components/Badge";
import useToggle from "hooks/useToggle";
import Modal from "components/Modal";
import TextField from "components/TextField";
import Text from "components/Text";
import Button from "components/Button";
import PlusIcon from "icons/Plus";
import Dismissible from "components/Dismissible";

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

export const multiselect = () => {
	const inputRef = React.useRef<HTMLInputElement | null>(null);
	const [values, setValues] = React.useState<string[]>([]);
	const [query, setQuery] = React.useState("");
	const [customValueQuery, setCustomValueQuery] = React.useState("");
	const customValueToggle = useToggle();

	const handleDismiss = (dismissedValue: string) => {
		const nextValues = values.filter((value) => value !== dismissedValue);
		setValues(nextValues);
		inputRef.current?.focus();
	};

	const handleAddCustomValue = () => {
		if (customValueQuery.length) {
			setValues((prev) => [...prev, customValueQuery]);
		}

		customValueToggle.deactivate();
		setCustomValueQuery("");
	};

	const valuesNode = !!values.length && (
		<View direction="row" gap={1}>
			{values.map((value) => (
				<Badge
					dismissAriaLabel="Dismiss value"
					onDismiss={() => handleDismiss(value)}
					key={value}
					size="small"
				>
					{value}
				</Badge>
			))}
		</View>
	);

	return (
		<>
			<Autocomplete
				name="fruit"
				value={query}
				placeholder="Pick your food"
				startSlot={valuesNode}
				inputAttributes={{ ref: inputRef }}
				onBackspace={() => {
					if (!query.length) handleDismiss(values[values.length - 1]);
				}}
				onChange={(args) => setQuery(args.value)}
				onItemSelect={(args) => {
					setCustomValueQuery(query);
					setQuery("");

					if (args.value === "_custom") {
						customValueToggle.activate();
						return;
					}

					setValues((prev) => [...prev, args.value]);
				}}
			>
				{["Pizza", "Pie", "Ice-cream"].map((v) => {
					if (!v.toLowerCase().includes(query.toLowerCase())) return;
					if (values.includes(v)) return;

					return (
						<Autocomplete.Item key={v} value={v}>
							{v}
						</Autocomplete.Item>
					);
				})}
				{!!query.length && (
					<Autocomplete.Item value="_custom" icon={PlusIcon}>
						Add a custom value
					</Autocomplete.Item>
				)}
			</Autocomplete>
			<Modal onClose={customValueToggle.deactivate} active={customValueToggle.active}>
				<View gap={4}>
					<Dismissible onClose={customValueToggle.deactivate} closeAriaLabel="Close modal">
						<Modal.Title>
							<Text variant="body-3" weight="medium">
								Add a custom value
							</Text>
						</Modal.Title>
					</Dismissible>
					<View
						direction="row"
						gap={3}
						as="form"
						attributes={{
							onSubmit: (e) => {
								e.preventDefault();
								handleAddCustomValue();
							},
						}}
					>
						<View.Item grow>
							<TextField
								name="custom"
								onChange={(args) => setCustomValueQuery(args.value)}
								value={customValueQuery}
							/>
						</View.Item>
						<Button type="submit">Add</Button>
					</View>
				</View>
			</Modal>
		</>
	);
};
