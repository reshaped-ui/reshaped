import React from "react";
import type * as G from "types/global";

type BaseProps = {
	children?: React.ReactNode;
	id?: string;
	name: string;
	disabled?: boolean;
	reversed?: boolean;
	size?: "medium" | "small" | "large";
	onChange?: G.ChangeHandler<boolean>;
	onFocus?: (e: React.FocusEvent) => void;
	onBlur?: (e: React.FocusEvent) => void;
	className?: G.ClassName;
	attributes?: G.Attributes<"label">;
	inputAttributes?: G.Attributes<"input">;
};

export type ControlledProps = BaseProps & { defaultChecked?: never; checked: boolean };
export type UncontrolledProps = BaseProps & { defaultChecked?: boolean; checked?: boolean };
export type Props = ControlledProps | UncontrolledProps;
