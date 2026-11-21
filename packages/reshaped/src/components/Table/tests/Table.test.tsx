import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Table from "@/components/Table";
import { render } from "@/tests/render";

describe("Components/Table", () => {
	test("rendering", async () => {
		await render(
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
		);

		const table = page.getByRole("table");

		await expect.element(table).toBeInTheDocument();
		expect(page.getByRole("rowgroup").all()).toHaveLength(2);
		expect(page.getByRole("row").all()).toHaveLength(2);
		// Vitest's role engine maps a th without scope to "cell" instead of "columnheader",
		// so checking the heading and data cells by tag name
		expect(table.element().querySelectorAll("thead th")).toHaveLength(2);
		expect(table.element().querySelectorAll("tbody td")).toHaveLength(2);

		expect(page.getByText("Heading").all()).toHaveLength(2);
		expect(page.getByText("Content").all()).toHaveLength(2);
	});

	test("tbody rendering", async () => {
		await render(
			<Table>
				<Table.Row>
					<Table.Heading>Heading</Table.Heading>
					<Table.Heading>Heading</Table.Heading>
				</Table.Row>
			</Table>
		);

		await expect.element(page.getByRole("rowgroup")).toBeInTheDocument();
	});

	test("adds tabIndex for clickable rows", async () => {
		await render(
			<Table>
				<Table.Row>
					<Table.Cell>Row 1</Table.Cell>
				</Table.Row>
				<Table.Row onClick={() => {}}>
					<Table.Cell>Row 2</Table.Cell>
				</Table.Row>
				<Table.Row attributes={{ onClick: () => {} }}>
					<Table.Cell>Row 3</Table.Cell>
				</Table.Row>
			</Table>
		);
		const rows = page.getByRole("row");

		await expect.element(rows.nth(0)).not.toHaveAttribute("tabIndex");
		await expect.element(rows.nth(1)).toHaveAttribute("tabIndex", "0");
		await expect.element(rows.nth(2)).toHaveAttribute("tabIndex", "0");
	});

	test("row onClick", async () => {
		const handleClick = vi.fn();
		await render(
			<Table>
				<Table.Row onClick={handleClick}>
					<Table.Cell>Row</Table.Cell>
				</Table.Row>
			</Table>
		);

		await userEvent.click(page.getByRole("row"));

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test("className, attributes", async () => {
		await render(
			<Table className="test-classname" attributes={{ id: "test-id", "data-testid": "root" }}>
				<Table.Row attributes={{ id: "test-row-id" }}>
					<Table.Cell attributes={{ id: "test-cell-id" }}></Table.Cell>
				</Table.Row>
			</Table>
		);
		const root = page.getByTestId("root");

		await expect.element(root).toHaveClass("test-classname");
		await expect.element(root).toHaveAttribute("id", "test-id");
		await expect.element(page.getByRole("row")).toHaveAttribute("id", "test-row-id");
		await expect.element(page.getByRole("cell")).toHaveAttribute("id", "test-cell-id");
	});
});
