"use client";

import React from "react";

import Actionable from "components/Actionable";
import Text from "components/Text";

import s from "./Select.module.css";
import SelectEndContent from "./SelectEndContent";
import SelectStartContent from "./SelectStartContent";

import type * as T from "./Select.types";

const SelectTrigger: React.FC<T.TriggerProps> = (props) => {
	const {
		children,
		disabled,
		onClick,
		onFocus,
		onBlur,
		inputAttributes,
		startSlot,
		icon,
		size,
		placeholder,
		value,
		name,
		id,
	} = props;

	return (
		<>
			<Actionable
				className={s.input}
				disabled={disabled}
				disableFocusRing
				onClick={onClick}
				attributes={{
					onFocus: onFocus || inputAttributes?.onFocus,
					onBlur: onBlur || inputAttributes?.onBlur,
					...inputAttributes,
				}}
			>
				<SelectStartContent startSlot={startSlot} icon={icon} size={size} />
				{children ? (
					<Text maxLines={typeof children === "string" ? 1 : undefined}>{children}</Text>
				) : null}
				{placeholder && !children ? <Text color="disabled">{placeholder}</Text> : null}
				<SelectEndContent disabled={disabled} size={size} />
			</Actionable>

			<input
				type="hidden"
				value={typeof value === "string" ? value : JSON.stringify(value)}
				name={name}
				id={id}
			/>
		</>
	);
};

export default SelectTrigger;
