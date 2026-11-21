import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Actionable from "@/components/Actionable";
import Button from "@/components/Button";
import { render } from "@/tests/render";

describe("Utility components/Actionable", () => {
	test("renders a span without onClick or href", async () => {
		await render(<Actionable>Span</Actionable>);
		const el = page.getByText("Span");

		await expect.element(el).toBeInTheDocument();
		expect(el.element().tagName).toBe("SPAN");
		await expect.element(page.getByRole("button")).not.toBeInTheDocument();
	});

	test("onClick", async () => {
		const handleClick = vi.fn();
		await render(<Actionable onClick={handleClick}>Button</Actionable>);
		const el = page.getByRole("button", { name: "Button" });

		await userEvent.click(el);

		await expect.element(el).toHaveAttribute("type", "button");
		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(el.element().contains(handleClick.mock.calls[0][0].target)).toBe(true);
	});

	test("href", async () => {
		await render(
			<Actionable href="https://reshaped.so" attributes={{ target: "_blank" }}>
				Link
			</Actionable>
		);
		const el = page.getByRole("link", { name: "Link" });

		await expect.element(el).toHaveAttribute("href", "https://reshaped.so");
		await expect.element(el).toHaveAttribute("target", "_blank");
	});

	test("attributes.href", async () => {
		await render(
			<Actionable attributes={{ href: "https://reshaped.so" }}>Link with attributes</Actionable>
		);

		await expect
			.element(page.getByRole("link", { name: "Link with attributes" }))
			.toHaveAttribute("href", "https://reshaped.so");
	});

	test("href, onClick", async () => {
		const handleClick = vi.fn();
		await render(
			<Actionable
				href="https://reshaped.so"
				onClick={(e) => {
					e.preventDefault();
					handleClick(e);
				}}
			>
				Link with onClick
			</Actionable>
		);
		const el = page.getByRole("link", { name: "Link with onClick" });

		await userEvent.click(el);

		await expect.element(el).toHaveAttribute("href", "https://reshaped.so");
		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(el.element().contains(handleClick.mock.calls[0][0].target)).toBe(true);
	});

	test("disabled, button", async () => {
		const handleClick = vi.fn();
		await render(
			<Actionable disabled onClick={handleClick}>
				Button
			</Actionable>
		);
		const el = page.getByRole("button");

		await expect.element(el).toBeDisabled();
		await expect.element(el).toHaveAttribute("aria-disabled", "true");
		await userEvent.click(el, { force: true });

		expect(handleClick).not.toHaveBeenCalled();
	});

	test("disabled, link", async () => {
		await render(
			<Actionable disabled href="https://reshaped.so">
				Link
			</Actionable>
		);
		const el = page.getByText("Link");

		await expect.element(el).not.toHaveAttribute("href");
		await expect.element(el).not.toHaveRole("link");
		await expect.element(page.getByRole("link")).not.toBeInTheDocument();
	});

	test("type: submit", async () => {
		const handleSubmit = vi.fn();
		await render(
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<Actionable onClick={() => {}} type="submit">
					Submit
				</Actionable>
			</form>
		);
		const el = page.getByRole("button", { name: "Submit" });

		await expect.element(el).toHaveAttribute("type", "submit");
		await userEvent.click(el);

		expect(handleSubmit).toHaveBeenCalledTimes(1);
	});

	test("as: span", async () => {
		const handleClick = vi.fn();
		await render(
			<Actionable onClick={handleClick} as="span">
				Trigger
			</Actionable>
		);
		const el = page.getByRole("button", { name: "Trigger" });

		expect(el.element().tagName).toBe("SPAN");
		await expect.element(el).toHaveAttribute("tabindex", "0");
	});

	test("as: span, triggers onClick with Enter and Space", async () => {
		const handleClick = vi.fn();
		await render(
			<Actionable onClick={handleClick} as="span">
				Trigger
			</Actionable>
		);
		const el = page.getByRole("button", { name: "Trigger" });

		await userEvent.tab();
		await expect.element(el).toHaveFocus();

		await userEvent.keyboard("{Enter}");
		expect(handleClick).toHaveBeenCalledTimes(1);

		await userEvent.keyboard(" ");
		expect(handleClick).toHaveBeenCalledTimes(2);
	});

	test("render, disabled", async () => {
		await render(
			<Actionable disabled onClick={() => {}} render={(props) => <section {...props} />}>
				Trigger
			</Actionable>
		);
		const el = page.getByText("Trigger");

		expect(el.element().tagName).toBe("SECTION");
		await expect.element(el).toHaveAttribute("aria-disabled", "true");
	});

	test("render, with component", async () => {
		const handleClick = vi.fn();
		await render(
			<Actionable
				disabled
				onClick={handleClick}
				render={({ children, ref, disabled, ...attributes }) => (
					<Button disabled={disabled} attributes={attributes} ref={ref}>
						{children}
					</Button>
				)}
			>
				Trigger
			</Actionable>
		);
		const el = page.getByRole("button", { name: "Trigger" });

		await expect.element(el).toBeDisabled();
		await userEvent.click(el, { force: true });

		expect(handleClick).not.toHaveBeenCalled();
	});

	test("stopPropagation", async () => {
		const handleParentClick = vi.fn();
		const handleClick = vi.fn();
		await render(
			// oxlint-disable-next-line jsx_a11y/click-events-have-key-events, jsx_a11y/no-static-element-interactions
			<div onClick={handleParentClick}>
				<Actionable stopPropagation onClick={handleClick}>
					Trigger
				</Actionable>
			</div>
		);

		await userEvent.click(page.getByRole("button"));

		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(handleParentClick).not.toHaveBeenCalled();
	});

	test("className, attributes", async () => {
		await render(
			<Actionable className="test-classname" attributes={{ id: "test-id", "data-testid": "root" }}>
				Trigger
			</Actionable>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
