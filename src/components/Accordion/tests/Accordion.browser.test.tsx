import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import Reshaped from "components/Reshaped";
import Accordion from "components/Accordion";
import "themes/reshaped/theme.css";

const fixtures = {
	triggerText: "Trigger",
	contentText: "Content",
	className: "test-classname",
	id: "test-id",
};

test("handles click events", async () => {
	const handleToggle = vi.fn();
	const screen = render(
		<Reshaped>
			<Accordion onToggle={handleToggle}>
				<Accordion.Trigger>{fixtures.triggerText}</Accordion.Trigger>
				<Accordion.Content>{fixtures.contentText}</Accordion.Content>
			</Accordion>
		</Reshaped>
	);

	const elTrigger = screen.getByRole("button");
	const elContent = screen.getByRole("region");

	expect(elTrigger.element()).toHaveAttribute("aria-expanded", "false");

	await elTrigger.click();

	const triggerId = elTrigger.element().getAttribute("id");
	const contentId = elContent.element().getAttribute("id");

	expect(handleToggle).toBeCalledTimes(1);
	expect(handleToggle).toBeCalledWith(true);
	expect(elTrigger.element()).toHaveAttribute("aria-expanded", "true");

	expect(elContent.element()).toBeInTheDocument();
	expect(elContent.element().getAttribute("aria-labelledby")).toBe(triggerId);
	expect(elTrigger.element().getAttribute("aria-controls")).toBe(contentId);

	await elTrigger.click();

	expect(handleToggle).toBeCalledTimes(2);
	expect(handleToggle).toBeCalledWith(false);
	expect(elTrigger.element()).toHaveAttribute("aria-expanded", "false");
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
