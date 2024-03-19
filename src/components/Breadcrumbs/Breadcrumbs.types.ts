import type React from "react";
import type { LinkProps } from "components/Link";
import type * as G from "types/global";

export type Props = {
	children: React.ReactElement | React.ReactElement[];
	separator?: React.ReactNode;
	color?: "neutral" | "primary";
	defaultVisibleItems?: number;
	disableExpand?: boolean;
	ariaLabel?: string;
	className?: G.ClassName;
	attributes?: G.Attributes<"nav", Props>;
};

export type ItemProps = Pick<LinkProps, "icon" | "href" | "onClick" | "disabled" | "children">;
