"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import HiddenInput from "components/_private/HiddenInput";
import Actionable from "components/Actionable";
import Icon from "components/Icon";
import Text from "components/Text";
import { useTabs } from "./TabsContext";
import type * as T from "./Tabs.types";
import s from "./Tabs.module.css";

const TabsItem = (props: T.PrivateItemProps, ref: React.Ref<HTMLDivElement>) => {
	const { value, children, icon, active, visuallySelected, attributes } = props;
	const { onChange, panelId, name, size } = useTabs(value);
	const itemClassNames = classNames(s.item, visuallySelected && s["--item-active"]);
	const isFormControl = !!name;
	const tabAttributes = {
		role: "tab",
		tabIndex: active ? 0 : -1,
		"aria-selected": active,
	};

	const handleChange = () => {
		if (onChange) onChange({ value, name });
	};

	return (
		<div className={itemClassNames} ref={ref} role="presentation">
			<Actionable
				insetFocus
				onClick={!name ? handleChange : undefined}
				className={s.button}
				as={name ? "label" : undefined}
				attributes={{
					...attributes,
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
