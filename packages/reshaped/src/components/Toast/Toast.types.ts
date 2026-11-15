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
	/** Orientation of the toast layout, "vertical" renders the actions below the content instead of next to it
	 * @default "horizontal"
	 */
	orientation?: "horizontal" | "vertical";
	/** Icon at the inline start position of the toast */
	icon?: IconProps["svg"];
	/** Node for inserting content at the inline start position of the toast, ignored when icon is passed */
	startSlot?: React.ReactNode;
	/** Title value for the toast */
	title?: React.ReactNode;
	/** Text content for the toast */
	text?: React.ReactNode;
	/** Node for inserting custom content, rendered below the title and text when they are passed */
	children?: React.ReactNode;
	/** Node for inserting the toast actions, a single element or an array of them.
	 * Button components get the ghost variant, small size and inherit color by default
	 */
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
	/** Container to render the toast regions in using a portal, must be CSS-positioned.
	 * The ref is read when the provider renders, so the element should be mounted before toasts are shown
	 */
	containerRef?: React.RefObject<HTMLElement | null>;
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
	/** Time before the toast is hidden automatically: "short" is 4 seconds, "long" is 8 seconds, number is a custom value in ms.
	 * Pass 0 to keep the toast until hide() is called. The timer is stopped while the toasts are hovered or focused and restarts afterwards
	 * @default "short"
	 */
	timeout?: Timeout;
	/** Position of the region the toast is shown in
	 * @default "bottom-end"
	 */
	position?: Position;
	/** Width of the toast rendered inside the region, "short", "long" or a literal css value
	 * @default "short"
	 */
	width?: Width;
	/** Render the toast in the root provider, ignoring any nested providers and their containerRef.
	 * Pass the same flag to hide() to hide it manually
	 */
	global?: boolean;
};
export type ShowProps = Props & ShowOptions;
export type HideOptions = {
	/** Hide a toast that was shown with the global option */
	global?: boolean;
};

export type Context = {
	queues: Record<RegionProps["position"], Array<ContainerProps>>;
	add: (toast: ShowProps) => string;
	show: (id: string) => void;
	hide: (id: string, options?: HideOptions) => void;
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
