import type * as G from "types/global";

type Side = "start" | "end" | "top" | "bottom" | "inline" | "block" | "all";

export type Props = {
	children: React.ReactElement;
	side?: Side | Side[];
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};
