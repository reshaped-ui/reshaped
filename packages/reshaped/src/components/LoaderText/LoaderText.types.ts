import type { TextProps } from "@/components/Text";
import type { IconProps } from "../Icon";

export type Props = Pick<
	TextProps,
	"children" | "className" | "attributes" | "variant" | "weight"
> & {
	/** SVG component for the icon */
	icon?: IconProps["svg"];
	/** Text that cross-fades with the regular children once completed becomes true */
	completedText?: TextProps["children"];
	/** Mark the loader as completed, stopping the shimmer */
	completed?: boolean;
};
