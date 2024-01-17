import { render, screen } from "@testing-library/react";
import ScrollArea from "components/ScrollArea";

const fixtures = {
	content: "Content",
	className: "test-className",
	id: "test-id",
};

describe("Components/ScrollArea", () => {
	test("renders children", () => {
		render(<ScrollArea>{fixtures.content}</ScrollArea>);

		const el = screen.getByText(fixtures.content);
		expect(el).toBeInTheDocument();
	});

	test("works with className and attributes", () => {
		const { container } = render(
			<ScrollArea className={fixtures.className} attributes={{ id: fixtures.id }}>
				{fixtures.content}
			</ScrollArea>
		);

		const elRoot = container.firstChild;

		expect(elRoot).toHaveClass(fixtures.className);
		expect(elRoot).toHaveAttribute("id", fixtures.id);
	});
});
