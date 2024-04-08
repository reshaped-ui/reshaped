import React from "react";
import { Example } from "utilities/storybook";
import Table from "components/Table";
import Checkbox from "components/Checkbox";
import Card from "components/Card";
import View from "components/View";

export default {
	title: "Components/Table",
	component: Table,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/table",
		},
	},
};

export const layout = () => (
	<Example>
		<Example.Item title="base">
			<Table>
				<Table.Row>
					<Table.Heading>Column 1</Table.Heading>
					<Table.Heading>Column 2</Table.Heading>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Cell 1</Table.Cell>
					<Table.Cell>Cell 2</Table.Cell>
				</Table.Row>
			</Table>
		</Example.Item>
		<Example.Item title="colspan: 2 for col 2, rowspan: 2 for cell 3">
			<Table>
				<Table.Row>
					<Table.Heading>Column 1</Table.Heading>
					<Table.Heading colSpan={2}>Column 2</Table.Heading>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Cell 1</Table.Cell>
					<Table.Cell>Cell 2</Table.Cell>
					<Table.Cell rowSpan={2}>Cell 3</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Cell 1</Table.Cell>
					<Table.Cell>Cell 2</Table.Cell>
				</Table.Row>
			</Table>
		</Example.Item>
		<Example.Item title="align: center for heading 1, align: end for heading 2">
			<Table>
				<Table.Row>
					<Table.Heading align="center">Column 1</Table.Heading>
					<Table.Heading align="end">Column 2</Table.Heading>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Cell 1</Table.Cell>
					<Table.Cell>Cell 2</Table.Cell>
				</Table.Row>
			</Table>
		</Example.Item>
		<Example.Item title="valign: center for cell 2, valign: end for cell 3">
			<Table>
				<Table.Row>
					<Table.Heading>Column 1</Table.Heading>
					<Table.Heading>Column 2</Table.Heading>
					<Table.Heading>Column 2</Table.Heading>
				</Table.Row>
				<Table.Row>
					<Table.Cell>
						<View height={15} backgroundColor="neutral-faded" />
					</Table.Cell>
					<Table.Cell verticalAlign="center">Cell 2</Table.Cell>
					<Table.Cell verticalAlign="end">Cell 3</Table.Cell>
				</Table.Row>
			</Table>
		</Example.Item>
		<Example.Item title="width: 40%, minWidth: 200px for col 1">
			<Table>
				<Table.Row>
					<Table.Heading width="40%" minWidth="200px">
						Column 1
					</Table.Heading>
					<Table.Heading>Column 2</Table.Heading>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Cell 1</Table.Cell>
					<Table.Cell>Cell 2</Table.Cell>
				</Table.Row>
			</Table>
		</Example.Item>
	</Example>
);

export const border = () => (
	<Example>
		<Example.Item title="border: true">
			<Table border>
				<Table.Row>
					<Table.Heading>Column 1</Table.Heading>
					<Table.Heading>Column 2</Table.Heading>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Cell 1</Table.Cell>
					<Table.Cell>Cell 2</Table.Cell>
				</Table.Row>
			</Table>
		</Example.Item>
		<Example.Item title="columnBorder: true">
			<Table columnBorder>
				<Table.Row>
					<Table.Heading>Column 1</Table.Heading>
					<Table.Heading>Column 2</Table.Heading>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Cell 1</Table.Cell>
					<Table.Cell>Cell 2</Table.Cell>
				</Table.Row>
			</Table>
		</Example.Item>
		<Example.Item title="columnBorder: true, border: true">
			<Table columnBorder border>
				<Table.Row>
					<Table.Heading>Column 1</Table.Heading>
					<Table.Heading>Column 2</Table.Heading>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Cell 1</Table.Cell>
					<Table.Cell>Cell 2</Table.Cell>
				</Table.Row>
			</Table>
		</Example.Item>
	</Example>
);

export const highlighted = () => (
	<Example>
		<Example.Item title="highlighted for row 2">
			<Table>
				<Table.Row>
					<Table.Heading>Column 1</Table.Heading>
					<Table.Heading>Column 2</Table.Heading>
				</Table.Row>
				<Table.Row highlighted>
					<Table.Cell>Cell 1</Table.Cell>
					<Table.Cell>Cell 2</Table.Cell>
				</Table.Row>
			</Table>
		</Example.Item>
	</Example>
);

export const edgeCases = () => (
	<Example>
		<Example.Item title="scroll fade">
			<Table>
				<Table.Row>
					<Table.Heading width="500px">Column 1</Table.Heading>
					<Table.Heading width="500px">Column 2</Table.Heading>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Cell 1</Table.Cell>
					<Table.Cell>Cell 2</Table.Cell>
				</Table.Row>
			</Table>
		</Example.Item>
		<Example.Item title="card with highlighted heading">
			<Card elevated padding={0}>
				<Table>
					<Table.Row highlighted>
						<Table.Heading width="50%" minWidth="200px">
							Column 1
						</Table.Heading>
						<Table.Heading colSpan={2} align="end">
							Column 2
						</Table.Heading>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Cell 1</Table.Cell>
						<Table.Cell align="center">Cell 2</Table.Cell>
						<Table.Cell align="end">Cell 3</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Cell 1</Table.Cell>
						<Table.Cell align="center">Cell 2</Table.Cell>
						<Table.Cell align="end">Cell 3</Table.Cell>
					</Table.Row>
				</Table>
			</Card>
		</Example.Item>
		<Example.Item title="width: auto, nowrap">
			<Table>
				<Table.Row>
					<Table.Heading width="50%">Column 1</Table.Heading>
					<Table.Heading>Column 2</Table.Heading>
					<Table.Heading>Column 3</Table.Heading>
					<Table.Heading width="auto">Long heading title</Table.Heading>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Cell 1</Table.Cell>
					<Table.Cell>Cell 2</Table.Cell>
					<Table.Cell>Cell 3</Table.Cell>
					<Table.Cell>Cell 4</Table.Cell>
				</Table.Row>
			</Table>
		</Example.Item>
	</Example>
);

const SelectionDemo = () => {
	const [value, setValue] = React.useState<string[]>([]);
	const rows = [
		{
			value: "1",
		},
		{ value: "2" },
	];
	const allSelected = value.length === rows.length;

	return (
		<Table>
			<Table.Row>
				<Table.Heading width="auto">
					<Checkbox
						inputAttributes={{ "aria-label": "Select all" }}
						name="hey"
						checked={allSelected}
						indeterminate={!!value.length && value.length < rows.length}
						onChange={() => {
							setValue(allSelected ? [] : rows.map((row) => row.value));
						}}
					/>
				</Table.Heading>
				<Table.Heading>Column 1</Table.Heading>
				<Table.Heading>Column 2</Table.Heading>
			</Table.Row>
			{rows.map((row) => (
				<Table.Row key={row.value} highlighted={value.includes(row.value)}>
					<Table.Cell>
						<Checkbox
							name="hey"
							value={row.value}
							inputAttributes={{ "aria-label": "Select the row" }}
							checked={value.includes(row.value)}
							onChange={(args) => {
								setValue((prev) => {
									if (!args.value) return prev;
									if (args.checked) return [...prev, args.value];
									return prev.filter((item) => item !== args.value);
								});
							}}
						/>
					</Table.Cell>
					<Table.Cell>Cell 1</Table.Cell>
					<Table.Cell>Cell 2</Table.Cell>
				</Table.Row>
			))}
		</Table>
	);
};

export const examples = () => (
	<Example>
		<Example.Item title="selectable">
			<SelectionDemo />
		</Example.Item>
	</Example>
);
