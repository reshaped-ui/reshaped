import React from "react";
import { render, screen } from "@testing-library/react";
import Progress from "components/Progress";

const fixtures = {
	value: 75,
	minValue: 50,
	maxValue: 100,
	className: "test-className",
	id: "test-id",
};

describe("Components/Progress", () => {
	test("renders aria", () => {
		render(<Progress value={fixtures.value} min={fixtures.minValue} max={fixtures.maxValue} />);

		const el = screen.getByRole("progressbar");

		expect(el).toBeInTheDocument();
		expect(el).toHaveAttribute("aria-valuenow", fixtures.value.toString());
		expect(el).toHaveAttribute("aria-valuemin", fixtures.minValue.toString());
		expect(el).toHaveAttribute("aria-valuemax", fixtures.maxValue.toString());
	});

	test("applies className and attributes", () => {
		const { container } = render(
			<Progress className={fixtures.className} attributes={{ id: fixtures.id }} />
		);

		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
		expect(container.firstChild).toHaveClass(fixtures.className);
	});
});
