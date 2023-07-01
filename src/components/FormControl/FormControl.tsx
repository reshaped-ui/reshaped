"use client";

import React from "react";
import useElementId from "hooks/useElementId";
import Text, { TextProps } from "components/Text";
import { Provider, useFormControlPrivate } from "./FormControl.context";
import type * as T from "./FormControl.types";
import s from "./FormControl.module.css";

const getCaptionId = (id: string, variant?: T.PrivateCaptionProps["variant"]) =>
	`${id}-${variant || "caption"}`;

const FormControl = (props: T.Props) => {
	const { children, id: passedId, required, hasError, group, disabled, size } = props;
	const id = useElementId(passedId);
	const WrapperTagName = group ? "fieldset" : "div";
	const [helperRendered, setHelperRendered] = React.useState(false);
	const [errorRendered, setErrorRendered] = React.useState(false);
	const describedby = [
		helperRendered && getCaptionId(id),
		errorRendered && getCaptionId(id, "error"),
	]
		.filter(Boolean)
		.join(" ");
	const attributes = { id, "aria-describedby": describedby };

	const errorRef = () => {
		setErrorRendered(true);
	};

	const helperRef = () => {
		setHelperRendered(true);
	};

	return (
		<WrapperTagName>
			<Provider
				value={{ required, hasError, errorRef, helperRef, attributes, group, disabled, size }}
			>
				{children}
			</Provider>
		</WrapperTagName>
	);
};

const FormControlLabel = (props: T.LabelProps) => {
	const { children } = props;
	const { attributes, required, group, disabled, size } = useFormControlPrivate();
	const id = `${attributes.id}-label`;
	const tagProps = group
		? ({ as: "legend", attributes: { id } } as Partial<TextProps<"legend">>)
		: ({
				as: "label",
				attributes: { id, htmlFor: attributes.id },
		  } as Partial<TextProps<"label">>);
	return (
		<Text
			{...tagProps}
			variant={size === "large" ? "body-2" : "body-3"}
			weight="medium"
			className={s.label}
			color={disabled ? "disabled" : undefined}
		>
			{children}
			{required && (
				<Text color={disabled ? "disabled" : "critical"} as="span">
					*
				</Text>
			)}
		</Text>
	);
};

/* Private component */
const FormControlCaption = (props: T.PrivateCaptionProps) => {
	const { children, variant, disabled } = props;
	const { attributes, size, helperRef, errorRef } = useFormControlPrivate();
	const id = getCaptionId(attributes.id, variant);
	const color = variant === "error" ? "critical" : "neutral-faded";
	const ref = variant === "error" ? errorRef : helperRef;

	return (
		<Text
			as="span"
			variant={size === "large" ? "body-2" : "body-3"}
			color={disabled && !variant ? "disabled" : color}
			attributes={{ id, role: color ? "alert" : undefined, ref }}
			className={s.caption}
		>
			{children}
		</Text>
	);
};

const FormControlHelper = (props: T.CaptionProps) => {
	const { children } = props;
	const { disabled } = useFormControlPrivate();

	return <FormControlCaption disabled={disabled}>{children}</FormControlCaption>;
};

const FormControlError = (props: T.CaptionProps) => {
	const { children } = props;
	const { hasError } = useFormControlPrivate();

	if (!hasError) return null;
	return <FormControlCaption variant="error">{children}</FormControlCaption>;
};

FormControl.Label = FormControlLabel;
FormControl.Helper = FormControlHelper;
FormControl.Error = FormControlError;

export default FormControl;
