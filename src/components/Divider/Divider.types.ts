import type React from "react";
import type * as G from "types/global";

export type Props = {
	blank?: boolean;
	vertical?: G.Responsive<boolean>;
	contentPosition?: "start" | "center" | "end";
	children?: React.ReactNode;
	className?: G.ClassName;
	attributes?: G.Attributes<"hr">;
};
