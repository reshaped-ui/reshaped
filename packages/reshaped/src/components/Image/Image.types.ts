import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type * as TStyles from "@/styles/types";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

export type Props = {
	/** Image URL */
	src?: string;
	/** Image alt text. When not passed, image is treated as decorative and rendered with the presentation role */
	alt?: string;
	/** Image width, literal css value or unit token multiplier */
	width?: G.Responsive<string | number>;
	/** Image height, literal css value or unit token multiplier */
	height?: G.Responsive<string | number>;
	/** Image max width, literal css value or unit token multiplier */
	maxWidth?: G.Responsive<string | number>;
	/** Image aspect ratio, width / height */
	aspectRatio?: G.Responsive<number>;
	/** Image border radius, based on the radius tokens */
	borderRadius?: Extract<TStyles.Radius, "small" | "medium" | "large" | "circular">;
	/** Image display mode for controlling how it fits into the provided boundaries.
	 * "contain" scales the image down to fit but doesn't scale it up above its original size
	 * @default "cover"
	 */
	displayMode?: "cover" | "contain";
	/** Add a semi-transparent border on top of the image for better background contrast.
	 * Wraps the image with an additional root element
	 */
	outline?: boolean;
	/** Image on load event */
	onLoad?: (e: React.SyntheticEvent) => void;
	/** Image on error event */
	onError?: (e: React.SyntheticEvent) => void;
	/** Image fallback content if the image fails to load or was not provided. String is used as a URL of the fallback image,
	 * node is rendered inside a placeholder and `true` renders an empty placeholder.
	 * Placeholder has no size of its own, define it with `width`, `height` or `aspectRatio`
	 */
	fallback?: string | React.ReactNode | boolean;
	/** Image render function, can be used for integrating with Image component in 3rd party frameworks */
	renderImage?: (
		// Next.js requires you to pass src and alt
		attributes: Omit<Attributes<"img">, "src" | "alt"> & { src: string; alt: string }
	) => React.ReactNode;
	/** Additional attributes for the image element */
	imageAttributes?: Attributes<"img">;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element. That's the image element,
	 * unless `outline` is used or a non-image `fallback` is rendered
	 */
	attributes?: Attributes<"div"> & Attributes<"img">;
};
