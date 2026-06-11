import { VIEWPORT_OFFSET } from "../constants";
import type { Options } from "../types";
import type { CalculatePositionResult } from "./calculatePosition";

type CalculateLayoutAdjustmentArgs = CalculatePositionResult &
	Pick<Options, "fallbackAdjustLayout" | "fallbackMinHeight" | "width"> & {
		flyoutBounds: DOMRect;
		triggerBounds: DOMRect;
		containerBounds: Pick<DOMRect, "left" | "top" | "width" | "height">;
	};

const calculateLayoutAdjustment = (args: CalculateLayoutAdjustmentArgs) => {
	const {
		position,
		styles,
		fallbackAdjustLayout,
		fallbackMinHeight,
		width: passedWidth,
		flyoutBounds,
		containerBounds,
		triggerBounds,
	} = args;
	const { width: flyoutWidth, height: flyoutHeight } = flyoutBounds;
	const {
		width: containerWidth,
		height: containerHeight,
		top: containerTop,
		left: containerLeft,
	} = containerBounds;
	const isHorizontalPosition = !!position.match(/^(start|end)/);

	let top = styles.top;
	let left = styles.left;
	let bottom = styles.bottom;
	let right = styles.right;
	let height: number | null = null;
	let width: number | null = null;

	if (fallbackAdjustLayout) {
		const getOverflow = () => {
			return {
				top: containerTop + VIEWPORT_OFFSET - top,
				bottom: top + flyoutHeight + VIEWPORT_OFFSET - containerTop - containerHeight,
				left: containerLeft + VIEWPORT_OFFSET - left,
				right: left + flyoutWidth + VIEWPORT_OFFSET - containerLeft - containerWidth,
			};
		};

		const overflow = getOverflow();

		if (isHorizontalPosition) {
			if (overflow.top > 0) {
				top = containerTop + VIEWPORT_OFFSET;
				if (bottom !== null) bottom = bottom - overflow.top;
			} else if (overflow.bottom > 0) {
				top = top - overflow.bottom;
			}
		} else {
			if (overflow.left > 0) {
				left = VIEWPORT_OFFSET + containerLeft;
				if (right !== null) right = right - overflow.left;
			} else if (overflow.right > 0) {
				left = left - overflow.right;
			}
		}

		const updatedOverflow = getOverflow();

		if (updatedOverflow.top > 0) {
			height = Math.max(parseInt(fallbackMinHeight ?? "0"), flyoutHeight - updatedOverflow.top);
			top = top + (flyoutHeight - height);
		} else if (updatedOverflow.bottom > 0) {
			height = Math.max(parseInt(fallbackMinHeight ?? "0"), flyoutHeight - updatedOverflow.bottom);
			if (bottom !== null) bottom = bottom + (flyoutHeight - height);
		}
	}

	if (passedWidth === "100%") {
		left = VIEWPORT_OFFSET;
		width = window.innerWidth - VIEWPORT_OFFSET * 2;
	} else if (passedWidth === "trigger") {
		width = triggerBounds.width;
	}

	return {
		position,
		styles: {
			left,
			right,
			top,
			bottom,
			height,
			width,
		},
	};
};

export default calculateLayoutAdjustment;
