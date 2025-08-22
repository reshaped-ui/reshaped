import type * as G from "types/global";

type Side = "start" | "end" | "top" | "bottom" | "inline" | "block" | "all";

export type Props = {
	/** Node for inserting children components */
	children: React.ReactElement;
	/** Side of the parent element to align the component with, applies negative margin on the chosen sides
	 * @default "all"
	 */
	side?: Side | Side[];
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};
