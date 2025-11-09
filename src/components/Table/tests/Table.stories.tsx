import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect } from "storybook/test";

import Card from "components/Card";
import Checkbox from "components/Checkbox";
import Table from "components/Table";
import View from "components/View";
import { Example } from "utilities/storybook";

export default {
	title: "Components/Table",
	component: Table,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/table",
		},
	},
};

export const layout = {
	name: "base",
	render: () => (
		<Example>
			<Example.Item title="base">
				<Table>
					<Table.Head>
						<Table.Row>
							<Table.Heading>Column 1</Table.Heading>
							<Table.Heading>Column 2</Table.Heading>
						</Table.Row>
					</Table.Head>
					<Table.Body>
						<Table.Row>
							<Table.Cell>Cell 1</Table.Cell>
							<Table.Cell>Cell 2</Table.Cell>
						</Table.Row>
					</Table.Body>
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
	),
};

export const border = {
	name: "border",
	render: () => (
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
	),
};

export const rows = {
	name: "rows",
	render: () => (
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
			<Example.Item title="clickable row 2, focus ring">
				<Table>
					<Table.Row>
						<Table.Heading>Column 1</Table.Heading>
						<Table.Heading>Column 2</Table.Heading>
					</Table.Row>
					<Table.Row onClick={() => {}}>
						<Table.Cell>Cell 1</Table.Cell>
						<Table.Cell>Cell 2</Table.Cell>
					</Table.Row>
				</Table>
			</Example.Item>
		</Example>
	),
};

export const render: StoryObj = {
	name: "rendering",
	render: () => (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Heading>Heading</Table.Heading>
					<Table.Heading>Heading</Table.Heading>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.Row>
					<Table.Cell>Content</Table.Cell>
					<Table.Cell>Content</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	),
	play: async ({ canvas }) => {
		const body = canvas.getAllByRole("rowgroup");
		const rows = canvas.getAllByRole("row");
		const headings = canvas.getAllByRole("columnheader");
		const cells = canvas.getAllByRole("cell");

		expect(body).toHaveLength(2);
		expect(rows).toHaveLength(2);
		expect(headings).toHaveLength(2);
		expect(cells).toHaveLength(2);

		expect(canvas.getAllByText("Heading")).toHaveLength(2);
		expect(canvas.getAllByText("Content")).toHaveLength(2);
	},
};

export const tbody: StoryObj = {
	name: "tbody rendering",
	render: () => (
		<Table>
			<Table.Row>
				<Table.Heading>Heading</Table.Heading>
				<Table.Heading>Heading</Table.Heading>
			</Table.Row>
		</Table>
	),
	play: async ({ canvas }) => {
		const body = canvas.getByRole("rowgroup");
		expect(body).toBeInTheDocument();
	},
};

export const tabIndex: StoryObj = {
	name: "adds tabIndex for clickable rows",
	render: () => (
		<Table>
			<Table.Row>
				<Table.Cell />
			</Table.Row>
			<Table.Row onClick={() => {}}>
				<Table.Cell />
			</Table.Row>
			<Table.Row attributes={{ onClick: () => {} }}>
				<Table.Cell />
			</Table.Row>
		</Table>
	),
	play: async ({ canvas }) => {
		const elRows = canvas.getAllByRole("row");

		expect(elRows[0]).not.toHaveAttribute("tabIndex");
		expect(elRows[1]).toHaveAttribute("tabIndex", "0");
		expect(elRows[2]).toHaveAttribute("tabIndex", "0");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Table className="test-classname" attributes={{ id: "test-id" }}>
				<Table.Row attributes={{ id: "test-row-id" }}>
					<Table.Cell attributes={{ id: "test-cell-id" }}></Table.Cell>
				</Table.Row>
			</Table>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;
		const row = canvas.getByRole("row");
		const cell = canvas.getByRole("cell");

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
		expect(row).toHaveAttribute("id", "test-row-id");
		expect(cell).toHaveAttribute("id", "test-cell-id");
	},
};

export const edgeCases = {
	name: "test: edge cases",
	render: () => (
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
	),
};

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

export const examples = {
	name: "test: selectable",
	render: () => (
		<Example>
			<Example.Item title="selectable">
				<SelectionDemo />
			</Example.Item>
		</Example>
	),
};
