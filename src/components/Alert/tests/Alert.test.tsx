import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Alert from "components/Alert";
import Link from "components/Link";

const fixtures = {
	title: "Title",
	content: "Content",
	actionText: "Action",
	className: "test-className",
	id: "test-id",
};

describe("Components/Alert", () => {
	test("renders properties", async () => {
		const handleClick = jest.fn();

		render(
			<Alert
				title={fixtures.title}
				actionsSlot={[
					<Link onClick={handleClick} key="1">
						{fixtures.actionText}
					</Link>,
					<Link onClick={() => {}} key="2">
						{fixtures.actionText}
					</Link>,
				]}
			>
				{fixtures.content}
			</Alert>
		);

		const elContent = screen.getByText(fixtures.content);
		const elTitle = screen.getByText(fixtures.title);
		const elActions = screen.getAllByRole("button");

		expect(elContent).toBeInTheDocument();
		expect(elTitle).toBeInTheDocument();
		expect(elActions).toHaveLength(2);

		await userEvent.click(elActions[0]);

		expect(handleClick).toBeCalledTimes(1);
	});

	test("applies className and attributes", () => {
		const { container } = render(
			<Alert className={fixtures.className} attributes={{ id: fixtures.id }}>
				{fixtures.content}
			</Alert>
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
