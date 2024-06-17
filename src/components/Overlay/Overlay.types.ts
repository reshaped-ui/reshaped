import type React from "react";
import type * as G from "types/global";

export type Props = {
	transparent?: boolean | number;
	children?: React.ReactNode | ((props: { active: boolean }) => React.ReactNode);
	active?: boolean;
	onClose?: () => void;
	onOpen?: () => void;
	className?: G.ClassName;
	attributes?: G.Attributes<"div", Props>;
};
