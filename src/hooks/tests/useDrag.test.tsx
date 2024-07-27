import { fireEvent, render, screen } from "@testing-library/react";
import View from "components/View";
import useDrag from "hooks/useDrag";

const fixtures = {
	containerId: "container-id",
	handleId: "handle-id",
};

const Example = (props: {
	disabled?: boolean;
	onDragStart?: () => void;
	onDragEnd?: () => void;
	onDrag: (args: { x: number; y: number }) => void;
}) => {
	const { onDrag, onDragEnd, onDragStart, disabled } = props;

	const { ref, containerRef, active } = useDrag(
		(args) => {
			onDrag(args);
		},
		{
			disabled,
			onDragEnd,
			onDragStart,
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
	test("works with mouse events", () => {
		const handleDrag = jest.fn();
		const handleDragStart = jest.fn();
		const handleDragEnd = jest.fn();

		render(<Example onDrag={handleDrag} onDragEnd={handleDragEnd} onDragStart={handleDragStart} />);

		const spy = mockBrowser();
		const trigger = screen.getByTestId(fixtures.handleId);

		fireEvent.mouseDown(trigger);
		fireEvent.mouseMove(document.body, { clientX: 100, clientY: 50 });

		expect(handleDragStart).toHaveBeenCalledTimes(1);
		expect(handleDrag).toHaveBeenCalledTimes(1);
		expect(handleDrag).toHaveBeenCalledWith({ x: 100, y: 50 });

		fireEvent.mouseUp(trigger);
		fireEvent.mouseUp(document.body, { clientX: 50, clientY: 100 });

		expect(handleDragEnd).toHaveBeenCalledTimes(1);
		expect(handleDrag).toHaveBeenCalledTimes(1);

		spy.mockReset();
	});

	test("works with touch events", () => {
		const handleDrag = jest.fn();
		const handleDragStart = jest.fn();
		const handleDragEnd = jest.fn();

		render(<Example onDrag={handleDrag} onDragEnd={handleDragEnd} onDragStart={handleDragStart} />);

		const spy = mockBrowser();
		const trigger = screen.getByTestId(fixtures.handleId);

		fireEvent.touchStart(trigger, { changedTouches: [{ clientX: 0, clientY: 0 }] });
		fireEvent.touchMove(document.body, { changedTouches: [{ clientX: 100, clientY: 50 }] });

		expect(handleDragStart).toHaveBeenCalledTimes(1);
		expect(handleDrag).toHaveBeenCalledTimes(1);
		expect(handleDrag).toHaveBeenCalledWith({ x: 100, y: 50 });

		fireEvent.touchEnd(trigger);
		fireEvent.touchEnd(document.body, { changedTouches: [{ clientX: 100, clientY: 50 }] });

		expect(handleDragEnd).toHaveBeenCalledTimes(1);
		expect(handleDrag).toHaveBeenCalledTimes(1);

		spy.mockReset();
	});

	test("disables dragging", () => {
		const handleDrag = jest.fn();

		render(<Example onDrag={handleDrag} disabled />);

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
});
