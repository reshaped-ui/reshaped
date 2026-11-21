import React from "react";
import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Button from "@/components/Button";
import Carousel, { type CarouselInstance } from "@/components/Carousel";
import View from "@/components/View";
import { render } from "@/tests/render";

const Item = (props: { children: React.ReactNode }) => (
	<View height="100px" backgroundColor="neutral-faded">
		{props.children}
	</View>
);

describe("Components/Carousel", () => {
	test("instanceRef, onChange", async () => {
		const handleChange = vi.fn();

		const Component = () => {
			const carouselRef = React.useRef<CarouselInstance>(null);

			return (
				<View gap={3}>
					<View gap={3} direction="row" align="center">
						<Button onClick={() => carouselRef.current?.navigateBack()}>Back</Button>
						<Button onClick={() => carouselRef.current?.navigateForward()}>Forward</Button>
						<Button onClick={() => carouselRef.current?.navigateTo(3)}>To 3</Button>
					</View>
					<Carousel
						visibleItems={2}
						instanceRef={carouselRef}
						navigationDisplay="hidden"
						onChange={handleChange}
					>
						<Item>Item 0</Item>
						<Item>Item 1</Item>
						<Item>Item 2</Item>
						<Item>Item 3</Item>
						<Item>Item 4</Item>
						<Item>Item 5</Item>
					</Carousel>
				</View>
			);
		};

		await render(<Component />);

		await userEvent.click(page.getByRole("button", { name: "Forward" }));

		await vi.waitFor(() => {
			expect(handleChange).toHaveBeenCalledWith({ index: 1 });
			expect(handleChange).toHaveBeenCalledWith({ index: 2 });
		});
		expect(handleChange).not.toHaveBeenCalledWith({ index: 3 });

		handleChange.mockClear();
		await userEvent.click(page.getByRole("button", { name: "Back" }));

		await vi.waitFor(() => {
			expect(handleChange).toHaveBeenCalledWith({ index: 1 });
			expect(handleChange).toHaveBeenCalledWith({ index: 0 });
		});

		handleChange.mockClear();
		await userEvent.click(page.getByRole("button", { name: "To 3" }));

		await vi.waitFor(() => {
			expect(handleChange).toHaveBeenCalledWith({ index: 1 });
			expect(handleChange).toHaveBeenCalledWith({ index: 2 });
			expect(handleChange).toHaveBeenCalledWith({ index: 3 });
		});
	});

	test("className, attributes", async () => {
		await render(
			<Carousel
				visibleItems={2}
				className="test-classname"
				attributes={{ id: "test-id", "data-testid": "root" }}
			>
				<Item>Item 0</Item>
				<Item>Item 1</Item>
				<Item>Item 2</Item>
			</Carousel>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});

	test("navigation controls", async () => {
		const handleRender = vi.fn();

		await render(
			<React.Profiler id="carousel" onRender={handleRender}>
				<Carousel visibleItems={2} attributes={{ "data-testid": "root" }}>
					<Item>Item 0</Item>
					<Item>Item 1</Item>
					<Item>Item 2</Item>
					<Item>Item 3</Item>
					<Item>Item 4</Item>
					<Item>Item 5</Item>
				</Carousel>
			</React.Profiler>
		);
		const root = page.getByTestId("root").element();
		const scrollEl = root.querySelector("ul")!;
		const [backControl, forwardControl] = Array.from(root.querySelectorAll("button")).map(
			(button) => button.parentElement!
		);

		await expect.element(backControl).toHaveStyle({ opacity: "0" });
		await expect.element(forwardControl).toHaveStyle({ opacity: "1" });

		handleRender.mockClear();
		scrollEl.scrollTo({ left: scrollEl.scrollWidth, behavior: "smooth" });

		// Smooth scrolling through the whole carousel takes longer than the default timeout
		await expect
			.poll(() => scrollEl.scrollLeft + scrollEl.clientWidth, { timeout: 5000 })
			.toBeGreaterThanOrEqual(scrollEl.scrollWidth - 1);
		await expect.element(backControl).toHaveStyle({ opacity: "1" });
		await expect.element(forwardControl).toHaveStyle({ opacity: "0" });

		// Carousel only renders when the controls change and not on every frame of the scroll animation
		expect(handleRender.mock.calls.length).toBeLessThan(8);
	});
});
