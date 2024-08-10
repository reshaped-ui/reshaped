import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Accordion from "components/Accordion";

const fixtures = {
	triggerText: "Trigger",
	contentText: "Content",
	className: "test-classname",
	id: "test-id",
};

describe("Utilities/Actionable", () => {
	test("handles click events", async () => {
		const handleToggle = jest.fn();
		render(
			<Accordion onToggle={handleToggle}>
				<Accordion.Trigger>{fixtures.triggerText}</Accordion.Trigger>
				<Accordion.Content>{fixtures.contentText}</Accordion.Content>
			</Accordion>
		);

		const elTrigger = screen.getByRole("button");

		expect(elTrigger).toBeInTheDocument();

		await userEvent.click(elTrigger);

		const elExpandedTrigger = screen.getByRole("button", { expanded: true });

		const elContent = screen.getByRole("region");

		expect(handleToggle).toBeCalledTimes(1);
		expect(handleToggle).toBeCalledWith(true);
		expect(elExpandedTrigger).toBe(elTrigger);

		expect(elContent).toBeInTheDocument();
		// Manually testing attributes since react testing library doesn't have any methods for that
		expect(elContent.getAttribute("aria-labelledby")).toBe(elTrigger.getAttribute("id"));
		expect(elTrigger.getAttribute("aria-controls")).toBe(elContent.getAttribute("id"));

		await userEvent.click(elTrigger);

		const elCollapsedTrigger = screen.getByRole("button", { expanded: false });

		expect(handleToggle).toBeCalledTimes(2);
		expect(handleToggle).toBeCalledWith(false);
		expect(elCollapsedTrigger).toBe(elTrigger);
	});

	test("handles controlled behaviour", async () => {
		const handleToggle = jest.fn();

		render(
			<Accordion onToggle={handleToggle} active>
				<Accordion.Trigger>{fixtures.triggerText}</Accordion.Trigger>
				<Accordion.Content>{fixtures.contentText}</Accordion.Content>
			</Accordion>
		);

		const elTrigger = screen.getByRole("button", { expanded: true });

		await userEvent.click(elTrigger);

		expect(handleToggle).toBeCalledTimes(1);
		expect(handleToggle).toBeCalledWith(false);

		// Keeps accordion expanded since it's controlled by external state
		const elExpandedTrigger = screen.getByRole("button", { expanded: true });
		expect(elExpandedTrigger).toBe(elTrigger);
	});

	test("handles uncontrolled behaviour", async () => {
		const handleToggle = jest.fn();

		render(
			<Accordion onToggle={handleToggle} defaultActive>
				<Accordion.Trigger>{fixtures.triggerText}</Accordion.Trigger>
				<Accordion.Content>{fixtures.contentText}</Accordion.Content>
			</Accordion>
		);

		const elTrigger = screen.getByRole("button", { expanded: true });

		await userEvent.click(elTrigger);

		expect(handleToggle).toBeCalledTimes(1);
		expect(handleToggle).toBeCalledWith(false);

		const elExpandedTrigger = screen.getByRole("button", { expanded: false });
		expect(elExpandedTrigger).toBe(elTrigger);
	});

	test("renders className and attributes", () => {
		const { container } = render(
			<Accordion className={fixtures.className} attributes={{ id: fixtures.id }}>
				<Accordion.Trigger>{fixtures.triggerText}</Accordion.Trigger>
				<Accordion.Content>{fixtures.contentText}</Accordion.Content>
			</Accordion>
		);

		expect(container.firstChild).toBeInTheDocument();
		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
