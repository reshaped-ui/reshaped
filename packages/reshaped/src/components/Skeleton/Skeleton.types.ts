import type { ViewProps } from "components/View";
import type * as G from "types/global";

export type Props = Pick<ViewProps, "width" | "height" | "borderRadius"> & {
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};
