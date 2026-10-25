import type React from "react";

import type * as T from "./FormControl.types";

export const getCaptionId = (id: string, variant?: T.PrivateCaptionProps["variant"]) =>
	`${id}-${variant || "caption"}`;

/**
 * Resolve the input element attributes inside FormControl.
 * Keeps the aria-describedby references passed to the input directly instead of overwriting them.
 */
export const getInputAttributes = <
	A extends Pick<React.AriaAttributes, "aria-describedby" | "aria-invalid" | "aria-required">,
>(args: {
	attributes?: A;
	formControl: { attributes: Partial<T.Context["attributes"]>; required?: boolean };
	hasError?: boolean;
}) => {
	const { attributes, formControl, hasError } = args;
	const describedby = [attributes?.["aria-describedby"], formControl.attributes["aria-describedby"]]
		.filter(Boolean)
		.join(" ");

	return {
		...attributes,
		...formControl.attributes,
		"aria-describedby": describedby || undefined,
		"aria-invalid": hasError || attributes?.["aria-invalid"],
		"aria-required": formControl.required || attributes?.["aria-required"],
	};
};
