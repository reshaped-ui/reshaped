import React from "react";
import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import { render } from "@/tests/render";
import useHandlerRef from "../useHandlerRef";

const Component = (props: { onEffect: () => void; count: number }) => {
	const { onEffect, count } = props;
	const onEffectRef = useHandlerRef(onEffect);

	React.useEffect(() => {
		onEffectRef.current();
	}, [onEffectRef]);

	return <>Counter: {count}</>;
};

describe("Hooks/useHandlerRef", () => {
	test("base", async () => {
		const handleEffect = vi.fn();
		const Demo = () => {
			const [count, setCount] = React.useState(0);

			return (
				<div>
					<button onClick={() => setCount((prev) => prev + 1)}>Increase count</button>
					{/* Creating a new handler on each render */}
					<Component onEffect={() => handleEffect(count)} count={count} />
				</div>
			);
		};
		await render(<Demo />);

		// mount, triggered twice in strict mode
		expect(handleEffect).toHaveBeenCalledTimes(2);

		await userEvent.click(page.getByRole("button"));
		await expect.element(page.getByText("Counter: 1")).toBeInTheDocument();

		// Rerendering the component doesn't re-trigger the effect
		expect(handleEffect).toHaveBeenCalledTimes(2);
	});

	test("ref points to the latest handler", async () => {
		const handler1 = vi.fn();
		const handler2 = vi.fn();
		let ref: React.RefObject<() => void> | undefined;
		const Demo = (props: { handler: () => void }) => {
			ref = useHandlerRef(props.handler);
			return null;
		};
		const { rerender } = await render(<Demo handler={handler1} />);

		await rerender(<Demo handler={handler2} />);
		ref!.current();

		expect(handler1).not.toHaveBeenCalled();
		expect(handler2).toHaveBeenCalledTimes(1);
	});
});
