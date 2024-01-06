import type React from "react";
import type { ViewProps } from "components/View";
import type * as G from "types/global";

export type Props = Pick<ViewProps, "paddingBlock" | "paddingInline" | "padding"> & {
	position?: "top" | "bottom";
	elevated?: boolean;
	children?: React.ReactNode;
	className?: G.ClassName;
	attributes?: G.Attributes<"div", Props>;
};
