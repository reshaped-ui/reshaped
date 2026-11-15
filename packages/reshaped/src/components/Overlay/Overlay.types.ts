import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { Attributes } from "@/types/global";

export type CloseReason = "overlay-click" | "escape-key";

export type Instance = {
	/** Set the opacity of the overlay backdrop with a value from 0 to 1, ignored for transparent overlays */
	setOpacity: (value: number) => void;
} | null;

export type Props = {
	/** Make the overlay transparent and keep the page behind it interactive.
	 * Page scrolling isn't locked and outside clicks don't close the component in this case
	 */
	transparent?: boolean;
	/** Make the overlay blurred */
	blurred?: boolean;
	/** Control the overflow of the component content, "auto" makes the overlay scrollable when the content doesn't fit into it */
	overflow?: "auto" | "hidden";
	/** Node for inserting children, render function receives the state of the component as an argument.
	 * Use its active flag to animate the content together with the overlay
	 */
	children?: React.ReactNode | ((props: { active: boolean }) => React.ReactNode);
	/** Control the visibility of the component. The component doesn't change it itself, set it to false in the onClose handler */
	active?: boolean;
	/** Callback when the Escape key is pressed or the overlay is clicked outside of its content, the component doesn't close itself */
	onClose?: (args: { reason: CloseReason }) => void;
	/** Callback after the component close transition is complete */
	onAfterClose?: () => void;
	/** Callback after the component open transition is complete */
	onAfterOpen?: () => void;
	/** Disable closing the component on outside click, it can still be closed with the Escape key */
	disableCloseOnClick?: boolean;
	/** Element to render the component in using a portal, instead of document.body.
	 * The component covers this element instead of the viewport and locks its scrolling instead of the page scrolling
	 */
	containerRef?: React.RefObject<HTMLElement | null>;
	/** Contain the component within the container element, defaults to true when containerRef is provided and is ignored without it.
	 * Pass false to render the component in the container but keep it covering the viewport
	 */
	contained?: boolean;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Ref accessor for the overlay methods */
	instanceRef?: React.RefObject<Instance>;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};
