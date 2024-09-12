import type React from "react";
import type * as G from "types/global";

export type CloseReason = "overlay-click" | "escape-key";

export type Props = {
	transparent?: boolean | number;
	blurred?: boolean;
	children?: React.ReactNode | ((props: { active: boolean }) => React.ReactNode);
	active?: boolean;
	onClose?: (args: { reason: CloseReason }) => void;
	onOpen?: () => void;
	disableCloseOnClick?: boolean;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};
