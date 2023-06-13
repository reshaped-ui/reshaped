import React from "react";
import { render, screen } from "@testing-library/react";
import Timeline from "components/Timeline";

const fixtures = {
	content: "Content",
	className: "test-className",
	itemClassName: "test-itemClassName",
	id: "test-id",
	itemId: "test-item-id",
};

describe("Components/Timeline", () => {
	test("renders children", () => {
		render(
			<Timeline>
				<div>{fixtures.content}</div>
				<div>{fixtures.content}</div>
			</Timeline>
		);

		const root = screen.getByRole("list");
		const items = screen.getAllByRole("listitem");

		expect(root).toBeInTheDocument();
		expect(items).toHaveLength(2);
	});

	test("works with className and attributes", () => {
		const { container } = render(
			<Timeline className={fixtures.className} attributes={{ id: fixtures.id }}>
				<Timeline.Item className={fixtures.itemClassName} attributes={{ id: fixtures.itemId }}>
					{fixtures.content}
				</Timeline.Item>
				<Timeline.Item>{fixtures.content}</Timeline.Item>
			</Timeline>
		);

		const items = screen.getAllByRole("listitem");

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);

		expect(items).toHaveLength(2);
		expect(items[0]).toHaveClass(fixtures.itemClassName);
		expect(items[0]).toHaveAttribute("id", fixtures.itemId);
	});
});
