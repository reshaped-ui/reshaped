import { render, screen } from "@testing-library/react";
import MenuItem from "components/MenuItem";
import {
	testLinkBehavior,
	testLinkButtonBehavior,
	testButtonBehavior,
	testDisabledButton,
} from "utilities/testPresets";

const fixtures = {
	content: "Content",
	start: "Start",
	end: "End",
	className: "test-className",
	id: "test-id",
};

describe("Components/MenuItem", () => {
	test("renders children", () => {
		render(
			<MenuItem startSlot={<div>{fixtures.start}</div>} endSlot={<div>{fixtures.end}</div>}>
				{fixtures.content}
			</MenuItem>
		);

		expect(screen.getByText(fixtures.content)).toBeInTheDocument();
		expect(screen.getByText(fixtures.start)).toBeInTheDocument();
		expect(screen.getByText(fixtures.end)).toBeInTheDocument();
	});

	test("works with className and attributes", () => {
		const { container } = render(
			<MenuItem className={fixtures.className} attributes={{ id: fixtures.id }}>
				{fixtures.content}
			</MenuItem>
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});

	testLinkBehavior(({ href }) => <MenuItem href={href}>{fixtures.content}</MenuItem>);

	testLinkButtonBehavior(({ href, onClick }) => (
		<MenuItem href={href} onClick={onClick}>
			{fixtures.content}
		</MenuItem>
	));

	testButtonBehavior(({ onClick }) => <MenuItem onClick={onClick}>{fixtures.content}</MenuItem>);

	testDisabledButton(({ onClick }) => (
		<MenuItem onClick={onClick} disabled>
			{fixtures.content}
		</MenuItem>
	));
});
