import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "components/Table";

const fixtures = {
	headingContent: "Heading test",
	cellContent: "Cell test",
	className: "test-className",
	id: "test-id",
	rowId: "test-row-id",
	cellId: "test-cell-id",
};

describe("Components/Table", () => {
	test("renders markup", () => {
		render(
			<Table>
				<Table.Head>
					<Table.Row>
						<Table.Heading>{fixtures.headingContent}</Table.Heading>
						<Table.Heading>{fixtures.headingContent}</Table.Heading>
					</Table.Row>
				</Table.Head>
				<Table.Body>
					<Table.Row>
						<Table.Cell>{fixtures.cellContent}</Table.Cell>
						<Table.Cell>{fixtures.cellContent}</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		);

		const elBody = screen.getAllByRole("rowgroup");
		const elRows = screen.getAllByRole("row");
		const elHeadings = screen.getAllByRole("columnheader");
		const elCells = screen.getAllByRole("cell");

		expect(elBody).toHaveLength(2);
		expect(elRows).toHaveLength(2);
		expect(elHeadings).toHaveLength(2);
		expect(elCells).toHaveLength(2);

		expect(screen.getAllByText(fixtures.headingContent)).toHaveLength(2);
		expect(screen.getAllByText(fixtures.cellContent)).toHaveLength(2);
	});

	test("automatically wraps with tbody", () => {
		render(
			<Table>
				<Table.Row>
					<Table.Heading>{fixtures.headingContent}</Table.Heading>
					<Table.Heading>{fixtures.headingContent}</Table.Heading>
				</Table.Row>
			</Table>
		);

		const elBody = screen.getByRole("rowgroup");

		expect(elBody).toBeInTheDocument();
	});

	test("adds tabIndex for clickable rows", () => {
		render(
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
		);

		const elRows = screen.getAllByRole("row");

		expect(elRows[0]).not.toHaveAttribute("tabIndex");
		expect(elRows[1]).toHaveAttribute("tabIndex", "0");
		expect(elRows[2]).toHaveAttribute("tabIndex", "0");
	});

	test("works with className and attributes", () => {
		const { container } = render(
			<Table className={fixtures.className} attributes={{ id: fixtures.id }}>
				<Table.Row attributes={{ id: fixtures.rowId }}>
					<Table.Cell attributes={{ id: fixtures.cellId }}></Table.Cell>
				</Table.Row>
			</Table>
		);

		const elRow = screen.getByRole("row");
		const elCell = screen.getByRole("cell");

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
		expect(elRow).toHaveAttribute("id", fixtures.rowId);
		expect(elCell).toHaveAttribute("id", fixtures.cellId);
	});
});
