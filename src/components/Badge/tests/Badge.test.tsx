import React from "react";
import { render, screen } from "@testing-library/react";
import Badge from "components/Badge";

const fixtures = {
	content: "Content",
	className: "test-className",
	id: "test-id",
};

describe("Components/Badge", () => {
	test("renders children", () => {
		render(<Badge>{fixtures.content}</Badge>);

		const el = screen.getByText(fixtures.content);
		expect(el).toBeInTheDocument();
	});

	test("applies className and attributes", () => {
		const { container } = render(
			<Badge className={fixtures.className} attributes={{ id: fixtures.id }}>
				{fixtures.content}
			</Badge>
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
