"use client";

import React from "react";
import useElementId from "hooks/useElementId";
import Text, { TextProps } from "components/Text";
import { Provider, useFormControlPrivate } from "./FormControl.context";
import type * as T from "./FormControl.types";
import s from "./FormControl.module.css";

const getCaptionId = (id: string) => `${id}-caption`;

const FormControl = (props: T.Props) => {
	const { children, id: passedId, required, hasSuccess, hasError, group, disabled, size } = props;
	const id = useElementId(passedId);
	const attributes = { id, "aria-describedby": getCaptionId(id) };
	const WrapperTagName = group ? "fieldset" : "div";

	return (
		<WrapperTagName>
			<Provider value={{ required, hasSuccess, hasError, attributes, group, disabled, size }}>
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
	const { children, color } = props;
	const { attributes, size } = useFormControlPrivate();
	const id = getCaptionId(attributes.id);

	return (
		<Text
			as="span"
			variant={size === "large" ? "body-2" : "body-3"}
			color={color || "neutral-faded"}
			attributes={{ id, role: color ? "alert" : undefined }}
			className={s.caption}
		>
			{children}
		</Text>
	);
};

const FormControlHelper = (props: T.CaptionProps) => {
	const { children } = props;
	const { disabled } = useFormControlPrivate();

	return (
		<FormControlCaption color={disabled ? "disabled" : "neutral-faded"}>
			{children}
		</FormControlCaption>
	);
};

const FormControlError = (props: T.CaptionProps) => {
	const { children } = props;
	const { hasError } = useFormControlPrivate();

	if (!hasError) return null;
	return <FormControlCaption color="critical">{children}</FormControlCaption>;
};

const FormControlSuccess = (props: T.CaptionProps) => {
	const { children } = props;
	const { hasSuccess } = useFormControlPrivate();

	if (!hasSuccess) return null;
	return <FormControlCaption color="positive">{children}</FormControlCaption>;
};

FormControl.Label = FormControlLabel;
FormControl.Helper = FormControlHelper;
FormControl.Error = FormControlError;
FormControl.Success = FormControlSuccess;

export default FormControl;
