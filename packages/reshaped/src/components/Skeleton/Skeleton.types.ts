import type { ClassName } from "@reshaped/utilities";

import type { ViewProps } from "@/components/View/index.js";
import type { Attributes } from "@/types/global.js";

export type Props = Pick<ViewProps, "width" | "height" | "borderRadius"> & {
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};
