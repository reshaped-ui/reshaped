import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

import { render } from "@/tests/render";
import useVirtualKeyboard from "../useVirtualKeyboard";

const Component = () => {
	const { height, offset } = useVirtualKeyboard();

	return <div data-testid="root">{`${height} ${offset}`}</div>;
};

describe("Hooks/useVirtualKeyboard", () => {
	test("height", async () => {
		await render(<Component />);
		const root = page.getByTestId("root");
		const viewport = window.visualViewport!;

		await expect.element(root).toHaveTextContent("0 0");

		try {
			// On-screen keyboard shrinks the visual viewport without changing the layout
			Object.defineProperty(viewport, "height", {
				configurable: true,
				value: window.innerHeight - 300,
			});
			viewport.dispatchEvent(new Event("resize"));

			await expect.element(root).toHaveTextContent("300 0");

			// Browser pans the visible area down the layout to reveal the focused field
			Object.defineProperty(viewport, "offsetTop", { configurable: true, value: 200 });
			viewport.dispatchEvent(new Event("scroll"));

			await expect.element(root).toHaveTextContent("300 200");
		} finally {
			// @ts-expect-error Removes the stubbed value from the viewport itself
			delete viewport.height;
			// @ts-expect-error Removes the stubbed value from the viewport itself
			delete viewport.offsetTop;
			viewport.dispatchEvent(new Event("resize"));
		}

		await expect.element(root).toHaveTextContent("0 0");
	});
});
