"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import HiddenInput from "components/_private/HiddenInput";
import Actionable, { ActionableRef } from "components/Actionable";
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
	} = useTabs(value);
	const itemRef = React.useRef<HTMLDivElement | null>(null);
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

		updateRefs();

		itemRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
		if (onChange) onChange({ value, name });
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
					{children && <Text variant={size === "large" ? "body-2" : "body-3"}>{children}</Text>}
				</span>
			</Actionable>
		</div>
	);
};

export default React.forwardRef(TabsItem);
