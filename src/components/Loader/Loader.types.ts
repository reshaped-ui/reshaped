import type * as G from "types/global";

export type Props = {
	size?: G.Responsive<"small" | "medium">;
	color?: "primary" | "critical" | "positive" | "inherit";
	className?: G.ClassName;
	attributes?: G.Attributes<"span", Props>;
};
