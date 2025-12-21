import type { IconProps } from "components/Icon";
import type React from "react";
import type * as G from "types/global";

export type SelectionState = {
	left: number;
	top: number;
	scaleX: number;
	scaleY: number;
	status: "idle" | "prepared" | "animated";
};

export type ItemProps = {
	/** Value of the item used for the active item selection */
	value: string;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Icon of the item at the start position */
	icon?: IconProps["svg"];
	/** Link of the item, renders as an anchor element */
	href?: string;
	/** Disable the item user interaction */
	disabled?: boolean;
	/** Additional attributes for the item element */
	attributes?: G.Attributes<"div">;
};

export type ListProps = {
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Additional classname for the list element */
	className?: G.ClassName;
	/** Additional attributes for the list element */
	attributes?: G.Attributes<"div">;
};

export type PanelProps = {
	/** Value of the panel used for the active panel selection */
	value: string;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Additional classname for the panel element */
	className?: G.ClassName;
	/** Additional attributes for the panel element */
	attributes?: G.Attributes<"div">;
};

export type BaseProps = {
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Direction of the tab buttons */
	direction?: "column" | "row";
	/** Equal width for the tab buttons */
	itemWidth?: "equal";
	/** Render variant for component */
	variant?: "bordered" | "borderless" | "pills" | "pills-elevated";
	/** Component size */
	size?: "medium" | "large";
	/** Name of the tab buttons group when used as a form control */
	name?: string;
	/** Disable the animation of the tab button selection */
	disableSelectionAnimation?: boolean;
	/** Callback when the active tab value changes */
	onChange?: (args: { value: string; name?: string }) => void;
};

export type ControlledProps = BaseProps & {
	/** Value of the active tab, enables controlled mode */
	value?: string;
	/** Default value of the active tab, enables uncontrolled mode */
	defaultValue?: never;
};

export type PrivateControlledProps = ControlledProps & {
	onSilentChange: BaseProps["onChange"];
};

export type UncontrolledProps = BaseProps & {
	/** Value of the active tab, enables controlled mode */
	value?: never;
	/** Default value of the active tab, enables uncontrolled mode */
	defaultValue?: string;
};

export type Props = ControlledProps | UncontrolledProps;

export type Context = Pick<
	BaseProps,
	"itemWidth" | "onChange" | "variant" | "name" | "direction" | "disableSelectionAnimation"
> & {
	size: NonNullable<BaseProps["size"]>;
	value?: string;
	setDefaultValue: (value: string) => void;
	id: string;
	elActiveRef: React.RefObject<HTMLDivElement | null>;
	elPrevActiveRef: React.RefObject<HTMLDivElement | null>;
	elScrollableRef: React.RefObject<HTMLDivElement | null>;
	selection: SelectionState;
	setSelection: React.Dispatch<React.SetStateAction<SelectionState>>;
};
