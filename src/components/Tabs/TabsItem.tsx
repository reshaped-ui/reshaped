"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import HiddenInput from "components/_private/HiddenInput";
import Actionable, { type ActionableRef } from "components/Actionable";
import Icon from "components/Icon";
import Text from "components/Text";
import { useTabs } from "./TabsContext";
import type * as T from "./Tabs.types";
import s from "./Tabs.module.css";

const TabsItem = (props: T.ItemProps, ref: ActionableRef) => {
	const { value, children, icon, href, attributes } = props;
	const {
		onChange,
		panelId,
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
	const itemClassNames = classNames(s.item, visuallySelected && s["--item-active"]);
	const isFormControl = !!name;
	const tabAttributes = {
		role: "tab",
		tabIndex: active ? 0 : -1,
		"aria-selected": active,
	};

	const updateRefs = React.useCallback(() => {
		if (!("current" in itemRef)) {
			throw new Error(
				"Reshaped, Tabs: TabItem is expecting an object ref format but received a function ref"
			);
		}

		elPrevActiveRef.current = elActiveRef.current;
		elActiveRef.current = itemRef.current;
	}, [elActiveRef, elPrevActiveRef]);

	const handleChange = () => {
		if (href && !onChange) return;

		const listEl = elScrollableRef.current;
		const currentListItem = itemRef.current?.parentElement;
		const prevListItem = elActiveRef.current?.parentElement;

		// Updating refs after saving the elements
		updateRefs();

		if (onChange) onChange({ value, name });

		if (!listEl || !currentListItem || !prevListItem || listEl.scrollWidth === listEl.clientWidth) {
			return;
		}

		const navigatingBack = currentListItem.offsetLeft < prevListItem.offsetLeft;
		const threshold = (currentListItem.offsetLeft - listEl.scrollLeft) / listEl.clientWidth;
		// Only scroll if the item is close to getting clipped
		// Back navigation threshold is 0.3 since its calculated based on offsetLeft
		const shouldScroll = navigatingBack ? threshold < 0.3 : threshold > 0.5;

		if (!shouldScroll) return;
		itemRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
	};

	React.useEffect(() => {
		if (!active) return;
		updateRefs();
	}, [active, updateRefs]);

	return (
		<div {...attributes} className={itemClassNames} ref={itemRef} role="presentation">
			<Actionable
				ref={ref}
				href={href}
				insetFocus
				onClick={!name ? handleChange : undefined}
				className={s.button}
				as={name ? "label" : undefined}
				attributes={{
					...(!isFormControl && tabAttributes),
					"aria-controls": panelId,
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
						<Text variant={size === "large" ? "body-2" : "body-3"} weight="medium">
							{children}
						</Text>
					)}
				</span>
			</Actionable>
		</div>
	);
};

export default React.forwardRef(TabsItem);
