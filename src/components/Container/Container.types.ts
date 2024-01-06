import type React from "react";
import type { ViewProps } from "components/View";
import type * as G from "types/global";

export type Props = Pick<ViewProps, "padding"> & {
	width?: G.Responsive<string | number>;
	children?: React.ReactNode;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};
