import type { ClassName } from "@reshaped/utilities";

import type { IconProps } from "@/components/Icon";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

export type Props = {
	/** Image URL. When passed, the image is rendered and initials, icon, color and variant are ignored */
	src?: string;
	/** Image alt text, only used together with src.
	 * Without it the image is treated as decorative and hidden from screen readers
	 */
	alt?: string;
	/** Additional attributes for the image element */
	imageAttributes?: Attributes<"img">;
	/** Render prop for the image element, useful for integrating with the Image component from third party frameworks */
	renderImage?: (
		attributes: Omit<Attributes<"img">, "src" | "alt"> & { src: string; alt: string }
	) => React.ReactNode;
	/** Initials to display when src is not passed, rendered as is without truncating.
	 * Not displayed when icon is passed or as a fallback for an image that fails to load
	 */
	initials?: string;
	/** SVG component for the icon, displayed when src is not passed and takes priority over initials */
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
	/** Width and height of the component, base unit token number multiplier.
	 * Initials and icon scale together with it
	 * @default 12
	 */
	size?: G.Responsive<number>;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};
