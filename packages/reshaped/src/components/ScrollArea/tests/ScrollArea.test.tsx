import React from "react";
import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Button from "@/components/Button";
import ScrollArea from "@/components/ScrollArea";
import View from "@/components/View";
import { render } from "@/tests/render";

describe("Utility components/ScrollArea", () => {
	test("ref, onScroll", async () => {
		const handleScroll = vi.fn();

		const Component = () => {
			const ref = React.useRef<HTMLDivElement>(null);

			return (
				<View gap={4}>
					<View.Item>
						<Button onClick={() => ref.current?.scrollBy({ top: 50, left: 50 })}>Scroll</Button>
					</View.Item>
					<ScrollArea height="100px" ref={ref} scrollbarDisplay="visible" onScroll={handleScroll}>
						<View backgroundColor="neutral-faded" padding={4} width="1000px" height="200px">
							Content
						</View>
					</ScrollArea>
				</View>
			);
		};

		await render(<Component />);
		await userEvent.click(page.getByRole("button", { name: "Scroll" }));

		await vi.waitFor(() => {
			expect(handleScroll).toHaveBeenCalledTimes(1);
			// x value depends on the viewport width, so only testing y here
			expect(handleScroll).toHaveBeenCalledWith(expect.objectContaining({ y: 0.5 }));
		});
	});

	test("className, attributes", async () => {
		await render(
			<ScrollArea className="test-classname" attributes={{ id: "test-id", "data-testid": "root" }}>
				Content
			</ScrollArea>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
