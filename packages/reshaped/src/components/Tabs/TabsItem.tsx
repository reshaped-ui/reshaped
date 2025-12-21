"use client";

import React from "react";

import Actionable, { type ActionableRef } from "components/Actionable";
import HiddenInput from "components/HiddenInput";
import Icon from "components/Icon";
import Text from "components/Text";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import { findParent } from "utilities/dom";
import { classNames } from "utilities/props";

import s from "./Tabs.module.css";
import { useTabs } from "./TabsContext";

import type * as T from "./Tabs.types";

const TabsItem = React.forwardRef<ActionableRef, T.ItemProps>((props, ref) => {
	const { value, children, icon, href, disabled, attributes } = props;
	const {
		onChange,
		panelId,
		buttonId,
		name,
		size,
		value: tabsValue,
		selection,
		elActiveRef,
		elPrevActiveRef,
		elScrollableRef,
	} = useTabs(value);
	const itemRef = React.useRef<HTMLDivElement>(null);
	const active = tabsValue === value;
	const visuallySelected = active && selection.status === "idle";
	const itemClassNames = classNames(
		s.item,
		visuallySelected && s["item--active"],
		disabled && s["item--disabled"]
	);
	const isFormControl = !!name;
	const tabAttributes = {
		role: "tab",
		tabIndex: active ? 0 : -1,
		"aria-selected": active,
	};

	const updateRefs = React.useCallback(() => {
		elPrevActiveRef.current = elActiveRef.current;
		elActiveRef.current = itemRef.current;
	}, [elActiveRef, elPrevActiveRef]);

	const handleChange = () => {
		if (href && !onChange) return;

		const listEl = elScrollableRef.current;
		const currentListItem = itemRef.current?.parentElement;
		const prevListItem = elActiveRef.current?.parentElement;

		if (onChange) onChange({ value, name });

		if (!listEl || !currentListItem || !prevListItem || listEl.scrollWidth === listEl.clientWidth) {
			return;
		}

		if (!elScrollableRef.current) return;

		// Big enough value to show there are more items and not overlap arrow controls
		const visibilityThreshold = 48;
		const elItem =
			itemRef.current && findParent(itemRef.current, (el) => el.hasAttribute("data-rs-tabs-item"));

		if (!elItem) return;

		const elScrollable = elScrollableRef.current;
		const startOverflow = elItem.offsetLeft - elScrollable.scrollLeft;
		const endOverflow =
			elScrollable.scrollLeft + elScrollable.clientWidth - (elItem.offsetLeft + elItem.clientWidth);

		if (startOverflow < visibilityThreshold || endOverflow < visibilityThreshold) {
			elScrollableRef.current.scrollTo({
				left: elItem.offsetLeft + elItem.clientWidth / 2 - elScrollable.clientWidth / 2,
				behavior: "smooth",
			});
		}
	};

	useIsomorphicLayoutEffect(() => {
		if (!active) return;
		updateRefs();
	}, [active, updateRefs]);

	return (
		<div {...attributes} className={itemClassNames} ref={itemRef} role="presentation">
			<Actionable
				ref={ref}
				href={href}
				disableFocusRing
				disabled={disabled}
				onClick={!name ? handleChange : undefined}
				className={s.button}
				as={name ? "label" : undefined}
				attributes={{
					...(!isFormControl && tabAttributes),
					"aria-controls": panelId,
					id: buttonId,
				}}
			>
				{name && (
					<HiddenInput
						type="radio"
						name={name}
						value={value}
						checked={visuallySelected}
						onChange={handleChange}
						className={s.radio}
					/>
				)}
				<span className={s.buttonContent}>
					{icon && <Icon svg={icon} className={s.icon} size={4} />}
					{children && (
						<Text
							variant={size === "large" ? "body-2" : "body-3"}
							weight="medium"
							className={s.buttonText}
						>
							{children}
						</Text>
					)}
				</span>
			</Actionable>
		</div>
	);
});

TabsItem.displayName = "Tabs.Item";

export default TabsItem;
