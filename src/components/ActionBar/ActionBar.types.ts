import type React from "react";
import type { ViewProps } from "components/View";
import type * as G from "types/global";

export type Props = Pick<ViewProps, "paddingBlock" | "paddingInline" | "padding"> & {
	active?: boolean;
	offset?: G.Responsive<number>;
	position?: "top" | "top-end" | "top-start" | "bottom" | "bottom-start" | "bottom-end";
	positionType?: G.Responsive<"relative" | "absolute" | "fixed">;
	blurred?: boolean;
	elevated?: boolean;
	children?: React.ReactNode;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};
