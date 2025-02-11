import type React from "react";
import type * as G from "types/global";

export type Props = {
	hide?: G.Responsive<boolean>;
	visibility?: boolean;
	as?: keyof React.JSX.IntrinsicElements;
	children: React.ReactNode;
};
