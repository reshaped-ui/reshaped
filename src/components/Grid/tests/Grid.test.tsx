import { render, screen } from "@testing-library/react";
import Grid from "../Grid";

const fixtures = {
	className: "test-className",
	itemClassName: "test-item-className",
	id: "test-id",
	itemId: "test-item-id",
	content: "Content",
};

describe("Utilities/Grid", () => {
	test("renders component with classNames and attributes", () => {
		render(
			<Grid className={fixtures.className} attributes={{ id: fixtures.id }} as="ul">
				<Grid.Item className={fixtures.itemClassName} attributes={{ id: fixtures.itemId }} as="li">
					{fixtures.content}
				</Grid.Item>
			</Grid>
		);

		const gridEl = screen.getByRole("list");
		const itemEl = screen.getByRole("listitem");

		expect(gridEl).toBeInTheDocument();
		expect(gridEl).toHaveClass(fixtures.className);
		expect(gridEl).toHaveAttribute("id", fixtures.id);

		expect(itemEl).toBeInTheDocument();
		expect(itemEl).toHaveClass(fixtures.itemClassName);
		expect(itemEl).toHaveAttribute("id", fixtures.itemId);
		expect(itemEl).toHaveTextContent(fixtures.content);
	});
});
