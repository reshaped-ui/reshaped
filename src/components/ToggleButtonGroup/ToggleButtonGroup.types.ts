import type React from "react";
import type { ButtonGroupProps } from "components/Button";
import type { ToggleButtonProps } from "components/ToggleButton";

type BaseProps = {
	selectionMode?: "single" | "multiple";
	onChange?: (args: {
		value: string[];
		event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
	}) => void;
} & ButtonGroupProps;

export type ControlledProps = BaseProps & { value: string[]; defaultValue?: never };
export type UncontrolledProps = BaseProps & { value?: never; defaultValue?: string[] };
export type Props = ControlledProps | UncontrolledProps;

export type Context = {
	onChange: ToggleButtonProps["onChange"];
	value?: string[];
};
