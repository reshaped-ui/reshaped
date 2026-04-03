"use client";

import React from "react";
import { classNames } from "@reshaped/utilities";

import Actionable from "@/components/Actionable";
import Text from "@/components/Text";
import { responsiveClassNames } from "@/utilities/props";
import { resolveMixin } from "@/styles/mixin";
import type * as T from "./Select.types";
import SelectEndContent from "./SelectEndContent";
import SelectStartContent from "./SelectStartContent";
import s from "./Select.module.css";

const SelectTrigger: React.FC<T.TriggerProps> = (props) => {
	const {
		children,
		disabled,
		onClick,
		attributes,
		className,
		variant = "outline",
		hasError,
		inputAttributes,
		startSlot,
		icon,
		size = "medium",
		placeholder,
		value,
		name,
		id,
	} = props;
	const mixin = resolveMixin({
		shadow: variant === "outline" ? "outline" : undefined,
		borderColor: disabled ? "disabled" : "neutral",
		border: variant === "outline" ? true : undefined,
	});
	const rootClassName = classNames(
		s.root,
		className,
		...mixin.classNames,
		size && responsiveClassNames(s, "--size", size),
		hasError && s["--status-error"],
		disabled && s["--disabled"],
		variant && s[`--variant-${variant}`]
	);

	return (
		<div
			{...attributes}
			style={{
				...(attributes?.style as React.CSSProperties),
				...mixin.variables,
			}}
			className={rootClassName}
			data-rs-aligner-target
		>
			<Actionable
				className={classNames(s.input, inputAttributes?.className)}
				disabled={disabled}
				disableFocusRing
				onClick={onClick}
				attributes={inputAttributes}
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
		</div>
	);
};

export default SelectTrigger;
