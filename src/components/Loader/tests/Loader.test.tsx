import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "components/Loader";

const fixtures = {
	label: "Loading",
	className: "test-className",
	id: "test-id",
};

describe("Components/Loader", () => {
	test("renders with aria-label attribute", () => {
		render(<Loader attributes={{ "aria-label": fixtures.label }} />);

		const el = screen.getByLabelText(fixtures.label);
		expect(el).toBeInTheDocument();
		expect(el).toHaveAttribute("aria-live");
	});

	test("works with className and attributes", () => {
		const { container } = render(
			<Loader className={fixtures.className} attributes={{ id: fixtures.id }} />
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
