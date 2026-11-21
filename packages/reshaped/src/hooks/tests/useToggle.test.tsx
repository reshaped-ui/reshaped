import { describe, expect, test } from "vitest";
import { page, userEvent } from "vitest/browser";

import { render, renderHook } from "@/tests/render";
import useToggle from "../useToggle";

describe("Hooks/useToggle", () => {
	test("toggle", async () => {
		const Component = () => {
			const { toggle, active } = useToggle();

			return (
				<button onClick={() => toggle()} data-active={active}>
					{active ? "Deactivate" : "Activate"}
				</button>
			);
		};
		await render(<Component />);
		const button = page.getByRole("button");

		await expect.element(button).toHaveAttribute("data-active", "false");

		await userEvent.click(button);

		await expect.element(button).toHaveAttribute("data-active", "true");

		await userEvent.click(button);

		await expect.element(button).toHaveAttribute("data-active", "false");
	});

	test("activate", async () => {
		const Component = () => {
			const { activate, active } = useToggle();

			return (
				<button onClick={activate} data-active={active}>
					Activate
				</button>
			);
		};
		await render(<Component />);
		const button = page.getByRole("button");

		await expect.element(button).toHaveAttribute("data-active", "false");

		await userEvent.click(button);

		await expect.element(button).toHaveAttribute("data-active", "true");

		await userEvent.click(button);

		await expect.element(button).toHaveAttribute("data-active", "true");
	});

	test("deactivate", async () => {
		const Component = () => {
			const { deactivate, active } = useToggle(true);

			return (
				<button onClick={deactivate} data-active={active}>
					Deactivate
				</button>
			);
		};
		await render(<Component />);
		const button = page.getByRole("button");

		await expect.element(button).toHaveAttribute("data-active", "true");

		await userEvent.click(button);

		await expect.element(button).toHaveAttribute("data-active", "false");
	});

	test("toggle with a value", async () => {
		const { result, act } = await renderHook(() => useToggle());

		expect(result.current.active).toBe(false);

		await act(() => result.current.toggle(true));
		expect(result.current.active).toBe(true);

		await act(() => result.current.toggle(true));
		expect(result.current.active).toBe(true);

		await act(() => result.current.toggle(false));
		expect(result.current.active).toBe(false);
	});
});
