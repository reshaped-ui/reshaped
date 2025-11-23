import React from "react";

import type * as G from "types/global";

export type Props = {
	name?: string;
	value?: string;
	checked?: boolean;
	defaultChecked?: boolean;
	disabled?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onFocus?: (e: React.FocusEvent) => void;
	onBlur?: (e: React.FocusEvent) => void;
	type: "checkbox" | "radio";
	className?: G.ClassName;
	attributes?: G.Attributes<"input">;
};
