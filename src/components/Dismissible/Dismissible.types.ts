import type React from "react";
import type * as G from "types/global";

type WithClose = {
	/** Hide the close button */
	hideCloseButton: true;
	/** aria-label attribute for the close button */
	closeAriaLabel?: string;
};
type WithoutClose = {
	/** Show the close button */
	hideCloseButton?: false;
	/** aria-label attribute for the close button */
	closeAriaLabel: string;
};
export type CloseProps = WithClose | WithoutClose;

export type Props = CloseProps & {
	/** Component render variant */
	variant?: "media";
	/** Close button alignment */
	align?: "top" | "center";
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Callback when the component is dismissed */
	onClose?: () => void;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};
