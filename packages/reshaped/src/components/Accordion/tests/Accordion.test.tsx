import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Accordion from "@/components/Accordion";
import Button from "@/components/Button";
import { render } from "@/tests/render";

describe("Utility components/Accordion", () => {
	test("onToggle", async () => {
		const handleToggle = vi.fn();
		await render(
			<Accordion onToggle={handleToggle}>
				<Accordion.Trigger>Trigger</Accordion.Trigger>
				<Accordion.Content>Content</Accordion.Content>
			</Accordion>
		);
		const trigger = page.getByRole("button", { name: "Trigger" });
		const content = page.getByRole("region", { includeHidden: true });

		await expect.element(trigger).toHaveAttribute("aria-expanded", "false");

		await userEvent.click(trigger);

		expect(handleToggle).toHaveBeenCalledTimes(1);
		expect(handleToggle).toHaveBeenLastCalledWith(true);
		await expect.element(trigger).toHaveAttribute("aria-expanded", "true");

		await expect.element(content).toBeInTheDocument();
		await expect
			.element(content)
			.toHaveAttribute("aria-labelledby", trigger.element().getAttribute("id"));
		await expect
			.element(trigger)
			.toHaveAttribute("aria-controls", content.element().getAttribute("id"));

		await userEvent.click(trigger);

		expect(handleToggle).toHaveBeenCalledTimes(2);
		expect(handleToggle).toHaveBeenLastCalledWith(false);
		await expect.element(trigger).toHaveAttribute("aria-expanded", "false");
	});

	test("active, controlled", async () => {
		const handleToggle = vi.fn();
		await render(
			<Accordion onToggle={handleToggle} active>
				<Accordion.Trigger>Trigger</Accordion.Trigger>
				<Accordion.Content>Content</Accordion.Content>
			</Accordion>
		);
		const trigger = page.getByRole("button", { name: "Trigger" });

		// Opened by default
		await expect.element(trigger).toHaveAttribute("aria-expanded", "true");

		await userEvent.click(trigger);

		// Calls handle toggle with a new state
		expect(handleToggle).toHaveBeenCalledWith(false);
		// Keeps content opened since it's controlled
		await expect.element(trigger).toHaveAttribute("aria-expanded", "true");
	});

	test("defaultActive, uncontrolled", async () => {
		const handleToggle = vi.fn();
		await render(
			<Accordion onToggle={handleToggle} defaultActive>
				<Accordion.Trigger>Trigger</Accordion.Trigger>
				<Accordion.Content>Content</Accordion.Content>
			</Accordion>
		);
		const trigger = page.getByRole("button", { name: "Trigger" });

		// Opened by default
		await expect.element(trigger).toHaveAttribute("aria-expanded", "true");

		await userEvent.click(trigger);

		// Calls handle toggle with a new state
		expect(handleToggle).toHaveBeenCalledWith(false);
		// Closes the content since it's uncontrolled
		await expect.element(trigger).toHaveAttribute("aria-expanded", "false");
	});

	test("children: render props", async () => {
		const handleToggle = vi.fn();
		await render(
			<Accordion onToggle={handleToggle}>
				<Accordion.Trigger>
					{(attributes, { active }) => (
						<Button attributes={{ ...attributes, "data-active": active }}>Trigger</Button>
					)}
				</Accordion.Trigger>
				<Accordion.Content>Content</Accordion.Content>
			</Accordion>
		);
		const trigger = page.getByRole("button", { name: "Trigger" });
		const content = page.getByRole("region", { includeHidden: true });

		await expect.element(trigger).toHaveAttribute("aria-expanded", "false");
		await expect.element(trigger).toHaveAttribute("id");
		await expect
			.element(content)
			.toHaveAttribute("aria-labelledby", trigger.element().getAttribute("id"));
		await expect
			.element(trigger)
			.toHaveAttribute("aria-controls", content.element().getAttribute("id"));
		await expect.element(trigger).toHaveAttribute("data-active", "false");

		await userEvent.click(trigger);

		expect(handleToggle).toHaveBeenCalledTimes(1);
		expect(handleToggle).toHaveBeenCalledWith(true);
		await expect.element(trigger).toHaveAttribute("data-active", "true");
		await expect.element(trigger).toHaveAttribute("aria-expanded", "true");
	});

	test("className, attributes", async () => {
		await render(
			<Accordion className="test-classname" attributes={{ id: "test-id", "data-testid": "root" }}>
				<Accordion.Trigger>Trigger</Accordion.Trigger>
				<Accordion.Content>Content</Accordion.Content>
			</Accordion>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
