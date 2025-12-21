"use client";

import React from "react";

import View from "components/View";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import useRTL from "hooks/useRTL";
import { rafThrottle } from "utilities/helpers";
import { classNames, responsiveVariables, responsiveClassNames } from "utilities/props";

import s from "./Carousel.module.css";
import * as T from "./Carousel.types";
import CarouselControl from "./CarouselControl";

import type { ActionableRef } from "components/Actionable";

const Carousel: React.FC<T.Props> = (props) => {
	const {
		children,
		gap = 3,
		visibleItems,
		bleed,
		navigationDisplay,
		onChange,
		onScroll,
		instanceRef,
		className,
		attributes,
	} = props;
	const currentIndexRef = React.useRef(0);
	const itemRefs = React.useRef<(HTMLLIElement | null)[]>([]);
	const [mounted, setMounted] = React.useState(false);
	const [scrollPosition, setScrollPosition] = React.useState(0);
	const [isRTL] = useRTL();
	const scrollElRef = React.useRef<HTMLUListElement>(null);
	const prevControlElRef = React.useRef<ActionableRef>(null);
	const nextControlElRef = React.useRef<ActionableRef>(null);
	const bleedClassNames: Record<string, boolean> = {};

	if (typeof bleed === "object") {
		Object.entries(bleed).forEach(([key, value]) => {
			bleedClassNames[key] = typeof value === "number" && value > 0;
		});
	}

	const rootClassNames = classNames(
		s.root,
		className,
		...responsiveClassNames(s, "--bleed", typeof bleed === "number" ? true : bleedClassNames)
	);

	const handleItemRef = (el: HTMLLIElement | null, index: number) => {
		itemRefs.current[index] = el;

		// TODO: Enable in React v19 since it introduced refs cleanup
		// return () => {
		// 	itemRefs.current[index] = null;
		// };
	};

	// eslint-disable-next-line react-hooks/refs
	const handleScroll = rafThrottle((event: React.UIEvent<HTMLUListElement>) => {
		const el = event.target as Element;
		const firstVisibleIndex = getFirstVisibleIndex();

		setScrollPosition(el.scrollLeft);
		onScroll?.(event);

		if (currentIndexRef.current !== firstVisibleIndex) onChange?.({ index: firstVisibleIndex });
		currentIndexRef.current = firstVisibleIndex;
	});

	const getItemsGap = () => {
		const style = getComputedStyle(scrollElRef.current!);
		// Safari returns Npx Npx as a value, we need only the first one
		const xGap = style.gap.split(" ")[0];

		return Number(xGap.replace("px", ""));
	};

	const getFirstVisibleIndex = () => {
		let resultIndex = 0;
		let sizeCalc = 0;

		const scrollEl = scrollElRef.current;
		if (!scrollEl) return resultIndex;

		const scrollValue = isRTL ? -scrollEl.scrollLeft : scrollEl.scrollLeft;

		const gap = getItemsGap();
		itemRefs.current.some((el, index) => {
			if (!el) return false;

			const visible = sizeCalc + el.clientWidth / 2 >= scrollValue;

			if (visible) {
				resultIndex = index;
				return true;
			}

			sizeCalc += el?.clientWidth + gap;
			return false;
		});

		return resultIndex;
	};

	const navigateTo = (index: number) => {
		const scrollEl = scrollElRef.current!;
		const el = itemRefs.current[index];

		if (!el) return;

		scrollEl.scrollTo({
			// Browsers mirror offsetLeft value but we need to also keep the target element on the other side of the container
			// so adding addition calculations for the width of the content outside the target el
			left: isRTL ? el.offsetLeft - (scrollEl.clientWidth - el.clientWidth) : el.offsetLeft,
			top: 0,
			behavior: "smooth",
		});
	};

	const navigateRight = () => {
		const scrollEl = scrollElRef.current!;

		scrollEl.scrollBy({
			left: scrollEl.clientWidth + getItemsGap(),
			top: 0,
			behavior: "smooth",
		});
	};

	const navigateLeft = () => {
		const scrollEl = scrollElRef.current!;

		scrollEl.scrollBy({
			left: -scrollEl.clientWidth - getItemsGap(),
			top: 0,
			behavior: "smooth",
		});
	};

	const navigateBack = isRTL ? navigateRight : navigateLeft;
	const navigateForward = isRTL ? navigateLeft : navigateRight;

	React.useImperativeHandle(instanceRef, () => ({
		navigateBack,
		navigateForward,
		navigateTo,
	}));

	/**
	 * Changing flag here since scroll ref changing won't rerender the controls and show them after SSR
	 */
	useIsomorphicLayoutEffect(() => {
		setMounted(true);
	}, []);

	return (
		<section
			{...attributes}
			className={rootClassNames}
			style={{
				...responsiveVariables("--rs-carousel-items", visibleItems),
				...responsiveVariables("--rs-carousel-bleed", bleed),
				...attributes?.style,
			}}
		>
			{navigationDisplay !== "hidden" && (
				<>
					<CarouselControl
						isRTL={isRTL}
						type="back"
						ref={prevControlElRef}
						oppositeControlElRef={nextControlElRef}
						scrollElRef={scrollElRef}
						scrollPosition={scrollPosition}
						onClick={navigateBack}
						mounted={mounted}
					/>
					<CarouselControl
						isRTL={isRTL}
						type="forward"
						ref={nextControlElRef}
						oppositeControlElRef={prevControlElRef}
						scrollElRef={scrollElRef}
						scrollPosition={scrollPosition}
						onClick={navigateForward}
						mounted={mounted}
					/>
				</>
			)}

			<View
				as="ul"
				direction="row"
				wrap={false}
				gap={gap}
				className={s.scroll}
				attributes={{ ref: scrollElRef, onScroll: handleScroll }}
			>
				{React.Children.map(children, (child, index) => (
					<View.Item
						className={s.item}
						as="li"
						attributes={{ ref: (el) => handleItemRef(el, index) }}
					>
						{child}
					</View.Item>
				))}
			</View>
		</section>
	);
};

Carousel.displayName = "Carousel";

export default Carousel;
