import type { ViewProps } from "components/View";
import * as G from "types/global";

export type Props = Pick<ViewProps, "width" | "height" | "borderRadius"> & {
	className?: G.ClassName;
	attributes?: G.Attributes<"div", Props>;
};
