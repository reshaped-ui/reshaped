import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { IconProps } from "@/components/Icon";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

export type BaseProps = {
	/** Expand / collapse icon size, literal css value or unit token multiplier
	 * @default 4
	 */
	iconSize?: IconProps["size"];
	/** Position of the expand / collapse icon
	 * @default "end"
	 */
	iconPosition?: "start" | "end";
	/** Gap between the trigger and the content, base unit token number multiplier */
	gap?: G.Responsive<number>;
	/** Node for inserting the trigger and the content */
	children?: React.ReactNode;
	/** Callback when the trigger is clicked, receives the next active state */
	onToggle?: (active: boolean) => void;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};

export type TriggerProps = {
	/** Node or render function for inserting the trigger.
	 * The function replaces the default trigger and its icon, pass the attributes it receives to your own interactive element
	 */
	children?:
		| ((
				attributes: {
					"aria-expanded": boolean;
					"aria-controls": string;
					id: string;
					onClick: () => void;
				},
				props: { active: boolean }
		  ) => React.ReactNode)
		| React.ReactNode;
};

export type ContentProps = {
	/** Node for inserting the expandable content, stays mounted while collapsed */
	children?: React.ReactNode;
};

export type ControlledProps = BaseProps & {
	/** Control whether the accordion is expanded or collapsed, enables controlled mode */
	active: boolean;
	/** Control whether the accordion is expanded or collapsed by default, enables uncontrolled mode
	 * @default false
	 */
	defaultActive?: never;
};
export type UncontrolledProps = BaseProps & {
	/** Control whether the accordion is expanded or collapsed, enables controlled mode */
	active?: never;
	/** Control whether the accordion is expanded or collapsed by default, enables uncontrolled mode
	 * @default false
	 */
	defaultActive?: boolean;
};
export type Props = ControlledProps | UncontrolledProps;

export type ContextProps = Pick<BaseProps, "iconSize" | "iconPosition" | "gap"> & {
	triggerId: string;
	contentId: string;
	active: boolean;
	onToggle?: (active: boolean) => void;
};
