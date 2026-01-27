import type { Attributes, ClassName } from "@reshaped/headless";
import type { ViewProps } from "@/components/View";

export type Props = Pick<ViewProps, "width" | "height" | "borderRadius"> & {
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};
