import type { IconProps } from "components/Icon";
import type React from "react";
import type * as G from "types/global";

export type Status = "entering" | "entered" | "exited";
export type TimeoutAlias = "short" | "long";
export type Timeout = TimeoutAlias | number;
export type Position = "top" | "top-end" | "top-start" | "bottom" | "bottom-start" | "bottom-end";

export type Props = {
	/** Component size
	 * @default "small"
	 */
	size?: "small" | "medium" | "large";
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
	 * @default "inverted"
	 */
	color?: "neutral" | "primary" | "critical" | "positive" | "warning" | "inverted";
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};

export type ProviderProps = {
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Options for the toast */
	options?: Partial<
		Record<
			RegionProps["position"],
			{
				/** Width of the toasts rendered inside the region */
				width?: string;
				/** Always render the toast stack as expanded inside the region */
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

export type ShowOptions = { timeout?: Timeout; position?: Position };
export type ShowProps = Props & ShowOptions;

export type Context = {
	options?: ProviderProps["options"];
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
