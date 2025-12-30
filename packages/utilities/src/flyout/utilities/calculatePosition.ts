import { CONTAINER_OFFSET } from "../constants";

import centerBySize from "./centerBySize";
import getRTLPosition from "./getRTLPosition";

import type { Width, Position } from "../types";

type Args = {
	triggerBounds: DOMRect;
	flyoutBounds: DOMRect;
	containerBounds: DOMRect;
	passedContainer?: HTMLElement | null;
	position: Position;
	rtl: boolean;
	width?: Width;
	contentGap: number;
	contentShift: number;
	fallbackAdjustLayout?: boolean;
	fallbackMinHeight?: string;
};

const calculatePosition = (args: Args) => {
	const {
		triggerBounds,
		flyoutBounds,
		containerBounds,
		position: passedPosition,
		rtl,
		width: passedWidth,
		contentGap = 0,
		contentShift = 0,
		passedContainer,
		fallbackAdjustLayout,
		fallbackMinHeight,
	} = args;
	const position = rtl ? getRTLPosition(passedPosition) : passedPosition;
	const isHorizontalPosition = !!position.match(/^(start|end)/);

	let left: number = 0;
	let top: number = 0;
	let bottom: number | null = null;
	let right: number | null = null;
	let height: number | null = null;
	let width: number | null = null;

	// contentGap adds padding to the flyout to make sure it doesn't disapper while moving the mouse to the content
	// So its width/height is bigger than the visible part of the content
	const flyoutWidth = flyoutBounds.width + (isHorizontalPosition ? contentGap : 0);
	const flyoutHeight = flyoutBounds.height + (!isHorizontalPosition ? contentGap : 0);

	const triggerWidth = triggerBounds.width;
	const triggerHeight = triggerBounds.height;

	// Detect passed container scroll to sync the flyout position with it
	const containerX = passedContainer?.scrollLeft;
	const containerY = passedContainer?.scrollTop;

	const scrollX = containerX ?? window.scrollX;
	const scrollY = containerY ?? window.scrollY;

	const renderContainerHeight = passedContainer?.clientHeight ?? window.innerHeight;
	const renderContainerWidth = passedContainer?.clientWidth ?? window.innerWidth;

	// When rendering in the body, bottom bounds will be larrger than the viewport so we calculate it manually
	const containerBoundsBottom = passedContainer
		? containerBounds.bottom
		: window.innerHeight - scrollY;

	// When inside a container, adjut position based on the container scroll since flyout is rendered outside the scroll area
	const relativeLeft = triggerBounds.left - containerBounds.left + (containerX || 0);
	const relativeRight = containerBounds.right - triggerBounds.right - (containerX || 0);
	const relativeTop = triggerBounds.top - containerBounds.top + (containerY || 0);
	const relativeBottom = containerBoundsBottom - triggerBounds.bottom - (containerY || 0);

	console.log("position", position);

	switch (position) {
		case "start":
		case "start-top":
		case "start-bottom":
			left = relativeLeft - flyoutWidth;
			right = relativeRight + triggerWidth;
			break;

		case "end":
		case "end-top":
		case "end-bottom":
			left = relativeLeft + triggerWidth;
			break;

		case "bottom":
		case "top":
			left = relativeLeft + centerBySize(triggerWidth, flyoutWidth) + contentShift;
			console.log("left", left);
			break;

		case "top-start":
		case "bottom-start":
			left = relativeLeft + contentShift;
			console.log("left", left);
			break;

		case "top-end":
		case "bottom-end":
			left = relativeLeft + triggerWidth - flyoutWidth + contentShift;
			right = relativeRight - contentShift;
			break;

		default:
			break;
	}

	switch (position) {
		case "top":
		case "top-start":
		case "top-end":
			top = relativeTop - flyoutHeight;
			bottom = relativeBottom + triggerHeight;
			break;

		case "bottom":
		case "bottom-start":
		case "bottom-end":
			top = relativeTop + triggerHeight;
			break;

		case "start":
		case "end":
			top = relativeTop + centerBySize(triggerHeight, flyoutHeight) + contentShift;
			break;

		case "start-top":
		case "end-top":
			top = relativeTop + contentShift;
			break;

		case "start-bottom":
		case "end-bottom":
			top = relativeTop + triggerHeight - flyoutHeight + contentShift;
			bottom = relativeBottom - contentShift;
			break;

		default:
			break;
	}

	if (fallbackAdjustLayout) {
		const getOverflow = () => {
			return {
				top: -top + scrollY + CONTAINER_OFFSET,
				bottom: top + flyoutHeight + CONTAINER_OFFSET - scrollY - renderContainerHeight,
				left: -left + scrollX + CONTAINER_OFFSET,
				right: left + flyoutWidth + CONTAINER_OFFSET - scrollX - renderContainerWidth,
			};
		};

		const overflow = getOverflow();

		if (isHorizontalPosition) {
			if (overflow.top > 0) {
				top = CONTAINER_OFFSET + scrollY;
				if (bottom !== null) bottom = bottom - overflow.top;
			} else if (overflow.bottom > 0) {
				top = top - overflow.bottom;
			}
		} else {
			if (overflow.left > 0) {
				left = CONTAINER_OFFSET + scrollX;
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
		left = CONTAINER_OFFSET;
		width = window.innerWidth - CONTAINER_OFFSET * 2;
	} else if (passedWidth === "trigger") {
		width = triggerBounds.width;
	}

	const translateX = right !== null ? -right : left;
	const translateY = bottom !== null ? -bottom : top;

	return {
		position,
		styles: {
			left: right === null ? "0px" : null,
			right: right === null ? null : "0px",
			top: bottom === null ? "0px" : null,
			bottom: bottom === null ? null : "0px",
			transform: `translate(${translateX}px, ${translateY}px)`,
			height: height !== undefined ? `${height}px` : null,
			width: width !== undefined ? `${width}px` : (passedWidth ?? null),
		},
		boundaries: {
			left,
			top,
			height: height ?? Math.ceil(flyoutHeight),
			width: width ?? Math.ceil(flyoutWidth),
		},
	};
};

export default calculatePosition;
