import type React from "react";
import type * as G from "types/global";
import type * as TStyles from "styles/types";

export type Props = {
	src?: string;
	alt?: string;
	width?: G.Responsive<string | number>;
	height?: G.Responsive<string | number>;
	maxWidth?: G.Responsive<string | number>;
	aspectRatio?: G.Responsive<number>;
	borderRadius?: Extract<TStyles.Radius, "small" | "medium" | "large">;
	displayMode?: "cover" | "contain";
	onLoad?: (e: React.SyntheticEvent) => void;
	onError?: (e: React.SyntheticEvent) => void;
	fallback?: string | React.ReactNode | boolean;
	renderImage?: (
		// Next.js requires you to pass src and alt
		attributes: Omit<G.Attributes<"img">, "src" | "alt"> & { src: string; alt: string }
	) => React.ReactNode;
	imageAttributes?: G.Attributes<"img">;
	className?: G.ClassName;
	attributes?: G.Attributes<"div"> & G.Attributes<"img">;
};
