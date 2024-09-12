"use client";

import React from "react";
import TrapFocus from "utilities/a11y/TrapFocus";
import useIsDismissible from "hooks/_private/useIsDismissible";
import useElementId from "hooks/useElementId";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import useHotkeys from "hooks/useHotkeys";
import useOnClickOutside from "hooks/_private/useOnClickOutside";
import useRTL from "hooks/useRTL";
import { checkTransitions, onNextFrame } from "utilities/animation";
import { checkKeyboardMode } from "utilities/a11y/keyboardMode";
import useFlyout from "./useFlyout";
import * as timeouts from "./Flyout.constants";
import cooldown from "./utilities/cooldown";
import {
	Provider,
	useFlyoutTriggerContext,
	useFlyoutContext,
	useFlyoutContentContext,
} from "./Flyout.context";
import type * as T from "./Flyout.types";
import useHandlerRef from "hooks/useHandlerRef";

const FlyoutRoot = (props: T.ControlledProps & T.DefaultProps) => {
	const {
		triggerType = "click",
		onOpen,
		onClose,
		children,
		disabled,
		forcePosition,
		trapFocusMode,
		width,
		disableHideAnimation,
		disableContentHover,
		disableCloseOnOutsideClick,
		contentGap,
		contentClassName,
		contentAttributes,
		position: passedPosition,
		active: passedActive,
		id: passedId,
		instanceRef,
		containerRef,
	} = props;
	const onOpenRef = useHandlerRef(onOpen);
	const onCloseRef = useHandlerRef(onClose);
	const resolvedActive = disabled === true ? false : passedActive;
	const parentFlyoutContext = useFlyoutContext();
	const parentFlyoutTriggerContext = useFlyoutTriggerContext();
	const parentFlyoutContentContext = useFlyoutContentContext();

	const isSubmenu =
		parentFlyoutContext.trapFocusMode === "action-menu" ||
		parentFlyoutContext.trapFocusMode === "content-menu";

	const [isRTL] = useRTL();
	const internalTriggerElRef = React.useRef<HTMLButtonElement>(null);

	/**
	 * Reuse the parent trigger ref in case we render nested triggers
	 * For example, when we apply tooltip and popover to the same button
	 */
	const triggerElRef =
		(!parentFlyoutContentContext && parentFlyoutTriggerContext?.triggerElRef) ||
		internalTriggerElRef;
	const triggerBoundsRef = React.useRef<DOMRect>();
	const flyoutElRef = React.useRef<HTMLDivElement>(null);
	const id = useElementId(passedId);
	const timerRef = React.useRef<ReturnType<typeof setTimeout>>();
	const trapFocusRef = React.useRef<TrapFocus | null>(null);
	const lockedRef = React.useRef(false);
	// Check if transition had enough time to start when opening a flyout
	// In some cases there is not enough time to start, like when you're holding tab key
	const transitionStartedRef = React.useRef(false);
	// Lock blur event while pressing anywhere inside the flyout content
	const lockedBlurEffects = React.useRef(false);
	// Focus shouldn't retrun back to the trigger when user intentionally clicks outside the flyout
	const shouldReturnFocusRef = React.useRef(true);
	// Touch devices trigger onMouseEnter but we don't need to apply regular hover timeouts
	// So we're saving a flag on touch start and then change the mouse enter behavior
	const hoverTriggeredWithTouchEventRef = React.useRef(false);
	const flyout = useFlyout({
		triggerElRef,
		flyoutElRef,
		triggerBoundsRef,
		width,
		position: passedPosition,
		defaultActive: resolvedActive,
		container: containerRef?.current,
		forcePosition,
	});
	const { status, updatePosition, render, hide, remove, show } = flyout;
	// Don't create dismissible queue for hover flyout because they close all together on mouseout
	const isDismissible = useIsDismissible(
		triggerType !== "hover" && status !== "idle",
		flyoutElRef,
		triggerElRef
	);

	const clearTimer = React.useCallback(() => {
		if (timerRef.current) clearTimeout(timerRef.current);
	}, [timerRef]);

	/**
	 * Component open/close handlers
	 * Called from the internal actions
	 */
	const handleOpen = React.useCallback(() => {
		const canOpen = !lockedRef.current && status === "idle";

		if (!canOpen) return;
		onOpenRef.current?.();
	}, [status, onOpenRef]);

	const handleClose = React.useCallback<T.ContextProps["handleClose"]>(
		(options) => {
			const isLocked = triggerType === "click" && !isDismissible();
			const canClose = !isLocked && (status !== "idle" || disabled);

			if (!canClose) return;

			onCloseRef.current?.();
			if (options?.closeParents) parentFlyoutContext?.handleClose?.();
		},
		[status, isDismissible, triggerType, onCloseRef, disabled, parentFlyoutContext]
	);

	/**
	 * Trigger event handlers
	 */
	const handleBlur = React.useCallback(
		(e: React.FocusEvent) => {
			if (!checkKeyboardMode()) return;
			const focusedContent = flyoutElRef.current?.contains(e.relatedTarget as Node);

			if (
				// Empty flyouts don't move the focus so they have to be closed on blur
				focusedContent ||
				// Prevent from closing in case user interacts with items inside content
				lockedBlurEffects.current
			) {
				return;
			}

			handleClose();
		},
		[handleClose]
	);

	const handleFocus = React.useCallback(() => {
		if (triggerType === "hover" && !checkKeyboardMode()) return;
		handleOpen();
	}, [handleOpen, triggerType]);

	const handleTouchStart = React.useCallback(() => {
		if (triggerType !== "hover") return;
		hoverTriggeredWithTouchEventRef.current = true;
	}, [triggerType]);

	const handleMouseEnter = React.useCallback(() => {
		clearTimer();

		if (hoverTriggeredWithTouchEventRef.current) {
			handleOpen();
			hoverTriggeredWithTouchEventRef.current = false;
		} else {
			timerRef.current = setTimeout(
				handleOpen,
				cooldown.timer || isSubmenu ? timeouts.mouseEnterShort : timeouts.mouseEnter
			);

			if (!isSubmenu && triggerType === "hover") cooldown.warm();
		}
	}, [clearTimer, timerRef, handleOpen, isSubmenu, triggerType]);

	const handleMouseLeave = React.useCallback(() => {
		cooldown.cool();

		clearTimer();
		timerRef.current = setTimeout(() => handleClose(), timeouts.mouseLeave);
	}, [clearTimer, timerRef, handleClose]);

	const handleTriggerClick = React.useCallback(() => {
		if (status === "idle") {
			handleOpen();
		} else {
			handleClose();
		}
	}, [status, handleOpen, handleClose]);

	const handleTriggerMouseDown = React.useCallback(() => {
		const rect = triggerElRef.current?.getBoundingClientRect();
		triggerBoundsRef.current = rect;
	}, [triggerElRef]);

	const handleContentMouseDown = () => {
		lockedBlurEffects.current = true;
		hoverTriggeredWithTouchEventRef.current = true;
	};
	const handleContentMouseUp = () => {
		lockedBlurEffects.current = false;
	};

	const handleTransitionStart = React.useCallback(
		(e: TransitionEvent) => {
			if (!resolvedActive) return;
			if (flyoutElRef.current !== e.currentTarget || e.propertyName !== "transform") return;
			transitionStartedRef.current = true;
		},
		[resolvedActive]
	);

	const handleTransitionEnd = React.useCallback(
		(e: React.TransitionEvent) => {
			if (flyoutElRef.current !== e.currentTarget || e.propertyName !== "transform") return;
			if (status === "hidden") {
				transitionStartedRef.current = false;
				remove();
			}
		},
		[remove, status]
	);

	/**
	 * Control the display based on the props
	 */
	useIsomorphicLayoutEffect(() => {
		if (resolvedActive) {
			render();
			return;
		}

		if (disabled) cooldown.cool();

		/**
		 * Check that transitions are enabled and it has been triggered on tooltip open
		 * - keyboard focus navigation could move too fast and ignore the transitions completely
		 * - warmed up tooltips get removed instantly
		 */

		if (
			checkTransitions() &&
			!disableHideAnimation &&
			transitionStartedRef.current &&
			(cooldown.status !== "warm" || triggerType !== "hover")
		) {
			hide();
		} else {
			// In case transitions are disabled globally - remove from the DOM immediately
			remove();
		}
	}, [resolvedActive, render, hide, remove, disableHideAnimation, disabled]);

	React.useEffect(() => {
		// Wait after positioning before show is triggered to animate flyout from the right side
		if (status === "positioned") onNextFrame(() => show());
	}, [status, show]);

	/**
	 * Handle focus trap
	 *
	 * We release focus on visible change to not wait till animation ends
	 * so if we click outside the flyout, it won't focus the trigger
	 * after the animation and open it again
	 *
	 * Trap focus on visible to avoid scroll jumping, position is defined only when flyout is visible
	 */
	useIsomorphicLayoutEffect(() => {
		if (status !== "visible" || !flyoutElRef.current) return;
		if (trapFocusRef.current?.trapped) return;

		trapFocusRef.current = new TrapFocus(flyoutElRef.current);
		trapFocusRef.current.trap({
			mode: trapFocusMode,
			includeTrigger: triggerType === "hover" && trapFocusMode !== "dialog" && !isSubmenu,
			onNavigateOutside: () => {
				handleClose();
			},
		});
	}, [status, triggerType, trapFocusMode]);

	React.useEffect(() => {
		if (!disableHideAnimation && status !== "hidden") return;
		if (disableHideAnimation && status !== "idle") return;

		if (trapFocusRef.current?.trapped) {
			/* Locking the popover to not open it again on trigger focus */
			if (triggerType === "hover") {
				lockedRef.current = true;
				setTimeout(() => {
					lockedRef.current = false;
				}, 100);
			}

			trapFocusRef.current.release({ withoutFocusReturn: !shouldReturnFocusRef.current });
			shouldReturnFocusRef.current = true;
		}
	}, [status, triggerType, disableHideAnimation]);

	/**
	 * Release focus trapping on unmount
	 */
	React.useEffect(() => {
		return () => trapFocusRef.current?.release();
	}, []);

	/**
	 * Update position on resize or RTL
	 */
	React.useEffect(() => {
		const resizeObserver = new ResizeObserver(() => updatePosition({ sync: true }));

		resizeObserver.observe(document.body);
		if (triggerElRef.current) resizeObserver.observe(triggerElRef.current);

		return () => resizeObserver.disconnect();
	}, [updatePosition, triggerElRef]);

	React.useEffect(() => {
		updatePosition();
	}, [isRTL, updatePosition]);

	/**
	 * Imperative methods for controlling Flyout
	 */
	React.useImperativeHandle(
		instanceRef,
		() => ({
			open: handleOpen,
			close: handleClose,
			updatePosition: () => updatePosition({ sync: true }),
		}),
		[handleOpen, handleClose, updatePosition]
	);

	useHotkeys({ Escape: () => handleClose() }, [handleClose]);

	useOnClickOutside([flyoutElRef, triggerElRef], () => {
		if (disableCloseOnOutsideClick) return;
		// Clicking outside changes focused element so we don't need to set it back ourselves
		shouldReturnFocusRef.current = false;
		handleClose();
	});

	return (
		<Provider
			value={{
				id,
				flyout,
				width,
				triggerElRef,
				flyoutElRef,
				handleClose,
				handleOpen,
				handleFocus,
				handleBlur,
				handleMouseEnter,
				handleMouseLeave,
				handleTouchStart,
				handleTransitionStart,
				handleTransitionEnd,
				handleMouseDown: handleTriggerMouseDown,
				handleClick: handleTriggerClick,
				handleContentMouseDown,
				handleContentMouseUp,
				triggerType,
				trapFocusMode,
				contentGap,
				contentClassName,
				contentAttributes,
				containerRef,
				disableContentHover,
				isSubmenu,
			}}
		>
			{children}
		</Provider>
	);
};

export default FlyoutRoot;
