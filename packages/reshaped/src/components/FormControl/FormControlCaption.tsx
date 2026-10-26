"use client";

import Text from "@/components/Text";
import { useFormControlPrivate } from "./FormControl.context";
import type * as T from "./FormControl.types";
import { getCaptionId } from "./FormControl.utilities";
import s from "./FormControl.module.css";

const FormControlCaption: React.FC<T.PrivateCaptionProps> = (props) => {
	const { children, variant, disabled } = props;
	const { id: formControlId, size, helperRef, errorRef } = useFormControlPrivate();
	const id = getCaptionId(formControlId, variant);
	const isError = variant === "error";
	const color = isError ? "critical" : "neutral-faded";
	const ref = isError ? errorRef : helperRef;

	return (
		<Text
			as="span"
			variant={size === "large" ? "body-2" : "caption-1"}
			color={disabled && !variant ? "disabled" : color}
			attributes={{
				id,
				"aria-live": isError ? "polite" : undefined,
				"aria-disabled": disabled,
				ref,
			}}
			className={s.caption}
		>
			{children}
		</Text>
	);
};

export default FormControlCaption;
