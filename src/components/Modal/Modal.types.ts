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
	active?: boolean;
	transparentOverlay?: boolean;
	disableSwipeGesture?: boolean;
	autoFocus?: boolean;
	onClose?: () => void;
	onOpen?: () => void;
	ariaLabel?: string;
	className?: G.ClassName;
	overlayClassName?: G.ClassName;
	attributes?: G.Attributes<"div"> & { ref?: React.RefObject<HTMLDivElement | null> };
};
