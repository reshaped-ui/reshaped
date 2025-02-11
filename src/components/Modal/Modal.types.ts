import type React from "react";
import type * as G from "types/global";
import type { OverlayProps, OverlayCloseReason } from "components/Overlay";

export type Context = {
	id: string;
	titleMounted: boolean;
	setTitleMounted: (b: boolean) => void;
	subtitleMounted: boolean;
	setSubtitleMounted: (b: boolean) => void;
};

export type TitleProps = {
	children: React.ReactNode;
};

export type SubtitleProps = {
	children: React.ReactNode;
};

export type Props = {
	children?: React.ReactNode;
	position?: G.Responsive<"center" | "end" | "bottom" | "start" | "full-screen">;
	size?: G.Responsive<string>;
	padding?: G.Responsive<number>;
	overflow?: "visible";
	onClose?: (args: { reason: OverlayCloseReason | "drag" }) => void;
	transparentOverlay?: boolean;
	blurredOverlay?: boolean;
	disableSwipeGesture?: boolean;
	disableCloseOnOutsideClick?: boolean;
	autoFocus?: boolean;
	ariaLabel?: string;
	className?: G.ClassName;
	overlayClassName?: G.ClassName;
	attributes?: G.Attributes<"div"> & { ref?: React.RefObject<HTMLDivElement | null> };
} & Pick<OverlayProps, "onOpen" | "onAfterOpen" | "onAfterClose" | "active" | "containerRef">;
