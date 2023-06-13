import React from "react";
import { render, screen } from "@testing-library/react";
import ActionBar from "components/ActionBar";

const fixtures = {
	content: "Content",
	className: "test-className",
	id: "test-id",
};

describe("Components/ActionBar", () => {
	test("renders children", () => {
		render(<ActionBar>{fixtures.content}</ActionBar>);

		const el = screen.getByText(fixtures.content);
		expect(el).toBeInTheDocument();
	});

	test("renders className and attributes", () => {
		const { container } = render(
			<ActionBar className={fixtures.className} attributes={{ id: fixtures.id }}>
				{fixtures.content}
			</ActionBar>
		);

		expect(container.firstChild).toBeInTheDocument();
		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
