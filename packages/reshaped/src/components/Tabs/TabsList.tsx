"use client";

import React from "react";

import Actionable from "components/Actionable";
import Icon from "components/Icon";
import useFadeSide from "hooks/_private/useFadeSide";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import useKeyboardArrowNavigation from "hooks/useKeyboardArrowNavigation";
import useRTL from "hooks/useRTL";
import IconChevronLeft from "icons/ChevronLeft";
import IconChevronRight from "icons/ChevronRight";
import { classNames } from "utilities/props";

import s from "./Tabs.module.css";
import { useTabs } from "./TabsContext";
import TabsItem from "./TabsItem";

import type * as T from "./Tabs.types";

const findParentItem = (el: HTMLElement | null, rootEl: HTMLElement): HTMLElement | null => {
	if (el === rootEl || !el) return null;
	if (el.classList.contains(s.listItem)) return el;
	return findParentItem(el.parentElement, rootEl);
};

const TabsList: React.FC<T.ListProps> = (props) => {
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
		disableSelectionAnimation,
	} = useTabs();
	const [rtl] = useRTL();
	const fadeSide = useFadeSide(elScrollableRef, { disabled: itemWidth === "equal" });
	const rootClassNames = classNames(
		s.root,
		size && s[`--size-${size}`],
		direction && s[`--direction-${direction}`],
		itemWidth && s[`--item-width-${itemWidth}`],
		variant && s[`--variant-${variant}`],
		fadeSide && s["--scrollable"],
		(fadeSide === "start" || fadeSide === "both") && s["--fade-start"],
		(fadeSide === "end" || fadeSide === "both") && s["--fade-end"],
		className
	);
	const selectorClassNames = classNames(
		s.selector,
		selection.status === "idle" && s["selector--hidden"],
		selection.status === "animated" && s["selector--animated"]
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

	useKeyboardArrowNavigation({ ref: elScrollableRef, disabled: !!name });

	useIsomorphicLayoutEffect(() => {
		if (value) return;

		const firstItem = React.Children.toArray(children)[0];

		if (!React.isValidElement(firstItem)) return;
		if (!firstItem || firstItem.type !== TabsItem) return;

		const props = firstItem.props as T.ItemProps;

		setDefaultValue(props.value);
	}, [value]);

	useIsomorphicLayoutEffect(() => {
		// Do not update selection on mount, until we receive new activeId
		if (!elPrevActiveRef.current || elPrevActiveRef.current === elActiveRef.current) return;
		const selectionStyle = getElementSelectionStyle(elPrevActiveRef.current);

		if (!selectionStyle) return;

		if (disableSelectionAnimation) {
			setSelection({ ...selectionStyle, status: "idle" });
			return;
		}

		setSelection({ ...selectionStyle, status: "prepared" });
	}, [value, getElementSelectionStyle, disableSelectionAnimation]);

	useIsomorphicLayoutEffect(() => {
		if (selection.status !== "prepared" || !elActiveRef.current) return;
		const selectionStyle = getElementSelectionStyle(elActiveRef.current);

		if (!selectionStyle) return;
		setSelection({ ...selectionStyle, status: "animated" });
	}, [selection]);

	return (
		<div {...attributes} className={rootClassNames}>
			<div className={s.inner} ref={elScrollableRef}>
				<div className={s.list} role="tablist">
					{React.Children.map(children, (child, index: number) => {
						if (!React.isValidElement(child)) return null;
						const props = child.props as T.ItemProps;

						return (
							<div className={s.listItem} key={props.value || child.key || index} data-rs-tabs-item>
								{child}
							</div>
						);
					})}

					{!disableSelectionAnimation && (
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
					)}
				</div>
			</div>

			<Actionable
				onClick={handlePrevClick}
				touchHitbox
				attributes={{ "aria-hidden": true, tabIndex: -1 }}
				className={[
					s.control,
					s["control--prev"],
					(fadeSide === "start" || fadeSide === "both") && s["control--active"],
				]}
			>
				<Icon svg={IconChevronLeft} size={5} />
			</Actionable>

			<Actionable
				onClick={handleNextClick}
				touchHitbox
				attributes={{ "aria-hidden": true, tabIndex: -1 }}
				className={[
					s.control,
					s["control--next"],
					(fadeSide === "end" || fadeSide === "both") && s["control--active"],
				]}
			>
				<Icon svg={IconChevronRight} size={5} />
			</Actionable>
		</div>
	);
};

TabsList.displayName = "Tabs.List";

export default TabsList;
