"use client";

import Text from "@/components/Text/index.js";
import { useFormControlPrivate } from "./FormControl.context.js";
import type * as T from "./FormControl.types.js";
import { getCaptionId } from "./FormControl.utilities.js";
import s from "./FormControl.module.css";

const FormControlCaption: React.FC<T.PrivateCaptionProps> = (props) => {
	const { children, variant, disabled } = props;
	const { attributes, size, helperRef, errorRef } = useFormControlPrivate();
	const id = getCaptionId(attributes.id, variant);
	const color = variant === "error" ? "critical" : "neutral-faded";
	const ref = variant === "error" ? errorRef : helperRef;

	return (
		<Text
			as="span"
			variant={size === "large" ? "body-2" : "caption-1"}
			color={disabled && !variant ? "disabled" : color}
			attributes={{ id, role: color ? "alert" : undefined, "aria-disabled": disabled, ref }}
			className={s.caption}
		>
			{children}
		</Text>
	);
};

export default FormControlCaption;
