import type React from "react";
import type * as G from "types/global";
import type { FormControlProps } from "components/FormControl";
import type { IconProps } from "components/Icon";

type Size = G.Responsive<"small" | "medium" | "large" | "xlarge">;

export type BaseProps = {
	id?: string;
	name: string;
	size?: Size;
	disabled?: boolean;
	focused?: boolean;
	multiline?: boolean;
	rounded?: boolean;
	placeholder?: string;
	icon?: SlotProps["icon"];
	endIcon?: SlotProps["icon"];
	startSlot?: SlotProps["slot"];
	endSlot?: SlotProps["slot"];
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	variant?: "outline" | "faded" | "headless";
	onChange?: G.ChangeHandler<string>;
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
	inputAttributes?: G.Attributes<"input">;
} & Pick<FormControlProps, "hasError">;

export type ControlledProps = BaseProps & { value: string; defaultValue?: never };
export type UncontrolledProps = BaseProps & { value?: never; defaultValue?: string };
export type Props = ControlledProps | UncontrolledProps;

export type SlotProps = {
	id: string;
	slot?: React.ReactNode;
	icon?: IconProps["svg"];
	size: Size;
	affix?: React.ReactNode;
	position: "start" | "end";
};
