import React from "react";
import { render, screen } from "@testing-library/react";
import Text from "components/Text";

const fixtures = {
	content: "Content",
	className: "test-className",
	id: "test-id",
};

describe("Utilities/Text", () => {
	test("renders children", () => {
		render(<Text>{fixtures.content}</Text>);

		const el = screen.getByText(fixtures.content);
		expect(el).toBeInTheDocument();
	});

	test("works with custom tag name", () => {
		render(<Text as="ul">{fixtures.content}</Text>);

		const el = screen.getByRole("list");
		expect(el).toBeInTheDocument();
	});

	test("works with className and attributes", () => {
		const { container } = render(
			<Text className={fixtures.className} attributes={{ id: fixtures.id }}>
				{fixtures.content}
			</Text>
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
