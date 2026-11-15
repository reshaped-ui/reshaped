import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { ActionableProps } from "@/components/Actionable";
import type { IconProps } from "@/components/Icon";
import type { Attributes } from "@/types/global";

export type SelectionState = {
	left: number;
	top: number;
	scaleX: number;
	scaleY: number;
	status: "idle" | "prepared" | "animated";
};

export type ItemProps = {
	/** Value of the item used for the active item selection, links the item to the Tabs.Panel with the same value */
	value: string;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Icon of the item at the start position */
	icon?: IconProps["svg"];
	/** Link of the item, renders as an anchor element. Clicking the item still triggers the Tabs onChange */
	href?: string;
	/** Disable the item user interaction */
	disabled?: boolean;
	/** Additional attributes for the item element */
	attributes?: ActionableProps["attributes"];
};

export type ListProps = {
	/** Node for inserting Tabs.Item components */
	children?: React.ReactNode;
	/** Additional classname for the root element of the list */
	className?: ClassName;
	/** Additional attributes for the root element of the list, which wraps the element with the tablist role */
	attributes?: Attributes<"div">;
};

export type PanelProps = {
	/** Value of the panel used for the active panel selection, should match the value of its Tabs.Item */
	value: string;
	/** Node for inserting children. Rendered only while the panel is active, so its state is not preserved when switching tabs */
	children?: React.ReactNode;
	/** Additional classname for the panel element */
	className?: ClassName;
	/** Additional attributes for the panel element */
	attributes?: Attributes<"div">;
};

export type BaseProps = {
	/** Node for inserting Tabs.List and Tabs.Panel components, they can be placed at any depth since Tabs doesn't render an element itself */
	children?: React.ReactNode;
	/** Direction of the tab buttons
	 * @default "row"
	 */
	direction?: "column" | "row";
	/** Equal width for the tab buttons, they fill the list width and truncate their text instead of making the list scrollable */
	itemWidth?: "equal";
	/** Render variant for component
	 * @default "bordered"
	 */
	variant?: "bordered" | "borderless" | "pills" | "pills-raised";
	/** Component size
	 * @default "medium"
	 */
	size?: "small" | "medium" | "large";
	/** Name of the tab buttons group when used as a form control.
	 * Renders the tab buttons as radio inputs, so the selected value is submitted with the form
	 */
	name?: string;
	/** Disable the animation of the tab button selection */
	disableSelectionAnimation?: boolean;
	/** Callback when the active tab value changes */
	onChange?: (args: { value: string; name?: string }) => void;
};

export type ControlledProps = BaseProps & {
	/** Value of the active tab, enables controlled mode */
	value: string;
	/** Default value of the active tab, enables uncontrolled mode.
	 * No tab is selected when it doesn't match any of the item values
	 */
	defaultValue?: never;
};

export type UncontrolledProps = BaseProps & {
	/** Value of the active tab, enables controlled mode */
	value?: never;
	/** Default value of the active tab, enables uncontrolled mode.
	 * No tab is selected when it doesn't match any of the item values
	 */
	defaultValue: string;
};

export type Props = ControlledProps | UncontrolledProps;

export type Context = Pick<
	BaseProps,
	"itemWidth" | "onChange" | "variant" | "name" | "direction" | "disableSelectionAnimation"
> & {
	size: NonNullable<BaseProps["size"]>;
	value?: string;
	id: string;
	registerPanel: (value: string) => void;
	unregisterPanel: (value: string) => void;
	hasPanel: (value: string) => boolean;
	elActiveRef: React.RefObject<HTMLDivElement | null>;
	elPrevActiveRef: React.RefObject<HTMLDivElement | null>;
	elScrollableRef: React.RefObject<HTMLDivElement | null>;
	selection: SelectionState;
	setSelection: React.Dispatch<React.SetStateAction<SelectionState>>;
};
