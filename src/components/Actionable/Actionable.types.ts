import type React from "react";
import type * as G from "types/global";

export type AttributesRef = React.RefObject<HTMLButtonElement | null>;
type Attributes = G.Attributes<"button"> &
	Omit<React.JSX.IntrinsicElements["a"], keyof G.Attributes<"button">> & {
		ref?: AttributesRef;
	};

export type Props = {
	/** Node for inserting the content */
	children?: React.ReactNode;
	/** Render a custom root element, useful for integrating with routers */
	render?: (
		attributes: Attributes & {
			ref: AttributesRef;
			className: string;
			onClick: (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
			onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
			"aria-disabled"?: boolean;
			children: React.ReactNode;
		}
	) => React.ReactNode;
	/** Callback when clicked, renders it as a button tag if href is not provided */
	onClick?: (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
	/** URL, renders it as an anchor tag */
	href?: string;
	/** Type attribute, renders it as a button tag */
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
	/** Disable from user interaction */
	disabled?: boolean;
	/** Enable a minimum required touch hitbox */
	touchHitbox?: boolean;
	/** Take up the full width of its parent */
	fullWidth?: boolean;
	/** Enable a focus ring inside the element bounds */
	insetFocus?: boolean;
	/** Don't show a focus ring on focus, can be used when it is within a container with a focus ring */
	disableFocusRing?: boolean;
	/** Apply the focus ring to the child and rely on its border radius */
	borderRadius?: "inherit";
	/** Prevent the event from bubbling up to the parent */
	stopPropagation?: boolean;
	/** Render as a different element */
	as?: keyof React.JSX.IntrinsicElements;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	// Props are not ommited from attributes since we support all of them
	attributes?: Attributes;
};

export type Ref = HTMLButtonElement | HTMLAnchorElement;
