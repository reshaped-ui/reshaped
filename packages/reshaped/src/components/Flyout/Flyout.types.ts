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
export type Options = Pick<
	BaseProps,
	| "width"
	| "fallbackAdjustLayout"
	| "fallbackMinWidth"
	| "fallbackMinHeight"
	| "contentGap"
	| "contentShift"
> & {
	position: Position;
	fallbackPositions?: Position[];
	container?: HTMLElement | null;
	rtl: boolean;
	lastUsedPosition: Position;
	onPositionChoose: (position: Position) => void;
};

export type State = {
	position?: Position;
	status: "idle" | "rendered" | "positioned" | "visible" | "hidden";
};

export type FlyoutData = {
	position: Position;
};

export type UseFlyoutData = Pick<State, "position" | "status"> & {
	updatePosition: (args?: { sync?: boolean; fallback?: boolean }) => void;
	render: () => void;
	hide: () => void;
	remove: () => void;
	show: () => void;
};

/**
 * Component
 */
export type Instance = {
	/** Open the flyout content */
	open: () => void;
	/** Close the flyout content */
	close: () => void;
	/** Sync the flyout content position with the trigger element position */
	updatePosition: () => void;
} | null;

type WithUncontrolled = {
	/** Control the content visibility, enables controlled mode */
	active?: never;
	/** Control the content default visibility, enables uncontrolled mode */
	defaultActive?: boolean;
};
type WithControlled = {
	/** Control the content visibility, enables controlled mode */
	active: boolean;
	/** Control the content default visibility, enables uncontrolled mode */
	defaultActive?: never;
};

export type TriggerAttributes = {
	// FIXME: Once we only support React 19+, we can drop this any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ref: React.RefObject<HTMLButtonElement | null> | any;
	onBlur?: (e: React.FocusEvent) => void;
	onFocus?: () => void;
	onMouseDown?: () => void;
	onMouseEnter?: () => void;
	onMouseLeave?: (e: React.MouseEvent) => void;
	onTouchStart?: () => void;
	onClick?: () => void;
	"aria-describedby"?: string;
	"aria-haspopup"?: "dialog" | "menu" | "listbox";
	"aria-autocomplete"?: "list";
	"aria-expanded"?: boolean;
	"aria-controls"?: string;
};

type BaseProps = {
	/** Unique id for the flyout content and trigger */
	id?: string;
	/** Event used for displaying the content */
	triggerType?: "hover" | "click" | "focus";
	/** Removes the content display delay if another flyout is already active */
	groupTimeouts?: boolean;
	/** Content position relative to the trigger element */
	position?: Position;
	/**
	 * @deprecated Use fallbackPosition={false} instead, will be removed in v4
	 */
	forcePosition?: boolean;
	/** Fallback positions for the content when it doesn't fit into the viewport or container */
	fallbackPositions?: Position[] | false;
	/** Adjust the content size and shift its position to fit into the container when none of the fallback positions work */
	fallbackAdjustLayout?: boolean;
	/** Minimum width for the content when fallbackAdjustLayout is true */
	fallbackMinWidth?: string;
	/** Minimum height for the content when fallbackAdjustLayout is true */
	fallbackMinHeight?: string;
	/** Change component trap focus keyboard behavior and shortcuts */
	trapFocusMode?: TrapMode | false;
	/** Disable the flyout content interactivity */
	disabled?: boolean;
	/** Disable the flyout content hide animation */
	disableHideAnimation?: boolean;
	/** Ignore the content hover events and hide it if the triggerType is hover */
	disableContentHover?: boolean;
	/** Disable the flyout content close on outside click */
	disableCloseOnOutsideClick?: boolean;
	/** Automatically focus the first focusable element in the content, when false the content container will be focused instead
	 * @default true
	 */
	autoFocus?: boolean;
	/** Origin coordinates for the content when there is no trigger element */
	originCoordinates?: G.Coordinates;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Callback when the content is opened */
	onOpen?: () => void;
	/** Callback when the content is closed */
	onClose?: (args: { reason?: CloseReason }) => void;
	/** Content width, literal css value or unit token multiplier */
	width?: Width;
	/** Gap between the content and the trigger element */
	contentGap?: number;
	/** Shift the content on the secondary axis, relative to its original position */
	contentShift?: number;
	/** Maximum height for the content */
	contentMaxHeight?: string;
	/** Maximum width for the content */
	contentMaxWidth?: string;
	/** Additional classname for the content element */
	contentClassName?: string;
	/** Additional attributes for the content element */
	contentAttributes?: G.Attributes<"div">;
	/** Ref accessor for the flyout methods */
	instanceRef?: React.Ref<Instance>;
	/** Container to render the content in using a portal, position is calculated based on the container bounds
	 * @default document.body
	 */
	containerRef?: React.RefObject<HTMLElement | null>;
	/** Element used to calculate the position of the content against */
	positionRef?: React.RefObject<HTMLElement | null>;
	/** Element to focus when the content is opened */
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
	/** Node for inserting children, provides attributes for the trigger element */
	children: (attributes: TriggerAttributes) => React.ReactNode;
};

export type ContentProps = {
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Additional classname for the content element */
	className?: G.ClassName;
	/** Additional attributes for the content element */
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
	handleMouseLeave: (e: React.MouseEvent) => void;
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
	| "contentGap"
	| "contentMaxHeight"
	| "contentMaxWidth"
	| "trapFocusMode"
	| "containerRef"
	| "disableContentHover"
	| "autoFocus"
>;

export type TriggerContextProps = { elRef?: ContextProps["triggerElRef"] };
export type ContentContextProps = { elRef?: ContextProps["flyoutElRef"] };
