import type React from "react";

import type * as G from "@/types/global";

export type Props = {
	/** Hide the children, pass a responsive value to pick at which viewport sizes to hide them: `{ s: true, l: false }` */
	hide?: G.Responsive<boolean>;
	/** Use visibility hidden instead of display none, keeps the space taken by the hidden children reserved */
	visibility?: boolean;
	/** Custom root element html tag. The root element uses display: contents,
	 * so the children are laid out as if they were rendered directly in the Hidden parent
	 * @default "div"
	 */
	as?: keyof React.JSX.IntrinsicElements;
	/** Node for inserting children */
	children: React.ReactNode;
};
