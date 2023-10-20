import React from "react";
import { render, screen } from "@testing-library/react";
import Stepper from "components/Stepper";

const fixtures = {
	title: "Title",
	subtitle: "Subtitle",
	className: "test-className",
	id: "test-id",
	itemClassName: "test-item-className",
	itemId: "test-item-id",
};

describe("Components/Stepper", () => {
	test("renders items", () => {
		render(
			<Stepper>
				<Stepper.Item title={fixtures.title} subtitle={fixtures.subtitle} />
				<Stepper.Item title={fixtures.title} subtitle={fixtures.subtitle} />
			</Stepper>
		);

		const titles = screen.getAllByText(fixtures.title);
		const subtitles = screen.getAllByText(fixtures.title);

		expect(titles).toHaveLength(2);
		expect(subtitles).toHaveLength(2);
	});

	test("works with className and attributes", () => {
		const { container } = render(
			<Stepper className={fixtures.className} attributes={{ "data-id": fixtures.id }}>
				<Stepper.Item
					attributes={{ "data-testid": fixtures.itemId }}
					className={fixtures.itemClassName}
				/>
			</Stepper>
		);

		const item = screen.getByTestId(fixtures.itemId);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("data-id", fixtures.id);

		expect(item).toBeInTheDocument();
		expect(item).toHaveClass(fixtures.itemClassName);
	});
});
