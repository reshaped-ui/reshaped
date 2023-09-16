import React from "react";
import { Example } from "utilities/storybook";
import Table from "components/Table";
import Card from "components/Card";

export default { title: "Components/Table" };

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
		<Example.Item title="border: rows">
			<Table border="rows">
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
				<Table border="rows">
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
	</Example>
);
