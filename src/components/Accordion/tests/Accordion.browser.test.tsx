import { expect, test, vi } from "vitest";
import { render } from "utilities/vitest";
import Accordion from "components/Accordion";
import Button from "components/Button";
import "themes/reshaped/theme.css";

const fixtures = {
	triggerText: "Trigger",
	contentText: "Content",
	className: "test-classname",
	id: "test-id",
};

test("onToggle, a11y", async () => {
	const handleToggle = vi.fn();
	const screen = render(
		<Accordion onToggle={handleToggle}>
			<Accordion.Trigger>{fixtures.triggerText}</Accordion.Trigger>
			<Accordion.Content>{fixtures.contentText}</Accordion.Content>
		</Accordion>
	);

	const elTrigger = screen.getByRole("button");
	const elContent = screen.getByRole("region", { includeHidden: true });

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

test("active, controlled", async () => {
	const handleToggle = vi.fn();
	const screen = render(
		<Accordion onToggle={handleToggle} active>
			<Accordion.Trigger>{fixtures.triggerText}</Accordion.Trigger>
			<Accordion.Content>{fixtures.contentText}</Accordion.Content>
		</Accordion>
	);

	const elTrigger = screen.getByRole("button");

	// Opened by default
	expect(elTrigger.element()).toHaveAttribute("aria-expanded", "true");

	await elTrigger.click();

	// Calls handle toggle with a new state
	expect(handleToggle).toBeCalledWith(false);
	// Keeps content opened since it's controlled
	expect(elTrigger.element()).toHaveAttribute("aria-expanded", "true");
});

test("defaultActive, uncontrolled", async () => {
	const handleToggle = vi.fn();
	const screen = render(
		<Accordion onToggle={handleToggle} defaultActive>
			<Accordion.Trigger>{fixtures.triggerText}</Accordion.Trigger>
			<Accordion.Content>{fixtures.contentText}</Accordion.Content>
		</Accordion>
	);

	const elTrigger = screen.getByRole("button");

	expect(elTrigger.element()).toHaveAttribute("aria-expanded", "true");

	await elTrigger.click();

	expect(handleToggle).toBeCalledWith(false);
	expect(elTrigger.element()).toHaveAttribute("aria-expanded", "false");
});

test("trigger render props", async () => {
	const handleToggle = vi.fn();
	const screen = render(
		<Accordion onToggle={handleToggle}>
			<Accordion.Trigger>
				{(attributes, { active }) => (
					<Button attributes={{ ...attributes, "data-active": active }}>Toggle</Button>
				)}
			</Accordion.Trigger>
			<Accordion.Content>{fixtures.contentText}</Accordion.Content>
		</Accordion>
	);

	const elTrigger = screen.getByRole("button");
	const elContent = screen.getByRole("region", { includeHidden: true });
	const triggerId = elTrigger.element().getAttribute("id");
	const contentId = elContent.element().getAttribute("id");

	expect(elTrigger.element()).toHaveAttribute("aria-expanded", "false");
	expect(elTrigger.element()).toHaveAttribute("id", triggerId);
	expect(elTrigger.element()).toHaveAttribute("aria-controls", contentId);
	expect(elTrigger.element()).toHaveAttribute("data-active", "false");

	await elTrigger.click();

	expect(handleToggle).toBeCalledTimes(1);
	expect(handleToggle).toBeCalledWith(true);
	expect(elTrigger.element()).toHaveAttribute("data-active", "true");
});

test("className, attributes", () => {
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
