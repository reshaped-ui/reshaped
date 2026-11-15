import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { Attributes } from "@/types/global";

type WithClose = {
	/** Hide the close button and remove the space reserved for it */
	hideCloseButton: true;
	/** aria-label attribute for the close button, required unless the close button is hidden */
	closeAriaLabel?: string;
};
type WithoutClose = {
	/** Hide the close button and remove the space reserved for it */
	hideCloseButton?: false;
	/** aria-label attribute for the close button, required unless the close button is hidden */
	closeAriaLabel: string;
};
export type CloseProps = WithClose | WithoutClose;

export type Props = CloseProps & {
	/** Component render variant, "media" is used for images and videos.
	 * It renders the close button on top of the content with an offset from its corner, without reserving space for it
	 */
	variant?: "media";
	/** Close button vertical alignment
	 * @default "top"
	 */
	align?: "top" | "center";
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Callback when the close button is clicked, the component doesn't hide itself */
	onClose?: () => void;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};
