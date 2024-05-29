"use client";

import React from "react";
import { debounce } from "utilities/helpers";
import TrapFocus from "utilities/a11y/TrapFocus";
import * as timeouts from "constants/timeouts";
import useIsDismissible from "hooks/_private/useIsDismissible";
import useElementId from "hooks/useElementId";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import useHotkeys from "hooks/useHotkeys";
import useOnClickOutside from "hooks/_private/useOnClickOutside";
import useRTL from "hooks/useRTL";
import { checkTransitions, onNextFrame } from "utilities/animation";
import useFlyout from "./useFlyout";
import { Provider, useFlyoutContext } from "./Flyout.context";
import type * as T from "./Flyout.types";

const FlyoutRoot = (props: T.ControlledProps & T.DefaultProps) => {
	const {
		triggerType = "click",
		onOpen,
		onClose,
		children,
		forcePosition,
		trapFocusMode,
		width,
		disableHideAnimation,
		contentGap,
		contentClassName,
		contentAttributes,
		position: passedPosition,
		active: passedActive,
		id: passedId,
		instanceRef,
	} = props;
	const parentFlyoutContext = useFlyoutContext();
	const [isRTL] = useRTL();
	const internalTriggerElRef = React.useRef<HTMLButtonElement | null>(null);
	const triggerElRef = parentFlyoutContext?.triggerElRef || internalTriggerElRef;
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
		onOpen?.();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status]);

	const handleClose = React.useCallback<T.ContextProps["handleClose"]>(
		(options) => {
			const isLocked = triggerType === "click" && !isDismissible();
			const canClose = !isLocked && status !== "idle";

			if (!canClose) return;
			onClose?.();

			if (options?.closeParents) {
				parentFlyoutContext?.handleClose?.();
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[status, isDismissible, triggerType]
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
		timerRef.current = setTimeout(handleOpen, timeouts.mouseEnter);
	}, [clearTimer, timerRef, handleOpen]);

	const handleMouseLeave = React.useCallback(() => {
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
		 * (keyboard focus navigation could move too fast and ignore the transitions completely)
		 */
		if (checkTransitions() && !disableHideAnimation && transitionStartedRef.current) {
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
		const update = debounce(updatePosition, 10);

		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, [updatePosition]);

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
		}),
		[handleOpen, handleClose]
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
			}}
		>
			{children}
		</Provider>
	);
};

export default FlyoutRoot;
