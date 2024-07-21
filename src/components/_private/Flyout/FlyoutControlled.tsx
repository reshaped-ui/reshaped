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
import useFlyout from "./useFlyout";
import * as timeouts from "./Flyout.constants";
import cooldown from "./utilities/cooldown";
import { Provider, useFlyoutTriggerContext, useFlyoutContext } from "./Flyout.context";
import type * as T from "./Flyout.types";

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
		contentGap,
		contentClassName,
		contentAttributes,
		position: passedPosition,
		active: passedActive,
		id: passedId,
		instanceRef,
		containerRef,
	} = props;
	const parentFlyoutContext = useFlyoutContext();
	const parentFlyoutTriggerContext = useFlyoutTriggerContext();
	const isSubmenu =
		parentFlyoutContext.trapFocusMode === "action-menu" ||
		parentFlyoutContext.trapFocusMode === "content-menu";
	const [isRTL] = useRTL();
	const internalTriggerElRef = React.useRef<HTMLButtonElement | null>(null);

	/**
	 * Reuse the parent trigger ref in case we render nested triggers
	 * For example, when we apply tooltip and popover to the same button
	 */
	const triggerElRef = parentFlyoutTriggerContext?.triggerElRef || internalTriggerElRef;
	const flyoutElRef = React.useRef<HTMLDivElement | null>(null);
	const id = useElementId(passedId);
	const timerRef = React.useRef<ReturnType<typeof setTimeout>>();
	const trapFocusRef = React.useRef<TrapFocus | null>(null);
	const lockedRef = React.useRef(false);
	const transitionStartedRef = React.useRef(false);
	const lockedBlurEffects = React.useRef(false);
	const shouldReturnFocusRef = React.useRef(true);
	const flyout = useFlyout(triggerElRef, flyoutElRef, {
		width,
		position: passedPosition,
		defaultActive: passedActive,
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
		const canOpen = !lockedRef.current && status === "idle" && !disabled;

		if (!canOpen) return;
		onOpen?.();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status, disabled]);

	const handleClose = React.useCallback<T.ContextProps["handleClose"]>(
		(options) => {
			const isLocked = triggerType === "click" && !isDismissible();
			const canClose = !isLocked && status !== "idle" && !disabled;

			if (!canClose) return;

			onClose?.();
			if (options?.closeParents) parentFlyoutContext?.handleClose?.();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[status, isDismissible, triggerType, disabled]
	);

	/**
	 * Trigger event handlers
	 */
	const handleBlur = React.useCallback(
		(e: React.FocusEvent) => {
			const focusedContent = flyoutElRef.current?.contains(e.relatedTarget as Node);

			if (
				// Empty flyouts don't move the focus so they have to be closed on blur
				focusedContent ||
				// Content menu keeps the focus on the original trigger so moving the focus away from it shouldn't close it
				(triggerType === "hover" && trapFocusMode === "content-menu") ||
				// Prevent from closing in case user interacts with items inside content
				lockedBlurEffects.current
			) {
				return;
			}

			handleClose();
		},
		[handleClose, triggerType, trapFocusMode]
	);

	const handleFocus = React.useCallback(() => {
		handleOpen();
	}, [handleOpen]);

	const handleMouseEnter = React.useCallback(() => {
		clearTimer();
		timerRef.current = setTimeout(
			handleOpen,
			cooldown.timer || isSubmenu ? timeouts.mouseEnterShort : timeouts.mouseEnter
		);

		if (!isSubmenu) cooldown.warm();
	}, [clearTimer, timerRef, handleOpen, isSubmenu]);

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

	const handleContentMouseDown = () => (lockedBlurEffects.current = true);
	const handleContentMouseUp = () => (lockedBlurEffects.current = false);

	const handleTransitionStart = React.useCallback(
		(e: TransitionEvent) => {
			if (!passedActive) return;
			if (flyoutElRef.current !== e.currentTarget || e.propertyName !== "transform") return;
			transitionStartedRef.current = true;
		},
		[passedActive]
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
		if (passedActive) {
			render();
			return;
		}

		/**
		 * Check that transitions are enabled and it has been triggered on tooltip open
		 * - keyboard focus navigation could move too fast and ignore the transitions completely
		 * - warmed up tooltips get removed instantly
		 */
		if (
			checkTransitions() &&
			!disableHideAnimation &&
			transitionStartedRef.current &&
			cooldown.status !== "warm"
		) {
			hide();
		} else {
			// In case transitions are disabled globally - remove from the DOM immediately
			remove();
		}
	}, [passedActive, render, hide, disableHideAnimation]);

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

		trapFocusRef.current = new TrapFocus(flyoutElRef.current);
		trapFocusRef.current.trap({
			mode: trapFocusMode,
			includeTrigger: triggerType === "hover" && trapFocusMode === "content-menu",
			onNavigateOutside: () => {
				handleClose();
			},
		});
	}, [status, triggerType, handleClose, trapFocusMode]);

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
				handleTransitionStart,
				handleTransitionEnd,
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
