import type React from "react";
import type * as G from "types/global";

export type CloseReason = "overlay-click" | "escape-key";

export type Props = {
	/** Make the overlay transparent */
	transparent?: boolean | number;
	/** Make the overlay blurred */
	blurred?: boolean;
	/** Control the overflow of the component content */
	overflow?: "auto" | "hidden";
	/** Node for inserting children, render function receives the state of the component as an argument */
	children?: React.ReactNode | ((props: { active: boolean }) => React.ReactNode);
	/** Control the visibility of the component */
	active?: boolean;
	/** Callback when the component is closed */
	onClose?: (args: { reason: CloseReason }) => void;
	/** Callback after the component close transition is complete */
	onAfterClose?: () => void;
	/** Callback when the component is opened */
	onOpen?: () => void;
	/** Callback after the component open transition is complete */
	onAfterOpen?: () => void;
	/** Disable closing the component on outside click */
	disableCloseOnClick?: boolean;
	/** Element to render the component in */
	containerRef?: React.RefObject<HTMLElement | null>;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};
