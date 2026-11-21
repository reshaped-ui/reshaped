import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Button from "@/components/Button";
import IconZap from "@/icons/Zap";
import { render } from "@/tests/render";

describe("Components/Button", () => {
	test("renders a span without onClick or href", async () => {
		await render(<Button>Trigger</Button>);

		await expect.element(page.getByRole("button")).not.toBeInTheDocument();
		expect(page.getByText("Trigger").element().closest("span")).not.toBeNull();
	});

	test("onClick", async () => {
		const handleClick = vi.fn();
		await render(<Button onClick={handleClick}>Trigger</Button>);
		const el = page.getByRole("button");

		await userEvent.click(el);

		await expect.element(el).toHaveAttribute("type", "button");
		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(el.element().contains(handleClick.mock.calls[0][0].target)).toBe(true);
	});

	test("href", async () => {
		await render(<Button href="https://reshaped.so">Trigger</Button>);

		await expect.element(page.getByRole("link")).toHaveAttribute("href", "https://reshaped.so");
	});

	test("href, onClick", async () => {
		const handleClick = vi.fn();
		await render(
			<Button
				href="https://reshaped.so"
				onClick={(e) => {
					e.preventDefault();
					handleClick(e);
				}}
			>
				Trigger
			</Button>
		);
		const el = page.getByRole("link");

		await userEvent.click(el);

		await expect.element(el).toHaveAttribute("href", "https://reshaped.so");
		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(el.element().contains(handleClick.mock.calls[0][0].target)).toBe(true);
	});

	test("disabled doesn't trigger onClick", async () => {
		const handleClick = vi.fn();
		await render(
			<Button disabled onClick={handleClick}>
				Trigger
			</Button>
		);
		const el = page.getByRole("button");

		await expect.element(el).toBeDisabled();
		await userEvent.click(el, { force: true });

		expect(handleClick).not.toHaveBeenCalled();
	});

	test("loading disables the button and labels the loader", async () => {
		const handleClick = vi.fn();
		await render(
			<Button loading loadingAriaLabel="Loading" onClick={handleClick}>
				Trigger
			</Button>
		);
		const el = page.getByRole("button");

		await expect.element(el).toBeDisabled();
		await expect.element(page.getByLabelText("Loading")).toBeInTheDocument();
		await userEvent.click(el, { force: true });

		expect(handleClick).not.toHaveBeenCalled();
	});

	test("icon only keeps the aria-label", async () => {
		await render(
			<Button icon={IconZap} onClick={() => {}} attributes={{ "aria-label": "Action" }} />
		);

		await expect.element(page.getByRole("button", { name: "Action" })).toBeInTheDocument();
	});

	test("as", async () => {
		await render(
			<Button onClick={() => {}} as="span">
				Trigger
			</Button>
		);

		expect(page.getByText("Trigger").element().closest("span[role='button']")).not.toBeNull();
	});

	test("render, disabled", async () => {
		await render(
			<Button
				disabled
				onClick={() => {}}
				render={(props) => <section {...props} />}
				attributes={{ "data-testid": "render-el" }}
			>
				Trigger
			</Button>
		);
		const el = page.getByTestId("render-el");

		expect(el.element().tagName).toBe("SECTION");
		await expect.element(el).toHaveAttribute("aria-disabled", "true");
	});

	test("className, attributes", async () => {
		await render(
			<Button className="test-classname" attributes={{ id: "test-id", "data-testid": "root" }}>
				Trigger
			</Button>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});

	test("group className, attributes", async () => {
		await render(
			<Button.Group className="test-classname" attributes={{ id: "test-id" }}>
				<Button>Trigger</Button>
			</Button.Group>
		);
		const el = page.getByRole("group");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
