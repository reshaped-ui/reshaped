import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { IconProps } from "@/components/Icon";
import type { Attributes } from "@/types/global";

export type Status = "entering" | "entered" | "exited";
export type TimeoutAlias = "short" | "long";
export type Timeout = TimeoutAlias | number;
export type Position = "top" | "top-end" | "top-start" | "bottom" | "bottom-start" | "bottom-end";
export type WidthPreset = "short" | "long";
export type Width = WidthPreset | (string & {});

export type Props = {
	/** Orientation of the toast layout */
	orientation?: "horizontal" | "vertical";
	/** Icon at the inline start position of the toast */
	icon?: IconProps["svg"];
	/** Node for inserting content at the inline start position of the toast */
	startSlot?: React.ReactNode;
	/** Title value for the toast */
	title?: React.ReactNode;
	/** Text content for the toast */
	text?: React.ReactNode;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Node for inserting content after the toast actions */
	actionsSlot?: React.ReactNode;
	/** Color of the toast
	 * @default "neutral"
	 */
	color?: "neutral" | "primary" | "critical" | "positive" | "warning";
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};

export type ProviderProps = {
	/** Node for inserting children */
	children?: React.ReactNode;
};

export type RegionProps = {
	position: Position;
	nested?: boolean;
};

export type ContainerProps = {
	id: string;
	toastProps: Props & Pick<ShowOptions, "timeout" | "width">;
	index: number;
	status?: "entering" | "entered" | "exiting";
	inspected: boolean;
	collapsedWidth?: ShowProps["width"];
};

export type ShowOptions = {
	timeout?: Timeout;
	position?: Position;
	/** Width of the toast rendered inside the region
	 * @default "short"
	 */
	width?: Width;
};
export type ShowProps = Props & ShowOptions;

export type Context = {
	queues: Record<RegionProps["position"], Array<ContainerProps>>;
	add: (toast: ShowProps) => string;
	show: (id: string) => void;
	hide: (id: string) => void;
	remove: (id: string) => void;
	id: string;
};

type AddAction = {
	type: "add";
	payload: { toastProps: ShowProps; id: string };
};
type ShowAction = { type: "show"; payload: { id: string } };
type HideAction = { type: "hide"; payload: { id: string } };
type RemoveAction = { type: "remove"; payload: { id: string } };
type Action = AddAction | ShowAction | HideAction | RemoveAction;
export type Reducer = (state: Context["queues"], action: Action) => Context["queues"];
