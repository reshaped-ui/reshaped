import type React from "react";
import type * as G from "types/global";

export type Props = {
	/** Pick at which viewport sizes to hide the children*/
	hide?: G.Responsive<boolean>;
	/** Use visibility hidden instead of display none */
	visibility?: boolean;
	/** Custom root element html tag */
	as?: keyof React.JSX.IntrinsicElements;
	/** Node for inserting children */
	children: React.ReactNode;
};
