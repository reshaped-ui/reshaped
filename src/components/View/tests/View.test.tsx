import React from "react";
import { render, screen } from "@testing-library/react";
import View from "components/View";

const fixtures = {
	content1: "Content 1",
	content2: "Content 2",
	className: "test-className",
	id: "test-id",
};

describe("Utilities/View", () => {
	test("renders children", () => {
		render(
			<View as="ul">
				<div>{fixtures.content1}</div>
				<View.Item as="li">{fixtures.content2}</View.Item>
			</View>
		);

		expect(screen.getByText(fixtures.content1)).toBeInTheDocument();
		expect(screen.getByText(fixtures.content2)).toBeInTheDocument();
		expect(screen.getByRole("list")).toBeInTheDocument();
		expect(screen.getAllByRole("listitem").length).toEqual(1);
	});

	test("applies className and attributes", () => {
		const { container } = render(
			<View
				className={fixtures.className}
				attributes={{ id: fixtures.id, style: { padding: 20 } }}
			/>
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});

	test("applies className and attributes to View.Item", () => {
		const { container } = render(
			<View.Item
				className={fixtures.className}
				attributes={{ id: fixtures.id, style: { padding: 20 } }}
			/>
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
		expect(container.firstElementChild?.getAttribute("style")).toMatchSnapshot();
	});
});
