"use client";

import React from "react";
import { classNames, throttle } from "utilities/helpers";
import useRTL from "hooks/useRTL";
import {
	focusNextElement,
	focusPreviousElement,
	focusFirstElement,
	focusLastElement,
} from "utilities/a11y/focus";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import useHotkeys from "hooks/useHotkeys";
import Button from "components/Button";
import IconChevronRight from "icons/ChevronRight";
import IconChevronLeft from "icons/ChevronLeft";
import TabsItem from "./TabsItem";
import { useTabs } from "./TabsContext";
import type * as T from "./Tabs.types";
import s from "./Tabs.module.css";

const findParentItem = (el: HTMLElement | null, rootEl: HTMLElement): HTMLElement | null => {
	if (el === rootEl || !el) return null;
	if (el.classList.contains(s.listItem)) return el;
	return findParentItem(el.parentElement, rootEl);
};

const TabsList = (props: T.ListProps) => {
	const { children, className, attributes } = props;
	const {
		value,
		setDefaultValue,
		itemWidth,
		variant,
		name,
		direction,
		size,
		selection,
		setSelection,
		elActiveRef,
		elPrevActiveRef,
		elScrollableRef,
	} = useTabs();
	const [rtl] = useRTL();
	const [cutOffSide, setCutOffSide] = React.useState<"start" | "end" | "both" | null>(null);
	const rootClassNames = classNames(
		s.root,
		size && s[`--size-${size}`],
		direction && s[`--direction-${direction}`],
		itemWidth && s[`--item-width-${itemWidth}`],
		variant && s[`--variant-${variant}`],
		cutOffSide && s[`--cut-off-${cutOffSide}`],
		className
	);
	const selectorClassNames = classNames(
		s.selector,
		selection.status === "idle" && s["--selector-hidden"],
		selection.status === "animated" && s["--selector-animated"]
	);

	const handleNextClick = () => {
		elScrollableRef.current!.scrollBy({
			// Using ceil here since during the second navigation half of the value may be
			// smaller than during the first navigation because of the odd numbers
			left: Math.ceil(elScrollableRef.current!.clientWidth / 2) * (rtl ? -1 : 1),
			behavior: "smooth",
		});
	};

	const handlePrevClick = () => {
		elScrollableRef.current!.scrollBy({
			left: Math.ceil(elScrollableRef.current!.clientWidth / 2) * (rtl ? 1 : -1),
			behavior: "smooth",
		});
	};

	const handleTransitionEnd = () => {
		setSelection((selectionStyle) => ({
			...selectionStyle,
			status: "idle",
		}));
	};

	const getElementSelectionStyle = React.useCallback(
		(el: HTMLElement): Pick<T.SelectionState, "scaleX" | "scaleY" | "left" | "top"> | null => {
			if (!elScrollableRef.current) return null;

			const itemEl = findParentItem(el, elScrollableRef.current);
			if (!itemEl) return null;

			return {
				scaleX: itemEl.clientWidth,
				scaleY: itemEl.clientHeight,
				top: itemEl.offsetTop,
				left: itemEl.offsetLeft,
			};
		},
		[elScrollableRef]
	);

	const { ref: hotkeysRef } = useHotkeys<HTMLDivElement>({
		"ArrowLeft, ArrowUp": (e) => {
			if (name) return;
			e.preventDefault();
			focusPreviousElement(elScrollableRef.current!);
		},
		"ArrowRight, ArrowDown": (e) => {
			if (name) return;
			e.preventDefault();
			focusNextElement(elScrollableRef.current!);
		},
		Home: (e) => {
			if (name) return;
			e.preventDefault();
			focusFirstElement(elScrollableRef.current!);
		},
		End: (e) => {
			if (name) return;
			e.preventDefault();
			focusLastElement(elScrollableRef.current!);
		},
	});

	useIsomorphicLayoutEffect(() => {
		if (value) return;

		const firstItem = React.Children.toArray(children)[0] as any;
		if (!firstItem || firstItem.type !== TabsItem) return;
		setDefaultValue(firstItem.props.value);
	}, [value]);

	useIsomorphicLayoutEffect(() => {
		// Do not update selection on mount, until we receive new activeId
		if (!elPrevActiveRef.current || elPrevActiveRef.current === elActiveRef.current) return;
		const selectionStyle = getElementSelectionStyle(elPrevActiveRef.current);

		if (!selectionStyle) return;
		setSelection({ ...selectionStyle, status: "prepared" });
	}, [value, getElementSelectionStyle]);

	useIsomorphicLayoutEffect(() => {
		if (selection.status !== "prepared" || !elActiveRef.current) return;
		const selectionStyle = getElementSelectionStyle(elActiveRef.current);

		if (!selectionStyle) return;
		setSelection({ ...selectionStyle, status: "animated" });
	}, [selection]);

	useIsomorphicLayoutEffect(() => {
		const elScrollable = elScrollableRef.current;
		if (!elScrollable || direction === "column") return;

		const updateArrowNav = () => {
			const isScrollable = elScrollable.clientWidth < elScrollable.scrollWidth;
			if (!isScrollable) setCutOffSide(null);

			// scrollLeft in RTL starts from 1 instead of 0, so we compare values using this delta
			const scrollLeft = elScrollable.scrollLeft * (rtl ? -1 : 1);
			const cutOffStart = scrollLeft > 1;
			const cutOffEnd = scrollLeft + elScrollable.clientWidth < elScrollable.scrollWidth - 1;

			if (cutOffEnd && cutOffStart) return setCutOffSide("both");
			if (cutOffStart) return setCutOffSide("start");
			if (cutOffEnd) return setCutOffSide("end");
		};
		const debouncedUpdateArrowNav = throttle(updateArrowNav, 100);

		// Use RaF when scroll to have scrollWidth calculated correctly on the first effect
		// For example: And edge case inside the complex flexbox layout
		requestAnimationFrame(() => {
			updateArrowNav();
		});
		window.addEventListener("resize", debouncedUpdateArrowNav);
		elScrollable.addEventListener("scroll", debouncedUpdateArrowNav);
		return () => {
			window.removeEventListener("resize", debouncedUpdateArrowNav);
			elScrollable.removeEventListener("scroll", debouncedUpdateArrowNav);
		};
	}, [rtl]);

	return (
		<div {...attributes} className={rootClassNames}>
			<div className={s.inner} ref={elScrollableRef}>
				<div className={s.list} role="tablist" ref={hotkeysRef}>
					{React.Children.map(children, (child: any, index: number) => {
						if (!child) return null;
						return (
							<div className={s.listItem} key={child.props.value || child.key || index}>
								{child}
							</div>
						);
					})}

					<div
						onTransitionEnd={handleTransitionEnd}
						className={selectorClassNames}
						style={
							{
								"--rs-tab-selection-x": selection.left,
								"--rs-tab-selection-y": selection.top,
								"--rs-tab-selection-scale-x": selection.scaleX,
								"--rs-tab-selection-scale-y": selection.scaleY,
							} as React.CSSProperties
						}
					/>
				</div>
			</div>

			{(cutOffSide === "start" || cutOffSide === "both") && (
				<span className={s.prev}>
					<Button
						onClick={handlePrevClick}
						size="small"
						icon={IconChevronLeft}
						rounded
						attributes={{ "aria-hidden": true, tabIndex: -1 }}
					/>
				</span>
			)}

			{(cutOffSide === "end" || cutOffSide === "both") && (
				<span className={s.next}>
					<Button
						onClick={handleNextClick}
						size="small"
						icon={IconChevronRight}
						rounded
						attributes={{ "aria-hidden": true, tabIndex: -1 }}
					/>
				</span>
			)}
		</div>
	);
};

export default TabsList;
