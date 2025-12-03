import type React from "react";
import type * as TStyles from "styles/types";
import type * as G from "types/global";

export type Props = {
	/** Image URL */
	src?: string;
	/** Image alt text */
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
	/** Image display mode for controlling how it fits into the provided boundaries */
	displayMode?: "cover" | "contain";
	/** Add a semi-transparent border on top of the image for better background contrast */
	outline?: boolean;
	/** Image on load event */
	onLoad?: (e: React.SyntheticEvent) => void;
	/** Image on error event */
	onError?: (e: React.SyntheticEvent) => void;
	/** Image fallback content if the image fails to load or was not provided */
	fallback?: string | React.ReactNode | boolean;
	/** Image render function, can be used for integrating with Image component in 3rd party frameworks */
	renderImage?: (
		// Next.js requires you to pass src and alt
		attributes: Omit<G.Attributes<"img">, "src" | "alt"> & { src: string; alt: string }
	) => React.ReactNode;
	/** Additional attributes for the image element */
	imageAttributes?: G.Attributes<"img">;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div"> & G.Attributes<"img">;
};
