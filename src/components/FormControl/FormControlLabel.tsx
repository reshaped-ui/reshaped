"use client";

import { useFormControlPrivate } from "./FormControl.context";
import Text, { type TextProps } from "components/Text";
import type * as T from "./FormControl.types";
import s from "./FormControl.module.css";

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
			aria-disabled={disabled}
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

export default FormControlLabel;
