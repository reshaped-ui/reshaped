"use client";

import Text from "@/components/Text";
import { useFormControlPrivate } from "./FormControl.context";
import type * as T from "./FormControl.types";
import s from "./FormControl.module.css";

const FormControlLabel: React.FC<T.LabelProps> = (props) => {
	const { children } = props;
	const { attributes, required, group, disabled, size } = useFormControlPrivate();
	const id = `${attributes.id}-label`;
	const TagName = group ? "legend" : "label";

	return (
		<Text
			variant={size === "large" ? "body-1" : "body-2"}
			weight="medium"
			className={s.label}
			color={disabled ? "disabled" : undefined}
			aria-disabled={disabled}
		>
			<TagName id={id} htmlFor={group ? undefined : attributes.id}>
				{children}
			</TagName>

			{required && (
				<Text color={disabled ? "disabled" : "critical"} as="span">
					*
				</Text>
			)}
		</Text>
	);
};

FormControlLabel.displayName = "FormControl.Label";

export default FormControlLabel;
