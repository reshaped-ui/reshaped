import { fireEvent, render, screen } from "@testing-library/react";
import View from "components/View";
import Reshaped from "components/Reshaped";
import useDrag from "hooks/useDrag";

const fixtures = {
	containerId: "container-id",
	handleId: "handle-id",
};

const Example = (props: {
	disabled?: boolean;
	onDrag: (args: { x: number; y: number }) => void;
	orientation?: "horizontal" | "vertical";
}) => {
	const { onDrag, orientation, disabled } = props;

	const { ref, containerRef, active } = useDrag<HTMLDivElement>(
		(args) => {
			onDrag(args);
		},
		{
			disabled,
			orientation,
		}
	);

	return (
		<View
			backgroundColor="neutral-faded"
			borderRadius="medium"
			width="200px"
			height="200px"
			attributes={{ ref: containerRef, "data-testid": fixtures.containerId }}
		>
			<View
				height={8}
				width={8}
				borderRadius="small"
				animated
				backgroundColor={active ? "primary" : "neutral"}
				attributes={{
					"data-testid": fixtures.handleId,
					ref,
				}}
			/>
		</View>
	);
};

const mockBrowser = () => {
	const element = document.querySelector(`[data-testid="${fixtures.containerId}"]`)!;

	return jest.spyOn(element, "getBoundingClientRect").mockImplementation(() => {
		return {
			width: 500,
			height: 500,
			x: 0,
			y: 0,
			bottom: 0,
			left: 0,
			right: 0,
			top: 0,
			toJSON: () => {},
		};
	});
};

describe("useDrag", () => {
	test("callback works with mouse events", () => {
		const handleDrag = jest.fn();

		render(
			<Reshaped>
				<Example onDrag={handleDrag} />
			</Reshaped>
		);

		const spy = mockBrowser();
		const trigger = screen.getByTestId(fixtures.handleId);

		fireEvent.mouseDown(trigger);
		fireEvent.mouseMove(document.body, { clientX: 100, clientY: 50 });

		expect(handleDrag).toHaveBeenCalledTimes(1);
		expect(handleDrag).toHaveBeenCalledWith(expect.objectContaining({ x: 100, y: 50 }));

		fireEvent.mouseUp(trigger);
		fireEvent.mouseUp(document.body, { clientX: 50, clientY: 100 });

		expect(handleDrag).toHaveBeenCalledTimes(1);

		spy.mockReset();
	});

	test("callback works with touch events", () => {
		const handleDrag = jest.fn();

		render(
			<Reshaped>
				<Example onDrag={handleDrag} />
			</Reshaped>
		);

		const spy = mockBrowser();
		const trigger = screen.getByTestId(fixtures.handleId);

		fireEvent.touchStart(trigger, { changedTouches: [{ clientX: 0, clientY: 0 }] });
		fireEvent.touchMove(document.body, { changedTouches: [{ clientX: 100, clientY: 50 }] });

		expect(handleDrag).toHaveBeenCalledTimes(1);
		expect(handleDrag).toHaveBeenCalledWith(expect.objectContaining({ x: 100, y: 50 }));

		fireEvent.touchEnd(trigger);
		fireEvent.touchEnd(document.body, { changedTouches: [{ clientX: 100, clientY: 50 }] });

		expect(handleDrag).toHaveBeenCalledTimes(1);

		spy.mockReset();
	});

	test("orientation: horizontal", () => {
		const handleDrag = jest.fn();

		render(
			<Reshaped>
				<Example onDrag={handleDrag} orientation="horizontal" />
			</Reshaped>
		);

		const spy = mockBrowser();
		const trigger = screen.getByTestId(fixtures.handleId);

		fireEvent.mouseDown(trigger);
		fireEvent.mouseMove(document.body, { clientX: 100, clientY: 50 });

		expect(handleDrag).toHaveBeenCalledTimes(1);
		expect(handleDrag).toHaveBeenCalledWith(expect.objectContaining({ x: 100, y: 0 }));

		spy.mockReset();
	});

	test("orientation: vertical", () => {
		const handleDrag = jest.fn();

		render(
			<Reshaped>
				<Example onDrag={handleDrag} orientation="vertical" />
			</Reshaped>
		);

		const spy = mockBrowser();
		const trigger = screen.getByTestId(fixtures.handleId);

		fireEvent.mouseDown(trigger);
		fireEvent.mouseMove(document.body, { clientX: 100, clientY: 50 });

		expect(handleDrag).toHaveBeenCalledTimes(1);
		expect(handleDrag).toHaveBeenCalledWith(expect.objectContaining({ x: 0, y: 50 }));

		spy.mockReset();
	});

	test("disabled", () => {
		const handleDrag = jest.fn();

		render(
			<Reshaped>
				<Example onDrag={handleDrag} disabled />
			</Reshaped>
		);

		const spy = mockBrowser();
		const trigger = screen.getByTestId(fixtures.handleId);

		fireEvent.touchStart(trigger, { changedTouches: [{ clientX: 0, clientY: 0 }] });
		fireEvent.touchMove(document.body, { changedTouches: [{ clientX: 100, clientY: 50 }] });

		expect(handleDrag).toHaveBeenCalledTimes(0);

		fireEvent.touchEnd(trigger);
		fireEvent.touchEnd(document.body, { changedTouches: [{ clientX: 100, clientY: 50 }] });

		expect(handleDrag).toHaveBeenCalledTimes(0);

		spy.mockReset();
	});

	test.todo("callback works with keyboard events [userEvent only triggers hotkeys on body]");
});
