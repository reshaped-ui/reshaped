import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Table from "components/Table";

export default {
	title: "Components/Table/tests",
	component: Table,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/table",
		},
		chromatic: { disableSnapshot: true },
	},
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
