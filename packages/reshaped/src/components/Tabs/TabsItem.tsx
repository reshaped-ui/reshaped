"use client";

import React from "react";
import { classNames } from "@reshaped/utilities";

import Actionable, { type ActionableRef } from "@/components/Actionable";
import HiddenInput from "@/components/HiddenInput";
import Icon from "@/components/Icon";
import Text from "@/components/Text";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import type * as T from "./Tabs.types";
import { useTabs } from "./TabsContext";
import s from "./Tabs.module.css";

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
	} = useTabs(value);
	const itemRef = React.useRef<HTMLDivElement>(null);
	const active = tabsValue === value;
	const visuallySelected = active && selection.status === "idle";
	const buttonClassNames = classNames(
		s.button,
		visuallySelected && s["button--active"],
		disabled && s["button--disabled"]
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

		if (onChange) onChange({ value, name });
	};

	useIsomorphicLayoutEffect(() => {
		if (!active) return;
		updateRefs();
	}, [active, updateRefs]);

	return (
		<Actionable
			ref={ref}
			href={href}
			disableFocusRing
			disabled={disabled}
			onClick={!name ? handleChange : undefined}
			className={buttonClassNames}
			as={name ? "label" : undefined}
			attributes={{
				...attributes,
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

			<span className={s.buttonContent} ref={itemRef}>
				{icon && <Icon svg={icon} className={s.icon} size={4} />}
				{children && (
					<Text
						variant={size === "large" ? "body-1" : "body-2"}
						weight="medium"
						className={s.buttonText}
					>
						{children}
					</Text>
				)}
			</span>
		</Actionable>
	);
});

TabsItem.displayName = "Tabs.Item";

export default TabsItem;
