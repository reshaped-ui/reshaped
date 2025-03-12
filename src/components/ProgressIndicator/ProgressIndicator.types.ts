import type * as G from "types/global";

export type Props = {
	total: number;
	activeIndex?: number;
	color?: "primary" | "media";
	ariaLabel?: string;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};
