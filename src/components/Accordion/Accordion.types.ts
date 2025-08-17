import type React from "react";
import type { IconProps } from "components/Icon";
import type * as G from "types/global";
import type * as S from "styles/types";

export type BaseProps = {
	iconSize?: IconProps["size"];
	iconPosition?: "start" | "end";
	gap?: G.Responsive<number>;
	children?: React.ReactNode;
	onToggle?: (active: boolean) => void;
	mixin?: Pick<S.Mixin, "margin">;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};

export type TriggerProps = {
	children?:
		| ((
				attributes: {
					"aria-expanded": boolean;
					"aria-controls": string;
					id: string;
					onClick: () => void;
				},
				props: { active: boolean }
		  ) => React.ReactNode)
		| React.ReactNode;
};

export type ContentProps = {
	children?: React.ReactNode;
};

export type ControlledProps = BaseProps & { active: boolean; defaultActive?: never };
export type UncontrolledProps = BaseProps & { active?: never; defaultActive?: boolean };
export type Props = ControlledProps | UncontrolledProps;

export type ContextProps = Pick<BaseProps, "iconSize" | "iconPosition" | "gap"> & {
	triggerId: string;
	contentId: string;
	active: boolean;
	onToggle?: (active: boolean) => void;
};
