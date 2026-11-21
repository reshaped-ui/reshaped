import React from "react";
import root from "react-shadow";
import { describe, expect, test } from "vitest";
import { page, userEvent } from "vitest/browser";

import Portal from "@/components/_private/Portal";
import { render } from "@/tests/render";

const ShadowPortal = () => {
	const [mounted, setMounted] = React.useState(false);
	const [count, setCount] = React.useState(0);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<root.div data-testid="shadow-host">
			<button type="button" onClick={() => setCount((prev) => prev + 1)}>
				Rerender {count}
			</button>
			{mounted && <Portal>Ported in shadow root</Portal>}
		</root.div>
	);
};

const TargetPortal = () => {
	const ref = React.useRef<HTMLDivElement>(null);
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<>
			<div data-testid="app">{mounted && <Portal targetRef={ref}>Ported to target</Portal>}</div>
			<div data-testid="target" ref={ref} />
		</>
	);
};

describe("Internal/Portal", () => {
	test("renders in body by default", async () => {
		const Component = () => {
			const [mounted, setMounted] = React.useState(false);

			React.useEffect(() => {
				setMounted(true);
			}, []);

			return <div data-testid="app">{mounted && <Portal>Ported to body</Portal>}</div>;
		};
		await render(<Component />);
		const content = page.getByText("Ported to body");

		await expect.element(content).toBeInTheDocument();
		expect(page.getByTestId("app").element().contains(content.element())).toBe(false);
	});

	test("targetRef", async () => {
		await render(<TargetPortal />);
		const content = page.getByText("Ported to target");

		await expect.element(content).toBeInTheDocument();
		expect(page.getByTestId("target").element().contains(content.element())).toBe(true);
		expect(page.getByTestId("app").element().contains(content.element())).toBe(false);
	});

	test("shadow root", async () => {
		await render(<ShadowPortal />);
		const shadowRoot = page.getByTestId("shadow-host").element().shadowRoot!;
		const content = page.getByText("Ported in shadow root");
		const button = page.getByRole("button");

		await expect.element(content).toBeInTheDocument();
		expect(shadowRoot.contains(content.element())).toBe(true);

		await userEvent.click(button);
		await userEvent.click(button);

		// Portal content should stay inside the shadow root after re-rendering
		await expect.element(page.getByText("Rerender 2")).toBeInTheDocument();
		expect(shadowRoot.contains(page.getByText("Rerender 2").element())).toBe(true);
		await expect.element(content).toBeInTheDocument();
		expect(shadowRoot.contains(content.element())).toBe(true);
		expect(document.body.textContent).not.toContain("Ported in shadow root");
	});
});
