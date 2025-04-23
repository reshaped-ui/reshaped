import React from "react";
import type * as G from "types/global";
import type { TrapMode } from "utilities/a11y";

/**
 * Utility
 */

type XSide = "start" | "end";
type YSide = "top" | "bottom";
export type Side = XSide | YSide;

export type CloseReason =
	| "escape-key"
	| "outside-click"

	/**
	 * Keeping the item selection type here since DropdownMenu items use Flyout context
	 * and not a separate DropdownMenu context
	 */
	| "item-selection"
	| "close-button";

export type Position = `${YSide}` | `${YSide}-${XSide}` | `${XSide}` | `${XSide}-${YSide}`;
export type Width = "trigger" | string;
export type Options = {
	width?: Width;
	position: Position;
	container?: HTMLElement | null;
	rtl: boolean;
	fallbackPositions?: Position[];
	lastUsedFallback: Position;
	onFallback: (position: Position) => void;
	contentGap?: number;
	contentShift?: number;
};
export type Styles = React.CSSProperties;

export type State = {
	styles: Styles;
	position?: Position;
	status: "idle" | "rendered" | "positioned" | "visible" | "hidden";
};

export type FlyoutData = {
	styles: Styles;
	position: Position;
};

export type UseFlyoutData = Pick<State, "styles" | "position" | "status"> & {
	updatePosition: (args?: { sync?: boolean }) => void;
	render: () => void;
	hide: () => void;
	remove: () => void;
	show: () => void;
};

/**
 * Component
 */
export type Instance = {
	open: () => void;
	close: () => void;
	updatePosition: () => void;
} | null;

type WithUncontrolled = { active?: never; defaultActive?: boolean };
type WithControlled = { active: boolean; defaultActive?: never };

export type TriggerAttributes = {
	// FIXME: Once we only support React 19+, we can drop this any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ref: React.RefObject<HTMLButtonElement | null> | any;
	onBlur?: (e: React.FocusEvent) => void;
	onFocus?: () => void;
	onMouseDown?: () => void;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	onTouchStart?: () => void;
	onClick?: () => void;
	"aria-describedby"?: string;
	"aria-haspopup"?: "dialog" | "menu" | "listbox";
	"aria-autocomplete"?: "list";
	"aria-expanded"?: boolean;
	"aria-controls"?: string;
};

type BaseProps = {
	id?: string;
	triggerType?: "hover" | "click" | "focus";
	groupTimeouts?: boolean;
	position?: Position;
	/**
	 * @deprecated Use fallbackPosition={false} instead, will be removed in v4
	 */
	forcePosition?: boolean;
	fallbackPositions?: Position[] | false;
	trapFocusMode?: TrapMode;
	disabled?: boolean;
	disableHideAnimation?: boolean;
	disableContentHover?: boolean;
	disableCloseOnOutsideClick?: boolean;
	originCoordinates?: G.Coordinates;
	children?: React.ReactNode;
	onOpen?: () => void;
	onClose?: (args: { reason?: CloseReason }) => void;
	width?: Width;
	contentGap?: number;
	contentShift?: number;
	contentClassName?: string;
	contentAttributes?: G.Attributes<"div">;
	instanceRef?: React.Ref<Instance>;
	containerRef?: React.RefObject<HTMLElement | null>;
	initialFocusRef?: React.RefObject<HTMLElement | null>;
};

export type DefaultProps = Required<{
	position: BaseProps["position"];
	trigger: BaseProps["triggerType"];
}>;

export type UncontrolledProps = BaseProps & WithUncontrolled;
export type ControlledProps = BaseProps & WithControlled;
export type Props = ControlledProps | UncontrolledProps;

export type TriggerProps = {
	children: (attributes: TriggerAttributes) => React.ReactNode;
};

export type ContentProps = {
	children?: React.ReactNode;
	flyoutClassName?: G.ClassName;
	flyoutAttributes?: G.Attributes<"div">;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};

export type ContextProps = {
	id: string;
	flyout: UseFlyoutData;
	width?: Width;
	triggerElRef?: React.RefObject<HTMLButtonElement | null>;
	flyoutElRef: React.RefObject<HTMLDivElement | null>;
	handleClose: (options: { closeParents?: boolean; reason?: CloseReason }) => void;
	handleOpen: () => void;
	handleMouseEnter: () => void;
	handleMouseLeave: () => void;
	handleMouseDown: () => void;
	handleTransitionEnd: (e: React.TransitionEvent) => void;
	handleTransitionStart: (e: TransitionEvent) => void;
	handleClick: () => void;
	handleBlur: (e: React.FocusEvent) => void;
	handleFocus: () => void;
	handleTouchStart: () => void;
	handleContentMouseDown: () => void;
	handleContentMouseUp: () => void;
	isSubmenu: boolean;
} & Pick<
	Props,
	| "triggerType"
	| "contentClassName"
	| "contentAttributes"
	| "trapFocusMode"
	| "contentGap"
	| "contentShift"
	| "containerRef"
	| "disableContentHover"
>;

export type TriggerContextProps = { elRef?: ContextProps["triggerElRef"] };
export type ContentContextProps = { elRef?: ContextProps["flyoutElRef"] };
