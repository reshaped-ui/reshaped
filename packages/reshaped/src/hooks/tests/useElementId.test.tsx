import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

import useElementId from "@/hooks/useElementId";
import { render, renderHook } from "@/tests/render";

const Component = (props: { id?: string }) => {
	const id = useElementId(props.id);

	return (
		<div data-testid="root" id={id}>
			{id}
		</div>
	);
};

describe("Hooks/useElementId", () => {
	test("passed id", async () => {
		await render(<Component id="hey" />);

		await expect.element(page.getByTestId("root")).toHaveAttribute("id", "hey");
		expect(document.querySelector("#hey")).not.toBeNull();
	});

	test("generated id", async () => {
		await render(<Component />);
		const root = page.getByTestId("root");

		await expect.element(root).toHaveAttribute("id");
		expect(root.element().id).not.toBe("");
	});

	test("generated id is stable between renders", async () => {
		const { result, rerender } = await renderHook(() => useElementId());
		const id = result.current;

		await rerender();

		expect(result.current).toBe(id);
	});
});
