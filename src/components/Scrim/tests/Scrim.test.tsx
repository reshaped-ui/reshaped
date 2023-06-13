import React from "react";
import { render, screen } from "@testing-library/react";
import Scrim from "components/Scrim";

const fixtures = {
	content: "Content",
	className: "test-className",
	scrimClassName: "test-scrim-className",
	id: "test-id",
};

describe("Components/Scrim", () => {
	test("renders children", () => {
		render(<Scrim>{fixtures.content}</Scrim>);

		const el = screen.getByText(fixtures.content);
		expect(el).toBeInTheDocument();
	});

	test("works with className and attributes", () => {
		const { container } = render(
			<Scrim
				className={fixtures.className}
				scrimClassName={fixtures.scrimClassName}
				attributes={{ id: fixtures.id }}
			>
				{fixtures.content}
			</Scrim>
		);

		const elRoot = container.firstChild;
		const elScrim = container.querySelector(`.${fixtures.scrimClassName}`);

		expect(elRoot).toHaveClass(fixtures.className);
		expect(elRoot).toHaveAttribute("id", fixtures.id);
		expect(elScrim).toBeInTheDocument();
	});
});
