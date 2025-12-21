import type { IconProps } from "components/Icon";
import type React from "react";
import type * as G from "types/global";

export type BaseProps = {
	/** Expand / collapse icon size in units */
	iconSize?: IconProps["size"];
	/** Position of the expand / collapse icon */
	iconPosition?: "start" | "end";
	/** Gap between the trigger and the content */
	gap?: G.Responsive<number>;
	/** Node for inserting the trigger and the content */
	children?: React.ReactNode;
	/** Callback when the accordion is expanded or collapsed */
	onToggle?: (active: boolean) => void;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};

export type TriggerProps = {
	/** Node or render function for inserting the trigger */
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
	/** Node for inserting the expandable content */
	children?: React.ReactNode;
};

export type ControlledProps = BaseProps & {
	/** Control whether the accordion is expanded or collapsed, enables controlled mode */
	active: boolean;
	/** Control whether the accordion is expanded or collapsed by default, enables uncontrolled mode */
	defaultActive?: never;
};
export type UncontrolledProps = BaseProps & {
	/** Control whether the accordion is expanded or collapsed, enables controlled mode */
	active?: never;
	/** Control whether the accordion is expanded or collapsed by default, enables uncontrolled mode */
	defaultActive?: boolean;
};
export type Props = ControlledProps | UncontrolledProps;

export type ContextProps = Pick<BaseProps, "iconSize" | "iconPosition" | "gap"> & {
	triggerId: string;
	contentId: string;
	active: boolean;
	onToggle?: (active: boolean) => void;
};
