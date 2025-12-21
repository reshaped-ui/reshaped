"use client";

import Text from "components/Text";

import { useFormControlPrivate } from "./FormControl.context";
import s from "./FormControl.module.css";

import type * as T from "./FormControl.types";

const FormControlLabel: React.FC<T.LabelProps> = (props) => {
	const { children } = props;
	const { attributes, required, group, disabled, size } = useFormControlPrivate();
	const id = `${attributes.id}-label`;
	const TagName = group ? "legend" : "label";

	return (
		<Text
			variant={size === "large" ? "body-2" : "body-3"}
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
