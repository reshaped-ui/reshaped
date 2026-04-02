import type { Attributes } from "@/types/global";
import type { ClassName } from "@reshaped/utilities";
import type React from "react";

export type CloseReason = "overlay-click" | "escape-key";

export type Instance = {
	setOpacity: (value: number) => void;
} | null;

export type Props = {
	/** Make the overlay transparent */
	transparent?: boolean;
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
	/** Contain the component within the container element. Defaults to true when containerRef is provided */
	contained?: boolean;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Ref accessor for the overlay methods */
	instanceRef?: React.RefObject<Instance>;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};
