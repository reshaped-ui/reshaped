import type React from "react";
import type { IconProps } from "components/Icon";
import type * as G from "types/global";

export type Status = "entering" | "entered" | "exited";
export type TimeoutAlias = "short" | "long";
export type Timeout = TimeoutAlias | number;
export type Position = "top" | "top-end" | "top-start" | "bottom" | "bottom-start" | "bottom-end";

export type Props = {
	size?: "small" | "medium" | "large";
	icon?: IconProps["svg"];
	startSlot?: React.ReactNode;
	title?: React.ReactNode;
	text?: React.ReactNode;
	children?: React.ReactNode;
	actionsSlot?: React.ReactNode;
	color?: "neutral" | "primary" | "critical" | "positive" | "inverted";
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};

export type ProviderProps = {
	children?: React.ReactNode;
	options?: Partial<
		Record<
			RegionProps["position"],
			{
				width?: string;
				expanded?: boolean;
			}
		>
	>;
};

export type RegionProps = {
	position: Position;
	nested?: boolean;
};

export type ContainerProps = {
	id: string;
	toastProps: Props & { timeout?: Timeout };
	index: number;
	status?: "entering" | "entered" | "exiting";
	inspected: boolean;
};

export type Context = {
	options?: ProviderProps["options"];
	queues: Record<RegionProps["position"], Array<ContainerProps>>;
	add: (toast: Props & ShowOptions) => string;
	show: (id: string) => void;
	hide: (id: string) => void;
	remove: (id: string) => void;
	id: string;
};

export type ShowOptions = { timeout?: Timeout; position?: Position };

type AddAction = {
	type: "add";
	payload: { toastProps: Props & ShowOptions; id: string };
};
type ShowAction = { type: "show"; payload: { id: string } };
type HideAction = { type: "hide"; payload: { id: string } };
type RemoveAction = { type: "remove"; payload: { id: string } };
type Action = AddAction | ShowAction | HideAction | RemoveAction;
export type Reducer = (state: Context["queues"], action: Action) => Context["queues"];
