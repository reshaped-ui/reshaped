import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { OverlayCloseReason, OverlayProps } from "@/components/Overlay";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

export type Position = "center" | "end" | "bottom" | "start" | "full-screen";

export type Context = {
	id: string;
	titleMounted: boolean;
	setTitleMounted: (b: boolean) => void;
	subtitleMounted: boolean;
	setSubtitleMounted: (b: boolean) => void;
};

export type TitleProps = {
	/** Node for inserting the title text, used as the accessible name of the modal */
	children: React.ReactNode;
};

export type SubtitleProps = {
	/** Node for inserting the subtitle text, used as the accessible description of the modal */
	children: React.ReactNode;
};

export type Props = {
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Component position on the screen, "start" and "end" render it as a side drawer and "bottom" as a bottom sheet
	 * @default "center"
	 */
	position?: G.Responsive<Position>;
	/** Component size, literal css value.
	 * Defines the width of the modal, or its height for the "bottom" position, and is ignored for the "full-screen" position
	 */
	size?: G.Responsive<string>;
	/** Component padding, unit token multiplier
	 * @default 4
	 */
	padding?: G.Responsive<number>;
	/** Let the content render outside of the component bounds instead of clipping or scrolling it */
	overflow?: "visible";
	/** Callback when the Escape key is pressed, the overlay is clicked or the component is swiped away.
	 * The component doesn't close itself, set active to false here
	 */
	onClose?: (args: { reason: OverlayCloseReason | "drag" }) => void;
	/** Make the overlay transparent and keep the page behind it interactive.
	 * Page scrolling isn't locked and outside clicks don't close the component in this case
	 */
	transparentOverlay?: boolean;
	/** Make the overlay blurred */
	blurredOverlay?: boolean;
	/** Disable swipe gesture to close the component on touch devices, the gesture is not used for the "center" position */
	disableSwipeGesture?: boolean;
	/** Disable closing the component on outside click, it can still be closed with the Escape key */
	disableCloseOnOutsideClick?: boolean;
	/** Focus the first focusable element in the component when it is opened, when false, focus will be set on the component content container
	 * @default true
	 */
	autoFocus?: boolean;
	/** aria-label attribute for the root element, use it when the component is rendered without Modal.Title */
	ariaLabel?: string;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional classname for the overlay element */
	overlayClassName?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div"> & { ref?: React.RefObject<HTMLDivElement | null> };
} & Pick<OverlayProps, "onAfterOpen" | "onAfterClose" | "active" | "containerRef" | "contained">;
