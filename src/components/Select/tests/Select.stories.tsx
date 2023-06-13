import React from "react";
import { Example, Placeholder } from "utilities/storybook";
import IconZap from "icons/Zap";
import Select from "components/Select";
import View from "components/View";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import FormControl from "components/FormControl";

export default { title: "Components/Select" };

export const selection = () => (
	<Example>
		<Example.Item title="unselected, placeholder">
			<Select
				name="animal"
				placeholder="Select an animal"
				options={[
					{ label: "Dog", value: "dog" },
					{ label: "Turtle", value: "turtle" },
				]}
			/>
		</Example.Item>

		<Example.Item title="selected, controlled">
			<Select
				name="animal"
				placeholder="Select an animal"
				defaultValue="dog"
				options={[
					{ label: "Dog", value: "dog" },
					{ label: "Turtle", value: "turtle" },
				]}
			/>
		</Example.Item>

		<Example.Item title="selected, uncontrolled">
			<Select
				name="animal"
				placeholder="Select an animal"
				value="dog"
				options={[
					{ label: "Dog", value: "dog" },
					{ label: "Turtle", value: "turtle" },
				]}
			/>
		</Example.Item>
	</Example>
);

export const variants = () => (
	<Example>
		<Example.Item title="variant: faded">
			<Select
				variant="faded"
				name="animal"
				placeholder="Select an animal"
				value="dog"
				options={[
					{ label: "Dog", value: "dog" },
					{ label: "Turtle", value: "turtle" },
				]}
			/>
		</Example.Item>

		<Example.Item title="variant: headless">
			<Select
				variant="headless"
				name="animal"
				placeholder="Select an animal"
				value="dog"
				options={[
					{ label: "Dog", value: "dog" },
					{ label: "Turtle", value: "turtle" },
				]}
			/>
		</Example.Item>
	</Example>
);

export const size = () => (
	<Example>
		<Example.Item title="size: medium, slot">
			<Select
				size="medium"
				name="animal"
				startSlot={<Placeholder h={24} />}
				options={[
					{ label: "Dog", value: "dog" },
					{ label: "Turtle", value: "turtle" },
				]}
			/>
		</Example.Item>

		<Example.Item title="size: medium, icon">
			<Select
				size="medium"
				name="animal"
				icon={IconZap}
				options={[
					{ label: "Dog", value: "dog" },
					{ label: "Turtle", value: "turtle" },
				]}
			/>
		</Example.Item>

		<Example.Item title="size: large, slot">
			<Select
				size="large"
				name="animal"
				startSlot={<Placeholder h={24} />}
				options={[
					{ label: "Dog", value: "dog" },
					{ label: "Turtle", value: "turtle" },
				]}
			/>
		</Example.Item>

		<Example.Item title="size: large, icon">
			<Select
				size="large"
				name="animal"
				icon={IconZap}
				options={[
					{ label: "Dog", value: "dog" },
					{ label: "Turtle", value: "turtle" },
				]}
			/>
		</Example.Item>

		<Example.Item title="size: xlarge, slot">
			<Select
				size="xlarge"
				name="animal"
				startSlot={<Placeholder h={24} />}
				options={[
					{ label: "Dog", value: "dog" },
					{ label: "Turtle", value: "turtle" },
				]}
			/>
		</Example.Item>

		<Example.Item title="size: xlarge, icon">
			<Select
				size="xlarge"
				name="animal"
				icon={IconZap}
				options={[
					{ label: "Dog", value: "dog" },
					{ label: "Turtle", value: "turtle" },
				]}
			/>
		</Example.Item>

		<Example.Item title={["responsive size", "[s] xlarge", "[m+] medium"]}>
			<Select
				name="animal"
				size={{ s: "xlarge", m: "medium" }}
				options={[
					{ label: "Dog", value: "dog" },
					{ label: "Turtle", value: "turtle" },
				]}
			/>
		</Example.Item>
	</Example>
);

export const disabled = () => (
	<Example>
		<Example.Item title="disabled">
			<Select
				disabled
				name="animal"
				placeholder="Select an animal"
				options={[
					{ label: "Dog", value: "dog" },
					{ label: "Turtle", value: "turtle" },
				]}
			/>
		</Example.Item>
	</Example>
);

export const error = () => (
	<Example>
		<Example.Item title="error">
			<Select
				name="animal"
				hasError
				placeholder="Select an animal"
				options={[
					{ label: "Dog", value: "dog" },
					{ label: "Turtle", value: "turtle" },
				]}
			/>
		</Example.Item>
	</Example>
);

export const icon = () => (
	<Example>
		<Example.Item title="icon">
			<Select
				name="animal"
				placeholder="Select an animal"
				options={[
					{ label: "Dog", value: "dog" },
					{ label: "Turtle", value: "turtle" },
				]}
				icon={IconZap}
			/>
		</Example.Item>
	</Example>
);

export const slots = () => (
	<Example>
		<Example.Item title="startSlot">
			<Select
				name="animal"
				placeholder="Select an animal"
				options={[
					{ label: "Dog", value: "dog" },
					{ label: "Turtle", value: "turtle" },
				]}
				startSlot={
					<View height="20px" width="20px" backgroundColor="neutral" borderRadius="small" />
				}
			/>
		</Example.Item>
	</Example>
);

export const triggerComposition = () => (
	<Example>
		<Example.Item title="select with dropdown menu">
			<DropdownMenu width="trigger">
				<DropdownMenu.Trigger>
					{(attributes) => (
						<Select
							name="animal"
							placeholder="Select an animal"
							startSlot={
								<View height="20px" width="20px" backgroundColor="neutral" borderRadius="small" />
							}
							inputAttributes={attributes}
						>
							Hello
						</Select>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item>Item 1</DropdownMenu.Item>
					<DropdownMenu.Item>Item 2</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu>
		</Example.Item>
	</Example>
);

export const formControl = () => (
	<Example>
		<Example.Item title={["with helper", "error is hidden"]}>
			<FormControl>
				<FormControl.Label>Name</FormControl.Label>
				<Select
					name="animal"
					placeholder="Select an animal"
					options={[
						{ label: "Dog", value: "dog" },
						{ label: "Turtle", value: "turtle" },
					]}
				/>
				<FormControl.Helper>Helper</FormControl.Helper>
				<FormControl.Error>This field is required</FormControl.Error>
			</FormControl>
		</Example.Item>
		<Example.Item title={["with error"]}>
			<FormControl hasError>
				<FormControl.Label>Name</FormControl.Label>
				<Select
					name="animal"
					placeholder="Select an animal"
					options={[
						{ label: "Dog", value: "dog" },
						{ label: "Turtle", value: "turtle" },
					]}
				/>
				<FormControl.Error>This field is required</FormControl.Error>
			</FormControl>
		</Example.Item>
	</Example>
);
