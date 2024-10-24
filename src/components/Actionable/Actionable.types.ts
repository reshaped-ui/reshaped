import type React from "react";
import type * as G from "types/global";

export type Props = {
	children?: React.ReactNode;
	onClick?: (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
	href?: string;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
	disabled?: boolean;
	fullWidth?: boolean;
	insetFocus?: boolean;
	disableFocusRing?: boolean;
	borderRadius?: "inherit";
	stopPropagation?: boolean;
	as?: keyof JSX.IntrinsicElements;
	className?: G.ClassName;
	// Props are not ommited from attributes since we support all of them
	attributes?: G.Attributes<"button"> &
		Omit<JSX.IntrinsicElements["a"], keyof G.Attributes<"button">> & {
			ref?: React.RefObject<HTMLButtonElement | HTMLAnchorElement>;
		};
};

export type Ref = React.Ref<HTMLButtonElement | HTMLAnchorElement>;
