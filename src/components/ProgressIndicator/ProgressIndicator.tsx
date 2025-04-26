"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import { onNextFrame } from "utilities/animation";
import usePrevious from "hooks/_private/usePrevious";
import type * as T from "./ProgressIndicator.types";
import s from "./ProgressIndicator.module.css";

const MAX_RENDERED_ITEMS = 7;
const BOUNDARY = (MAX_RENDERED_ITEMS - 1) / 2;

const ProgressIndicator: React.FC<T.Props> = (props) => {
	const { total, activeIndex = 0, color = "primary", ariaLabel, className, attributes } = props;
	const allItemsVisible = total < MAX_RENDERED_ITEMS;
	const firstRenderedIndex = React.useMemo(() => {
		if (allItemsVisible) return 0;
		if (activeIndex <= BOUNDARY) return 0;
		if (activeIndex >= total - 1 - BOUNDARY) return total - MAX_RENDERED_ITEMS;
		return activeIndex - BOUNDARY;
	}, [activeIndex, allItemsVisible, total]);
	const [startIndex, setStartIndex] = React.useState(firstRenderedIndex);
	const previousActiveIndex = usePrevious(activeIndex);
	const [shift, setShift] = React.useState<"start" | "end" | null>(null);
	const [animated, setAnimatedState] = React.useState(true);
	const animatedRef = React.useRef(true);
	const rootClassName = classNames(
		s.root,
		className,
		shift && s[`--shift-${shift}`],
		color && s[`--color-${color}`],
		animated && s["--animated"]
	);
	const barAttributes = ariaLabel
		? {
				"aria-label": ariaLabel,
				role: "progressbar",
				"aria-valuenow": activeIndex,
				"aria-valuemin": 0,
				"aria-valuemax": total - 1,
			}
		: {};

	const setAnimated = (animated: boolean) => {
		setAnimatedState(animated);
		animatedRef.current = animated;
	};

	/**
	 * After the shift transition, disable the animation and reset the items position
	 */
	const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
		if (event.target !== event.currentTarget || event.pseudoElement) return;
		setAnimated(false);
	};

	React.useEffect(() => {
		if (animated) return;
		setShift(null);
	}, [animated]);

	React.useEffect(() => {
		if (shift) return;
		onNextFrame(() => setAnimated(true));
	}, [shift, firstRenderedIndex]);

	React.useEffect(() => {
		if (previousActiveIndex === activeIndex) return;
		const direction = previousActiveIndex && activeIndex < previousActiveIndex ? "start" : "end";
		const lastIndex = total - 1;
		const endThreshold = lastIndex - BOUNDARY;

		const isAtStartEdge =
			activeIndex < BOUNDARY || (direction === "end" && activeIndex === BOUNDARY);
		const isAtEndEdge =
			activeIndex > endThreshold || (direction === "start" && activeIndex === endThreshold);
		const isAtEdge = isAtStartEdge || isAtEndEdge;

		if (allItemsVisible || isAtEdge || !animatedRef.current) {
			setStartIndex(firstRenderedIndex);
			return;
		}

		setStartIndex(firstRenderedIndex);
		setShift(direction);
	}, [activeIndex, firstRenderedIndex, allItemsVisible, previousActiveIndex, total]);

	const renderItems = () => {
		let selectionDelta = 0;

		if (shift === "start") selectionDelta = -1;
		if (shift === "end") selectionDelta = 1;

		const itemAmount = Math.min(MAX_RENDERED_ITEMS, total);
		const items = [];
		const lastIndex = total - 1;
		const activeVisibleIndex = activeIndex - startIndex + selectionDelta;
		const rightExtra = Math.max(BOUNDARY - activeIndex, 0);
		const leftExtra = Math.max(BOUNDARY - (lastIndex - activeIndex), 0);
		const rightModifierIndex = activeVisibleIndex + rightExtra + 1;
		const leftModifierIndex = activeVisibleIndex - leftExtra - 1;

		for (let i = 0; i < itemAmount; i += 1) {
			const isActive = i === activeVisibleIndex;
			const isSmall = i === rightModifierIndex + 1 || i === leftModifierIndex - 1;
			const isSmaller = i === rightModifierIndex + 2 || i === leftModifierIndex - 2;
			const isHidden = i > rightModifierIndex + 2 || i < leftModifierIndex - 2;

			const itemClassName = classNames(
				s.item,
				isActive && s["item--active"],
				!allItemsVisible && isSmall && s["item--variant-secondary"],
				!allItemsVisible && isSmaller && s["item--variant-tertiary"],
				!allItemsVisible && isHidden && s["item--variant-hidden"]
			);

			items.push(<div className={itemClassName} key={i} />);
		}

		return items;
	};

	return (
		<div {...attributes} className={rootClassName}>
			<div {...barAttributes} className={s.container} onTransitionEnd={handleTransitionEnd}>
				{renderItems()}
			</div>
		</div>
	);
};

ProgressIndicator.displayName = "ProgressIndicator";

export default ProgressIndicator;
