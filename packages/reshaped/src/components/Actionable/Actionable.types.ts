import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { Attributes as AttributesType } from "@/types/global";

export type AttributesRef = React.RefObject<HTMLButtonElement | null>;
type Attributes = AttributesType<"button"> &
	Omit<React.JSX.IntrinsicElements["a"], keyof AttributesType<"button">> & {
		ref?: AttributesRef;
	};

export type RenderAttributes = Omit<Attributes, "ref"> & {
	ref: React.Ref<HTMLButtonElement> & React.Ref<HTMLAnchorElement>;
	children: React.ReactNode;
};

export type Props = {
	/** Node for inserting the content */
	children?: React.ReactNode;
	/** Render a custom root element, useful for integrating with routers */
	render?: (attributes: RenderAttributes) => React.ReactNode;
	/** Callback when clicked, renders it as a button tag if href is not provided */
	onClick?: (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
	/** URL, renders it as an anchor tag */
	href?: string;
	/** Type attribute, renders it as a button tag */
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
	/** Disable from user interaction */
	disabled?: boolean;
	/** Prevent the event from bubbling up to the parent */
	stopPropagation?: boolean;
	/** Render as a different element */
	as?: keyof React.JSX.IntrinsicElements;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes;
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
};

export type Ref = HTMLButtonElement | HTMLAnchorElement;
