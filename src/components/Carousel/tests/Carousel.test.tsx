import React from "react";
import Carousel from "components/Carousel";
import { render, screen } from "@testing-library/react";

const fixtures = {
	content: "Content",
	className: "test-classname",
	id: "test-id",
};

describe("Components/Carousel", () => {
	test("renders children correctly", () => {
		render(
			<Carousel attributes={{ "data-testid": fixtures.id }}>
				<div>{fixtures.content}</div>
				<div>{fixtures.content}</div>
			</Carousel>
		);

		const elRoot = screen.getByTestId(fixtures.id);
		const elItems = screen.getAllByText(fixtures.content);
		const elButtons = screen.getAllByRole("button", { hidden: true });

		expect(elRoot).toBeInTheDocument();
		expect(elRoot.tagName).toBe("SECTION");
		expect(elItems).toHaveLength(2);
		expect(elButtons).toHaveLength(2);
	});

	test("hides controls based on navigationDisplay", () => {
		render(
			<Carousel navigationDisplay="hidden">
				<div>{fixtures.content}</div>
				<div>{fixtures.content}</div>
			</Carousel>
		);

		const elButtons = screen.queryAllByRole("button");
		expect(elButtons).toHaveLength(0);
	});

	test("works with className and attributes", () => {
		const { container } = render(
			<Carousel className={fixtures.className} attributes={{ id: fixtures.id }}>
				<div>{fixtures.content}</div>
				<div>{fixtures.content}</div>
			</Carousel>
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
