import type { IconProps } from "components/Icon";
import type * as G from "types/global";

// Icon or initials may serve as fallback
type WithImage = { src: string; initials?: string; icon?: IconProps["svg"]; alt?: string };
type WithInitials = { src?: never; initials: string; icon?: never; alt?: never };
type WithIcon = { src?: never; initials?: never; icon: IconProps["svg"]; alt?: never };
type WithContent = WithImage | WithInitials | WithIcon;

export type Props = WithContent & {
	squared?: boolean;
	variant?: "solid" | "faded";
	color?: "neutral" | "critical" | "positive" | "primary";
	size?: G.Responsive<number>;
	className?: G.ClassName;
	attributes?: G.Attributes<"div", Props>;
};
