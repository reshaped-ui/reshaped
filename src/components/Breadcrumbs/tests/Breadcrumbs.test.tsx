import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Breadcrumbs from "components/Breadcrumbs";

const fixtures = {
	content: "Content",
	className: "test-className",
	id: "test-id",
};

describe("Components/Breadcrumbs", () => {
	test("renders children as buttons", () => {
		render(
			<Breadcrumbs>
				<Breadcrumbs.Item onClick={() => {}}>{fixtures.content}</Breadcrumbs.Item>
				<Breadcrumbs.Item onClick={() => {}}>{fixtures.content}</Breadcrumbs.Item>
				<Breadcrumbs.Item>{fixtures.content}</Breadcrumbs.Item>
			</Breadcrumbs>
		);

		const elNav = screen.getByRole("navigation");
		const elList = within(elNav).getByRole("list");
		const elsItem = within(elList).getAllByRole("listitem");
		const elsButton = within(elList).getAllByRole("button");
		const elsText = within(elList).getAllByText(fixtures.content);

		expect(elsItem).toHaveLength(3);
		expect(elsText).toHaveLength(3);
		expect(elsButton).toHaveLength(2);
	});

	test("renders children as links", () => {
		render(
			<Breadcrumbs>
				<Breadcrumbs.Item href="#">{fixtures.content}</Breadcrumbs.Item>
				<Breadcrumbs.Item href="#">{fixtures.content}</Breadcrumbs.Item>
				<Breadcrumbs.Item>{fixtures.content}</Breadcrumbs.Item>
			</Breadcrumbs>
		);

		const elNav = screen.getByRole("navigation");
		const elList = within(elNav).getByRole("list");
		const elsItem = within(elList).getAllByRole("listitem");
		const elsButton = within(elList).getAllByRole("link");
		const elsText = within(elList).getAllByText(fixtures.content);

		expect(elsItem).toHaveLength(3);
		expect(elsText).toHaveLength(3);
		expect(elsButton).toHaveLength(2);
	});

	test("supports collapsed items", async () => {
		render(
			<Breadcrumbs defaultVisibleItems={3}>
				<Breadcrumbs.Item href="#">{fixtures.content}</Breadcrumbs.Item>
				<Breadcrumbs.Item href="#">{fixtures.content}</Breadcrumbs.Item>
				<Breadcrumbs.Item href="#">{fixtures.content}</Breadcrumbs.Item>
				<Breadcrumbs.Item href="#">{fixtures.content}</Breadcrumbs.Item>
				<Breadcrumbs.Item>{fixtures.content}</Breadcrumbs.Item>
			</Breadcrumbs>
		);

		let elsLink = screen.getAllByRole("link");
		const elCollapseButton = screen.getByRole("button");

		expect(elsLink).toHaveLength(2);
		expect(elCollapseButton).toBeInTheDocument();

		await userEvent.click(elCollapseButton);

		elsLink = screen.getAllByRole("link");

		expect(elCollapseButton).not.toBeInTheDocument();
		expect(elsLink).toHaveLength(4);
	});

	test("expandCollapse makes collapse icon static", async () => {
		render(
			<Breadcrumbs defaultVisibleItems={3} disableExpand>
				<Breadcrumbs.Item href="#">{fixtures.content}</Breadcrumbs.Item>
				<Breadcrumbs.Item href="#">{fixtures.content}</Breadcrumbs.Item>
				<Breadcrumbs.Item href="#">{fixtures.content}</Breadcrumbs.Item>
				<Breadcrumbs.Item href="#">{fixtures.content}</Breadcrumbs.Item>
				<Breadcrumbs.Item>{fixtures.content}</Breadcrumbs.Item>
			</Breadcrumbs>
		);

		const elCollapseButton = screen.queryByRole("button");
		expect(elCollapseButton).not.toBeInTheDocument();
	});

	test("applies className and attributes", () => {
		const { container } = render(
			<Breadcrumbs className={fixtures.className} attributes={{ id: fixtures.id }}>
				<Breadcrumbs.Item href="#">{fixtures.content}</Breadcrumbs.Item>
				<Breadcrumbs.Item href="#">{fixtures.content}</Breadcrumbs.Item>
				<Breadcrumbs.Item>{fixtures.content}</Breadcrumbs.Item>
			</Breadcrumbs>
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
