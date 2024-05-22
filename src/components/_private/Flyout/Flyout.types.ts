import React from "react";
import type * as G from "types/global";
import type { TrapMode } from "utilities/a11y/types";
import useFlyout, { FlyoutPosition, FlyoutWidth } from "hooks/_private/useFlyout";

export type InstanceRef =
	| {
			open: () => void;
			close: () => void;
	  }
	| undefined;

type WithUncontrolled = { active?: never; defaultActive?: boolean };
type WithControlled = { active: boolean; defaultActive?: never };

export type TriggerAttributes = {
	ref: React.RefObject<HTMLButtonElement>;
	onBlur?: (e: React.FocusEvent) => void;
	onFocus?: () => void;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
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
	position?: FlyoutPosition;
	forcePosition?: boolean;
	trapFocusMode?: TrapMode;
	disableHideAnimation?: boolean;
	children?: React.ReactNode;
	onOpen?: () => void;
	onClose?: () => void;
	width?: FlyoutWidth;
	contentGap?: number;
	contentClassName?: string;
	contentAttributes?: G.Attributes<"div">;
	instanceRef?: React.Ref<InstanceRef>;
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
	className?: G.ClassName;
	attributes?: G.Attributes<"div", Props>;
};

export type ContextProps = {
	id: string;
	flyout: ReturnType<typeof useFlyout>;
	width?: FlyoutWidth;
	triggerElRef: React.RefObject<HTMLButtonElement>;
	flyoutElRef: React.RefObject<HTMLDivElement>;
	handleClose: (options?: { closeParents?: boolean }) => void;
	handleOpen: () => void;
	handleMouseEnter: () => void;
	handleMouseLeave: () => void;
	handleTransitionEnd: (e: React.TransitionEvent) => void;
	handleTransitionStart: (e: TransitionEvent) => void;
	handleClick: () => void;
	handleBlur: (e: React.FocusEvent) => void;
	handleFocus: () => void;
	handleContentMouseDown: () => void;
	handleContentMouseUp: () => void;
} & Pick<
	Props,
	"triggerType" | "contentClassName" | "contentAttributes" | "trapFocusMode" | "contentGap"
>;
