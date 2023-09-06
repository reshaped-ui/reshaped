import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "components/Button";
import {
	testChildren,
	testLinkBehavior,
	testLinkButtonBehavior,
	testButtonBehavior,
	testButtonType,
	testDisabledButton,
	testAriaLabel,
} from "utilities/testPresets";

const fixtures = {
	content: "Click here",
	className: "test-className",
	id: "test-id",
	href: "reshaped.so",
};

describe("Components/Button", () => {
	testChildren(({ children }) => <Button>{children}</Button>);

	testLinkBehavior(({ href }) => <Button href={href}>Children</Button>);

	testLinkButtonBehavior(({ href, onClick }) => (
		<Button href={href} onClick={onClick}>
			Children
		</Button>
	));

	testButtonBehavior(({ onClick }) => <Button onClick={onClick}>Children</Button>);

	testButtonType(() => <Button onClick={() => {}}>Children</Button>);

	testDisabledButton(({ onClick }) => (
		<Button onClick={onClick} disabled>
			Children
		</Button>
	));

	testAriaLabel(({ ariaLabel }) => (
		<Button attributes={{ "aria-label": ariaLabel }} onClick={() => {}}>
			Children
		</Button>
	));

	test("renders group", () => {
		render(
			<Button.Group>
				<Button>One</Button>
				<Button>Two</Button>
			</Button.Group>
		);

		const el = screen.getByRole("group");

		expect(el).toBeInTheDocument();
		expect(el.childElementCount).toEqual(2);
	});

	test("renders group className and attributes", () => {
		const { container } = render(
			<Button.Group className={fixtures.className} attributes={{ id: fixtures.id }}>
				<Button>One</Button>
				<Button>Two</Button>
			</Button.Group>
		);

		expect(container.firstChild).toBeInTheDocument();
		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
