import React from "react";
import { render, screen } from "@testing-library/react";
import Hotkey from "../Hotkey";

const fixtures = {
	className: "test-className",
	id: "test-id",
	content: "K",
};

describe("Components/Hotkey", () => {
	test("renders children", () => {
		render(<Hotkey>{fixtures.content}</Hotkey>);

		expect(screen.getByText(fixtures.content)).toBeInTheDocument();
	});

	test("works with className, attributes", () => {
		const { container } = render(
			<Hotkey className={fixtures.className} attributes={{ id: fixtures.id }}>
				{fixtures.content}
			</Hotkey>
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
