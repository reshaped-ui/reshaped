import type * as G from "types/global";

export type Props = {
	blank?: boolean;
	vertical?: G.Responsive<boolean>;
	className?: G.ClassName;
	attributes?: G.Attributes<"hr", Props>;
};
