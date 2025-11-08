import type { OverlayProps, OverlayCloseReason } from "components/Overlay";
import type React from "react";
import type * as G from "types/global";

export type Context = {
	id: string;
	titleMounted: boolean;
	setTitleMounted: (b: boolean) => void;
	subtitleMounted: boolean;
	setSubtitleMounted: (b: boolean) => void;
};

export type TitleProps = {
	/** Node for inserting the title text */
	children: React.ReactNode;
};

export type SubtitleProps = {
	/** Node for inserting the subtitle text */
	children: React.ReactNode;
};

export type Props = {
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Component position on the screen */
	position?: G.Responsive<"center" | "end" | "bottom" | "start" | "full-screen">;
	/** Component size, literal css value */
	size?: G.Responsive<string>;
	/** Component padding, unit token multiplier */
	padding?: G.Responsive<number>;
	/** Remove overflow from the component content */
	overflow?: "visible";
	/** Callback when the component is closed */
	onClose?: (args: { reason: OverlayCloseReason | "drag" }) => void;
	/** Make the overlay transparent */
	transparentOverlay?: boolean;
	/** Make the overlay blurred */
	blurredOverlay?: boolean;
	/** Disable swipe gesture to close the component on touch devices */
	disableSwipeGesture?: boolean;
	/** Disable closing the component on outside click */
	disableCloseOnOutsideClick?: boolean;
	/** Focus the first focusable element in the component when it is opened, when false, focus will be set on the component content container
	 * @default true
	 */
	autoFocus?: boolean;
	/** aria-label attribute for the root element, useful when there is no visible title */
	ariaLabel?: string;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional classname for the overlay element */
	overlayClassName?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div"> & { ref?: React.RefObject<HTMLDivElement | null> };
} & Pick<OverlayProps, "onOpen" | "onAfterOpen" | "onAfterClose" | "active" | "containerRef">;
