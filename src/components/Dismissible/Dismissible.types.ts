import type React from "react";
import type * as G from "types/global";

type WithClose = { hideCloseButton: true; closeAriaLabel?: string };
type WithoutClose = { hideCloseButton?: false; closeAriaLabel: string };
export type CloseProps = WithClose | WithoutClose;

export type Props = CloseProps & {
	variant?: "media";
	align?: "top" | "center";
	children?: React.ReactNode;
	onClose?: () => void;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};
