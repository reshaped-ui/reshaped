import React from "react";
import { describe, expect, test } from "vitest";
import { page, userEvent } from "vitest/browser";

import Button from "@/components/Button";
import { ToastProvider, useToast } from "@/components/Toast";
import View from "@/components/View";
import { render } from "@/tests/render";

describe("Components/Toast", () => {
	test("className, attributes", async () => {
		const Component = () => {
			const toast = useToast();

			return (
				<Button
					onClick={() => {
						toast.show({
							text: "Content",
							attributes: { "data-testid": "test-id" },
							className: "test-classname",
						});
					}}
				>
					Show toast
				</Button>
			);
		};
		await render(<Component />);

		await userEvent.click(page.getByRole("button", { name: "Show toast" }));

		const toast = page.getByTestId("test-id");
		await expect.element(toast).toBeInTheDocument();
		await expect.element(toast).toHaveClass("test-classname");
	});

	test("hide", async () => {
		const Component = () => {
			const toast = useToast();

			return (
				<Button
					onClick={() => {
						const id = toast.show({
							text: "Content",
							timeout: 0,
							actionsSlot: <Button onClick={() => toast.hide(id)}>Close</Button>,
						});
					}}
				>
					Show toast
				</Button>
			);
		};
		await render(<Component />);

		await userEvent.click(page.getByRole("button", { name: "Show toast" }));
		await expect.element(page.getByText("Content")).toBeVisible();

		await userEvent.click(page.getByRole("button", { name: "Close" }));
		await expect.element(page.getByText("Content")).not.toBeInTheDocument();
	});

	test("containerRef, global", async () => {
		const Demo = () => {
			const toast = useToast();
			const globalIdRef = React.useRef<string>(null);

			return (
				<View direction="row" gap={2}>
					<Button
						onClick={() => {
							toast.show({ text: "Content", position: "top-start" });
						}}
					>
						Show toast
					</Button>
					<Button
						onClick={() => {
							globalIdRef.current = toast.show({
								text: "Global content",
								position: "top-start",
								timeout: 0,
								global: true,
							});
						}}
					>
						Show global toast
					</Button>
					<Button
						onClick={() => {
							if (globalIdRef.current) toast.hide(globalIdRef.current, { global: true });
						}}
					>
						Hide global toast
					</Button>
				</View>
			);
		};
		const Component = () => {
			const ref = React.useRef<HTMLDivElement>(null);

			return (
				<ToastProvider containerRef={ref}>
					{/* Keep the triggers below the global top-start toast region */}
					<View gap={4} align="start" paddingTop={40}>
						<Demo />
						<View
							attributes={{ ref, "data-testid": "test-container-ref-id" }}
							position="relative"
							width="100%"
							minHeight={50}
						/>
					</View>
				</ToastProvider>
			);
		};
		await render(<Component />);
		const container = page.getByTestId("test-container-ref-id");

		// Local toast renders inside the containerRef target
		await userEvent.click(page.getByRole("button", { name: "Show toast" }));
		await expect.element(container.getByText("Content")).toBeInTheDocument();

		// Global toast renders outside the containerRef target
		await userEvent.click(page.getByRole("button", { name: "Show global toast" }));
		const globalToast = page.getByText("Global content");
		await expect.element(globalToast).toBeInTheDocument();
		expect(container.element()).not.toContainElement(globalToast.element() as HTMLElement);

		await userEvent.click(page.getByRole("button", { name: "Hide global toast" }));
		await expect.element(globalToast).not.toBeInTheDocument();
	});
});
