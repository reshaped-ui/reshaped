import React from "react";
import { render, screen } from "@testing-library/react";
import Container from "components/Container";

const fixtures = {
	content: "Content",
	className: "test-className",
	id: "test-id",
};

describe("Utilities/Container", () => {
	test("renders children", () => {
		render(<Container>{fixtures.content}</Container>);

		const el = screen.getByText(fixtures.content);
		expect(el).toBeInTheDocument();
	});

	test("works with className and attributes", () => {
		const { container } = render(
			<Container className={fixtures.className} attributes={{ id: fixtures.id }}>
				{fixtures.content}
			</Container>
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
