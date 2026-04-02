import type { IconProps } from "@/components/Icon";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";
import type { ClassName } from "@reshaped/utilities";

export type Props = {
	/** Image URL */
	src?: string;
	/** Image alt text */
	alt?: string;
	/** Additional attributes for the image element */
	imageAttributes?: Attributes<"img">;
	/** Render prop for the image element, useful for integrating with the Image component from third party frameworks */
	renderImage?: (
		attributes: Omit<Attributes<"img">, "src" | "alt"> & { src: string; alt: string }
	) => React.ReactNode;
	/** Initials to display if no image is provided */
	initials?: string;
	/** SVG component for the icon, used when no image is provided */
	icon?: IconProps["svg"];
	/** Change the shape to rounded square */
	squared?: boolean;
	/** Component render variant
	 * @default "solid"
	 */
	variant?: "solid" | "faded";
	/** Component color scheme
	 * @default "neutral"
	 */
	color?: "neutral" | "critical" | "warning" | "positive" | "primary";
	/** Size of the component, base unit token number multiplier
	 * @default 12
	 */
	size?: G.Responsive<number>;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};
