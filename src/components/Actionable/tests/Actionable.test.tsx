import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Actionable from "components/Actionable";

const fixtures = {
	content: "Click here",
	className: "test-className",
	id: "test-id",
	href: "reshaped.so",
};

describe("Utilities/Actionable", () => {
	test("renders children", () => {
		render(<Actionable>{fixtures.content}</Actionable>);

		const el = screen.getByText(fixtures.content);

		expect(el).toBeInTheDocument();
		expect(el.tagName).toBe("SPAN");
	});

	test("renders link from href property", () => {
		render(<Actionable href={fixtures.href}>{fixtures.content}</Actionable>);

		const el = screen.getByRole("link");

		expect(el).toHaveAttribute("href", fixtures.href);
	});

	test("renders link from href attribute", () => {
		render(<Actionable attributes={{ href: fixtures.href }}>{fixtures.content}</Actionable>);

		const el = screen.getByRole("link");

		expect(el).toHaveAttribute("href", fixtures.href);
	});

	test("renders link with onClick", async () => {
		const handleClick = jest.fn();
		render(
			<Actionable href={fixtures.href} onClick={handleClick}>
				{fixtures.content}
			</Actionable>
		);

		const el = screen.getByRole("link");
		el.addEventListener("click", (e) => e.preventDefault());
		await userEvent.click(el);

		expect(el).toHaveAttribute("href", fixtures.href);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test("renders button", async () => {
		const handleClick = jest.fn();
		render(<Actionable onClick={handleClick}>{fixtures.content}</Actionable>);

		const el = screen.getByRole("button");
		await userEvent.click(el);

		expect(el).toHaveAttribute("type", "button");
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test("renders custom tag", async () => {
		const handleClick = jest.fn();
		render(
			<Actionable onClick={handleClick} as="span">
				{fixtures.content}
			</Actionable>
		);

		const el = screen.getByRole("button");
		await userEvent.click(el);

		expect(el).toHaveAttribute("role", "button");
		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(el.tagName).toBe("SPAN");
	});

	test("works with disabled property", async () => {
		const handleClick = jest.fn();
		render(
			<Actionable onClick={handleClick} disabled>
				{fixtures.content}
			</Actionable>
		);

		const el = screen.getByRole("button");
		await userEvent.click(el);

		expect(el).toHaveAttribute("type", "button");
		expect(el).toBeDisabled();
		expect(handleClick).toHaveBeenCalledTimes(0);
	});

	test("handles stopPropagation", async () => {
		const handleClickRoot = jest.fn();
		const handleClickInner = jest.fn();

		render(
			<Actionable onClick={handleClickRoot}>
				<Actionable as="div" stopPropagation onClick={handleClickInner} />
			</Actionable>
		);

		const innerButton = screen.getAllByRole("button")[1];

		await userEvent.click(innerButton);

		expect(handleClickInner).toHaveBeenCalledTimes(1);
		expect(handleClickRoot).not.toHaveBeenCalled();
	});

	test("renders className and attributes", () => {
		const { container } = render(
			<Actionable className={fixtures.className} attributes={{ id: fixtures.id }}>
				{fixtures.content}
			</Actionable>
		);

		expect(container.firstChild).toBeInTheDocument();
		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
