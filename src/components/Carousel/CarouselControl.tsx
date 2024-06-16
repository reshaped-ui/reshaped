"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import Button from "components/Button";
import IconChevronRight from "icons/ChevronRight";
import IconChevronLeft from "icons/ChevronLeft";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import * as T from "./Carousel.types";
import s from "./Carousel.module.css";

const CarouselControl = (props: T.ControlProps) => {
	const { type, scrollElRef, scrollPosition, onClick, isRTL, mounted } = props;
	const [visible, setVisible] = React.useState(false);
	const [rendered, setRendered] = React.useState(false);
	const isNext = type === T.ControlType.forward;
	const isDisplayedAsNext = type === (isRTL ? T.ControlType.back : T.ControlType.forward);
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
		} else {
			setRendered(true);
			setVisible(true);
		}

		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [scrollPosition, scrollElRef.current, mounted]);

	return (
		<div className={controlClassNames} aria-hidden="true">
			<Button
				onClick={onClick}
				icon={isDisplayedAsNext ? IconChevronRight : IconChevronLeft}
				rounded
				variant="outline"
				elevated
				attributes={{ "aria-disabled": !visible }}
			/>
		</div>
	);
};

export default CarouselControl;
