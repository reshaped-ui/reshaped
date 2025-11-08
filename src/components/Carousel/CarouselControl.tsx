"use client";

import { forwardRef, useState } from "react";

import Button from "components/Button";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import IconChevronLeft from "icons/ChevronLeft";
import IconChevronRight from "icons/ChevronRight";
import { classNames } from "utilities/props";

import s from "./Carousel.module.css";
import * as T from "./Carousel.types";

import type { ActionableRef } from "components/Actionable";

const CarouselControl = forwardRef<ActionableRef, T.ControlProps>((props, ref) => {
	const { type, scrollElRef, oppositeControlElRef, scrollPosition, onClick, isRTL, mounted } =
		props;
	const [visible, setVisible] = useState(false);
	const [rendered, setRendered] = useState(false);
	const isNext = type === "forward";
	const isDisplayedAsNext = type === (isRTL ? "back" : "forward");
	const controlClassNames = classNames(
		s.control,
		isDisplayedAsNext ? s["--control-next"] : s["--control-prev"],
		visible && s["--control-visible"],
		rendered && s["--control-rendered"]
	);

	useIsomorphicLayoutEffect(() => {
		const scrollEl = scrollElRef.current;
		if (!scrollEl || !mounted) return;

		let timer: ReturnType<typeof setTimeout>;
		const normalizedScrollPosition = Math.abs(scrollPosition);
		const isScrollAtStart = normalizedScrollPosition <= 0;
		const isScrollAtEnd =
			normalizedScrollPosition + scrollEl.clientWidth >= scrollEl.scrollWidth - 1;
		const hideControl = isNext ? isScrollAtEnd : isScrollAtStart;

		if (hideControl) {
			setVisible(false);
			timer = setTimeout(() => setRendered(false), 1500);

			oppositeControlElRef.current?.focus();
		} else {
			setRendered(true);
			setVisible(true);
		}

		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [scrollPosition, scrollElRef, mounted, isNext]);

	return (
		<div className={controlClassNames}>
			<Button
				size="small"
				onClick={onClick}
				icon={isDisplayedAsNext ? IconChevronRight : IconChevronLeft}
				rounded
				variant="outline"
				elevated
				attributes={{ "aria-disabled": !visible, "aria-hidden": true }}
				ref={ref}
			/>
		</div>
	);
});

CarouselControl.displayName = "CarouselControl";

export default CarouselControl;
