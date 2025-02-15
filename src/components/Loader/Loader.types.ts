import type * as G from "types/global";

export type Props = {
	size?: G.Responsive<"small" | "medium" | "large">;
	color?: "primary" | "critical" | "positive" | "inherit";
	ariaLabel?: string;
	className?: G.ClassName;
	attributes?: G.Attributes<"span">;
};
