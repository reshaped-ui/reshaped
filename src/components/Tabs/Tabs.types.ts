import React from "react";
import { IconProps } from "components/Icon";
import type * as G from "types/global";

export type SelectionState = {
	left: number;
	top: number;
	scaleX: number;
	scaleY: number;
	status: "idle" | "prepared" | "animated";
};

export type ItemProps = {
	value: string;
	children?: React.ReactNode;
	icon?: IconProps["svg"];
	href?: string;
	attributes?: G.Attributes<"div", Props>;
};

export type ListProps = {
	children?: React.ReactNode;
	className?: G.ClassName;
	attributes?: G.Attributes<"div", Props>;
};

export type PanelProps = {
	value: string;
	children?: React.ReactNode;
};

export type BaseProps = {
	children?: React.ReactNode;
	direction?: "column" | "row";
	itemWidth?: "equal";
	variant?: "bordered" | "borderless" | "pills" | "pills-elevated";
	size?: "medium" | "large";
	name?: string;
	onChange?: (args: { value: string; name?: string }) => void;
};

export type ControlledProps = BaseProps & {
	value?: string;
	defaultValue?: never;
};

export type PrivateControlledProps = ControlledProps & {
	onSilentChange: BaseProps["onChange"];
};

export type UncontrolledProps = BaseProps & {
	value?: never;
	defaultValue?: string;
};

export type Props = ControlledProps | UncontrolledProps;

export type Context = Pick<
	BaseProps,
	"itemWidth" | "onChange" | "variant" | "name" | "direction"
> & {
	size: NonNullable<BaseProps["size"]>;
	value?: string;
	setDefaultValue: (value: string) => void;
	id: string;
	elActiveRef: React.MutableRefObject<HTMLDivElement | null>;
	elPrevActiveRef: React.MutableRefObject<HTMLDivElement | null>;
	selection: SelectionState;
	setSelection: React.Dispatch<React.SetStateAction<SelectionState>>;
};
