"use client";

import React from "react";
import { classNames } from "@reshaped/utilities";

import Actionable from "@/components/Actionable/index.js";
import Text from "@/components/Text/index.js";
import { responsiveClassNames } from "@/utilities/props.js";
import { resolveMixin } from "@/styles/mixin.js";
import type * as T from "./Select.types.js";
import SelectEndContent from "./SelectEndContent.js";
import SelectHiddenInput from "./SelectHiddenInput.js";
import SelectStartContent from "./SelectStartContent.js";
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
		triggerAttributes,
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
				attributes={triggerAttributes}
			>
				<SelectStartContent startSlot={startSlot} icon={icon} size={size} />
				{children ? (
					<Text maxLines={typeof children === "string" ? 1 : undefined}>{children}</Text>
				) : null}
				{placeholder && !children ? <Text color="disabled">{placeholder}</Text> : null}
				<SelectEndContent disabled={disabled} size={size} />
			</Actionable>

			<SelectHiddenInput value={value} name={name} id={id} inputAttributes={inputAttributes} />
		</div>
	);
};

export default SelectTrigger;
