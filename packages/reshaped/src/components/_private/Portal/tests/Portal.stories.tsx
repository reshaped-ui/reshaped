import { StoryObj } from "@storybook/react-vite";
import React from "react";
import root from "react-shadow";
import { expect, userEvent, waitFor, within } from "storybook/test";

import Portal from "@/components/_private/Portal";

export default { title: "Internal/Portal" };

export const base = () => {
	const ref = React.useRef<HTMLDivElement>(null);
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<>
			<div style={{ border: "2px solid #333", padding: 16 }}>
				App
				{mounted && <Portal targetRef={ref}>Ported to green</Portal>}
			</div>
			<div ref={ref} style={{ border: "2px solid green", padding: 16 }} />
		</>
	);
};

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

export const testShadowRoot: StoryObj = {
	name: "test: shadow root",
	render: () => <ShadowPortal />,
	play: async ({ canvas }) => {
		const shadowRoot = canvas.getByTestId("shadow-host").shadowRoot!;
		const shadowCanvas = within(shadowRoot as unknown as HTMLElement);

		await waitFor(() => {
			expect(shadowCanvas.getByText("Ported in shadow root")).toBeInTheDocument();
		});

		await userEvent.click(shadowCanvas.getByRole("button"));
		await userEvent.click(shadowCanvas.getByRole("button"));

		// Portal content should stay inside the shadow root after re-rendering
		expect(shadowCanvas.getByText("Rerender 2")).toBeInTheDocument();
		expect(shadowCanvas.getByText("Ported in shadow root")).toBeInTheDocument();
		expect(document.body.textContent).not.toContain("Ported in shadow root");
	},
};
