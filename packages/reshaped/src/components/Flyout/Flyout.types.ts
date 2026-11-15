import React from "react";
import type { ClassName } from "@reshaped/utilities";
import type { Coordinates, TrapMode } from "@reshaped/utilities/internal";

import type * as G from "@/types/global";
import { ThemeProps } from "../Theme";

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
	"width" | "fallbackAdjustLayout" | "fallbackMinHeight" | "contentGap" | "contentShift"
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
	status: "idle" | "rendered" | "visible" | "hidden";
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
	/** Open the flyout content, in controlled mode it only calls onOpen */
	open: () => void;
	/** Close the flyout content, in controlled mode it only calls onClose */
	close: () => void;
	/** Sync the flyout content position with the trigger element position.
	 * It's already updated on scroll and on window, trigger and content resize, call it when the trigger moves for other reasons
	 */
	updatePosition: () => void;
} | null;

type WithUncontrolled = {
	/** Control the content visibility, enables controlled mode.
	 * The component doesn't change it itself, update the value in the onOpen and onClose handlers
	 */
	active?: never;
	/** Content visibility on mount, enables uncontrolled mode where the component handles its state itself */
	defaultActive?: boolean;
};
type WithControlled = {
	/** Control the content visibility, enables controlled mode.
	 * The component doesn't change it itself, update the value in the onOpen and onClose handlers
	 */
	active: boolean;
	/** Content visibility on mount, enables uncontrolled mode where the component handles its state itself */
	defaultActive?: never;
};

export type TriggerAttributes = {
	// FIXME: Once we only support React 19+, we can drop this any
	ref: React.RefObject<HTMLButtonElement | null> | any;
	onBlur?: (e: React.FocusEvent) => void;
	onFocus?: () => void;
	onMouseDown?: () => void;
	onMouseEnter?: (e: React.MouseEvent) => void;
	onMouseLeave?: (e: React.MouseEvent) => void;
	onTouchStart?: () => void;
	onClick?: () => void;
	"aria-describedby"?: string;
	"aria-haspopup"?: "dialog" | "menu" | "listbox";
	"aria-autocomplete"?: "list";
	"aria-expanded"?: boolean;
	"aria-controls"?: string;

	// Data attributes
	"data-rs-flyout-active"?: boolean;
};

type BaseProps = {
	/** Id of the content element, referenced by the aria attributes of the trigger. Generated automatically when not passed */
	id?: string;
	/** Event used for displaying the content.
	 * "hover" also opens it when the trigger is focused with the keyboard, "focus" opens it when the trigger receives focus
	 * @default "click"
	 */
	triggerType?: "hover" | "click" | "focus";
	/** Delay opening the content on hover, used for groups of hover triggers like tooltips.
	 * The delay and the animations are skipped when the pointer moves over from another flyout using this flag
	 */
	groupTimeouts?: boolean;
	/** Preferred content position relative to the trigger element: the side to render it on, optionally followed by its alignment.
	 * Start and end are flipped in RTL, another position is used when the content doesn't fit, see fallbackPositions.
	 * Defaults to "bottom", DropdownMenu uses "bottom-start", its submenus and ContextMenu use "end-top"
	 */
	position?: Position;
	/** Limit the positions the content can switch to when it doesn't fit into the viewport or container.
	 * Positions are tried in a predefined order starting with the side of the passed position, not in the order of the array.
	 * Pass false or an empty array to always keep the passed position
	 */
	fallbackPositions?: Position[] | false;
	/** Shift the content along the trigger and reduce its height to fit it into the viewport or container.
	 * It's applied to every position before checking if it fits, so the content can shrink in place instead of switching positions.
	 * Use fallbackMinHeight to limit how much it can shrink
	 */
	fallbackAdjustLayout?: boolean;
	/** Minimum height the content can be reduced to when fallbackAdjustLayout is true, other positions are tried when it can't be kept.
	 * Only pixel values are supported, for example "200px"
	 */
	fallbackMinHeight?: string;
	/** Keyboard navigation mode of the content, also defines its role. "dialog" traps the Tab navigation inside the content,
	 * "action-menu" and "action-bar" navigate with the arrow keys and close on Tab, "content-menu" lets Tab pass through the content
	 * and continue on the page, "selection-menu" keeps the focus on the trigger while the arrow keys highlight the options.
	 * Pass false to disable the focus trapping. Defaults to "dialog", Popover with the hover triggerType defaults to "content-menu"
	 */
	trapFocusMode?: TrapMode | false;
	/** Prevent the content from opening and hide it if it's already open, the trigger element itself is not disabled */
	disabled?: boolean;
	/** Disable the flyout content hide animation */
	disableHideAnimation?: boolean;
	/** Ignore the content hover events and hide it as soon as the pointer leaves the trigger if the triggerType is hover */
	disableContentHover?: boolean;
	/** Disable the flyout content close on outside click */
	disableCloseOnOutsideClick?: boolean;
	/** Ignore touch interactions with the trigger when triggerType is hover, the content still opens with keyboard focus */
	disableTouchTrigger?: boolean;
	/** Automatically focus the first focusable element in the content, when false the content container will be focused instead.
	 * Label the content when it's false, for example with aria-label passed to the Content attributes
	 * @default true
	 */
	autoFocus?: boolean;
	/** Viewport coordinates to position the content against instead of the trigger element, like clientX and clientY of a mouse event */
	originCoordinates?: Coordinates;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Callback when the content is opened */
	onOpen?: () => void;
	/** Callback when the content is closed.
	 * Reason is only passed for the Escape key, outside clicks, menu item selection and the Dismissible close button
	 */
	onClose?: (args: { reason?: CloseReason }) => void;
	/** Callback after the content open transition is complete */
	onAfterOpen?: () => void;
	/** Callback after the content close transition is complete */
	onAfterClose?: () => void;
	/** Content width, literal css value.
	 * "trigger" matches the width of the trigger element and "100%" stretches the content to the viewport width
	 */
	width?: Width;
	/** Gap between the content and the trigger element, base unit token multiplier.
	 * Defaults to 2, Tooltip uses 1.5 and DropdownMenu submenus use 0.5
	 */
	contentGap?: number;
	/** Shift the content on the secondary axis, relative to its original position, base unit token multiplier.
	 * Positive values move it to the right for top and bottom positions and down for start and end positions
	 */
	contentShift?: number;
	/** Maximum height for the content, literal css value. Taller content is scrollable */
	contentMaxHeight?: string;
	/** Maximum width for the content, literal css value */
	contentMaxWidth?: string;
	/** Z-index for the content element */
	contentZIndex?: number;
	/** Additional classname for the content element */
	contentClassName?: string;
	/** Additional attributes for the content element */
	contentAttributes?: G.Attributes<"div">;
	/** Additional classname for the element wrapping the children inside the scrollable area, use it for the content padding */
	scrollableClassName?: string;
	/** Additional attributes for the element wrapping the children inside the scrollable area */
	scrollableAttributes?: G.Attributes<"div">;
	/** Ref accessor for the flyout methods */
	instanceRef?: React.Ref<Instance>;
	/** Element the content has to fit into, its bounds are used instead of the viewport when picking the position.
	 * It doesn't change where the content is rendered, the content is still rendered with a portal
	 */
	containerRef?: React.RefObject<HTMLElement | null>;
	/** Element used to calculate the position of the content against instead of the trigger element, which still handles the events */
	positionRef?: React.RefObject<HTMLElement | null>;
	/** Element to focus when the content is opened instead of its first focusable element, ignored when autoFocus is false */
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
	/** Render function for the trigger element.
	 * Pass the provided attributes to an interactive element, for example with the attributes property of Button,
	 * to apply the ref, event handlers and aria attributes. Second argument provides the active state of the content
	 */
	children: (attributes: TriggerAttributes, props: { active: boolean }) => React.ReactNode;
};

export type ContentProps = {
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Additional classname for the content element */
	className?: ClassName;
	/** Additional attributes for the content element */
	attributes?: G.Attributes<"div">;
	/** Color mode for the content element */
	colorMode?: ThemeProps["colorMode"];
};

export type ContextProps = {
	id: string;
	active: boolean;
	flyout: UseFlyoutData;
	width?: Width;
	triggerElRef?: React.RefObject<HTMLButtonElement | null>;
	flyoutElRef: React.RefObject<HTMLDivElement | null>;
	handleClose: (options: { closeParents?: boolean; reason?: CloseReason }) => void;
	handleOpen: () => void;
	handleTriggerMouseEnter: (e: React.MouseEvent) => void;
	handleContentMouseEnter: (e: React.MouseEvent) => void;
	handleMouseLeave: (e: React.MouseEvent) => void;
	handleTransitionEnd: (e: React.TransitionEvent) => void;
	handleClick: () => void;
	handleBlur: (e: React.FocusEvent) => void;
	handleFocus: () => void;
	handleTouchStart: () => void;
	handleContentMouseDown: () => void;
	handleContentMouseUp: () => void;
	handleContentKeyDown: () => void;
	isSubmenu: boolean;
} & Pick<
	Props,
	| "triggerType"
	| "contentClassName"
	| "contentAttributes"
	| "scrollableClassName"
	| "scrollableAttributes"
	| "contentGap"
	| "contentMaxHeight"
	| "contentMaxWidth"
	| "contentZIndex"
	| "trapFocusMode"
	| "containerRef"
	| "disableContentHover"
	| "autoFocus"
>;

export type TriggerContextProps = { elRef?: ContextProps["triggerElRef"] };
export type ContentContextProps = { elRef?: ContextProps["flyoutElRef"] };
