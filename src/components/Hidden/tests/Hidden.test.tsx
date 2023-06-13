import React from "react";
import { render, screen } from "@testing-library/react";
import Hidden from "components/Hidden";

const fixtures = {
	content: "Content",
};

describe("Utilities/Hidden", () => {
	test("renders children", () => {
		render(<Hidden>{fixtures.content}</Hidden>);

		expect(screen.getByText(fixtures.content)).toBeInTheDocument();
	});

	test("works with render props", () => {
		render(<Hidden>{(className) => <div className={className}>{fixtures.content}</div>}</Hidden>);

		expect(screen.getByText(fixtures.content)).toBeInTheDocument();
	});

	test("renders as a custom html tag", () => {
		const { container } = render(<Hidden as="span">{fixtures.content}</Hidden>);

		expect(container.firstChild?.nodeName).toBe("SPAN");
	});
});
