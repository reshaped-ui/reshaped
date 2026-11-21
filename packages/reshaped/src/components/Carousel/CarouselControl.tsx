"use client";

import { useState } from "react";
import { classNames } from "@reshaped/utilities";

import Button from "@/components/Button";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import IconChevronLeft from "@/icons/ChevronLeft";
import IconChevronRight from "@/icons/ChevronRight";
import * as T from "./Carousel.types";
import s from "./Carousel.module.css";

const CarouselControl = (props: T.ControlProps) => {
	const { type, controlRef, oppositeControlElRef, hidden, onClick, isRTL } = props;
	const [visible, setVisible] = useState(false);
	const [rendered, setRendered] = useState(false);
	const isDisplayedAsNext = type === (isRTL ? "back" : "forward");
	const controlClassNames = classNames(
		s.control,
		isDisplayedAsNext ? s["--control-next"] : s["--control-prev"],
		visible && s["--control-visible"],
		rendered && s["--control-rendered"]
	);

	useIsomorphicLayoutEffect(() => {
		// Scroll position is not resolved before the carousel is mounted
		if (hidden === undefined) return;

		let timer: ReturnType<typeof setTimeout>;

		if (hidden) {
			setVisible(false);
			timer = setTimeout(() => setRendered(false), 1500);

			if (controlRef.current && document.activeElement === controlRef.current) {
				oppositeControlElRef.current?.focus();
			}
		} else {
			setRendered(true);
			setVisible(true);
		}

		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [hidden]);

	return (
		<div className={controlClassNames}>
			<Button
				size="small"
				onClick={onClick}
				icon={isDisplayedAsNext ? IconChevronRight : IconChevronLeft}
				rounded
				variant="outline"
				raised
				attributes={{ "aria-disabled": !visible, "aria-hidden": true }}
				ref={controlRef}
			/>
		</div>
	);
};

CarouselControl.displayName = "CarouselControl";

export default CarouselControl;
