import type { IconProps } from "components/Icon";
import type * as G from "types/global";

export type Props = {
	src?: string;
	alt?: string;
	imageAttributes?: G.Attributes<"img">;
	initials?: string;
	icon?: IconProps["svg"];
	squared?: boolean;
	variant?: "solid" | "faded";
	color?: "neutral" | "critical" | "warning" | "positive" | "primary";
	size?: G.Responsive<number>;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};
