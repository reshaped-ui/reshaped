import type React from "react";
import type * as G from "types/global";

export type Props = {
	/** Id of the item to display as active */
	activeId?: string | number;
	/** Display variant for the item label */
	labelDisplay?: G.Responsive<"inline" | "hidden">;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Direction of the stepper */
	direction?: "row" | "column";
	/** Gap between items (default: 3) */
	gap?: G.Responsive<number>;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};

export type ItemProps = {
	/** Id of the item, used for selecting the active item */
	id?: string;
	/** Indicate that the item is completed */
	completed?: boolean;
	/** Title of the item */
	title?: React.ReactNode;
	/** Subtitle of the item */
	subtitle?: React.ReactNode;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};

export type ItemPrivateProps = ItemProps & {
	labelDisplay: Props["labelDisplay"];
	step: number;
	active: boolean;
	direction: Props["direction"];
	last: boolean;
};
