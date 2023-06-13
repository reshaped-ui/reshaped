"use client";

import React from "react";
import {
	classNames,
	responsiveVariables,
	responsiveClassNames,
	debounceHandler,
} from "utilities/helpers";
import View from "components/View";
import useRTL from "hooks/useRTL";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import CarouselControl from "./CarouselControl";
import * as T from "./Carousel.types";
import s from "./Carousel.module.css";

const Carousel = (props: T.Props) => {
	const {
		children,
		gap = 3,
		visibleItems,
		bleed,
		navigationDisplay,
		instanceRef,
		className,
		attributes,
	} = props;
	const [mounted, setMounted] = React.useState(false);
	const [scrollPosition, setScrollPosition] = React.useState(0);
	const [isRTL] = useRTL();
	const scrollElRef = React.useRef<HTMLUListElement>(null);
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

	const handleScroll = debounceHandler((event: React.UIEvent<HTMLUListElement>) => {
		const el = event.target as Element;
		setScrollPosition(el.scrollLeft);
	}, 16);

	const getItemsGap = () => {
		const style = getComputedStyle(scrollElRef.current!);
		// Safari returns Npx Npx as a value, we need only the first one
		const xGap = style.gap.split(" ")[0];

		return Number(xGap.replace("px", ""));
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
			}}
		>
			{navigationDisplay !== "hidden" && (
				<>
					<CarouselControl
						isRTL={isRTL}
						type={T.ControlType.back}
						scrollElRef={scrollElRef}
						scrollPosition={scrollPosition}
						onClick={navigateBack}
						mounted={mounted}
					/>
					<CarouselControl
						isRTL={isRTL}
						type={T.ControlType.forward}
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
				{React.Children.map(children, (child) => (
					<View.Item className={s.item} as="li">
						{child}
					</View.Item>
				))}
			</View>
		</section>
	);
};

export default Carousel;
