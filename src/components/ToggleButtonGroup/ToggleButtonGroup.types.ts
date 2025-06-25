import type React from "react";
import type { ToggleButtonProps } from "components/ToggleButton";

type BaseProps = {
	children?: React.ReactNode;
	selectionMode?: "single" | "multiple";
	onChange?: (args: {
		value: string[];
		event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
	}) => void;
};

export type ControlledProps = BaseProps & { value: string[]; defaultValue?: never };
export type UncontrolledProps = BaseProps & { value?: never; defaultValue?: string[] };
export type Props = ControlledProps | UncontrolledProps;

export type Context = {
	onChange: ToggleButtonProps["onChange"];
	value?: string[];
};
