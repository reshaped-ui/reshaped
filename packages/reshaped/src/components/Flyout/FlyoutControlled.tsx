"use client";

import { TrapFocus } from "@reshaped/utilities";
import { checkKeyboardMode, type FocusableElement } from "@reshaped/utilities/internal";
import React from "react";

import useIsDismissible from "hooks/_private/useIsDismissible";
import usePrevious from "hooks/_private/usePrevious";
import useElementId from "hooks/useElementId";
import useHandlerRef from "hooks/useHandlerRef";
import useHotkeys from "hooks/useHotkeys";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import useOnClickOutside from "hooks/useOnClickOutside";
import { checkTransitions } from "utilities/animation";

import * as timeouts from "./Flyout.constants";
import {
	Provider,
	useFlyoutTriggerContext,
	useFlyoutContext,
	useFlyoutContentContext,
} from "./Flyout.context";
import useFlyout from "./useFlyout";
import cooldown from "./utilities/cooldown";
import { createSafeArea } from "./utilities/safeArea";

import type * as T from "./Flyout.types";
import type * as G from "types/global";

const FlyoutControlled: React.FC<T.ControlledProps & T.DefaultProps> = (props) => {
	const {
		triggerType = "click",
		groupTimeouts,
		onOpen,
		onClose,
		children,
		disabled,
		forcePosition,
		fallbackAdjustLayout,
		fallbackMinHeight,
		trapFocusMode = "dialog",
		width,
		disableHideAnimation,
		disableContentHover,
		disableCloseOnOutsideClick,
		autoFocus = true,
		originCoordinates,
		contentGap = 2,
		contentShift,
		contentMaxHeight,
		contentMaxWidth,
		contentZIndex,
		contentClassName,
		contentAttributes,
		position: passedPosition,
		active: passedActive,
		id: passedId,
		instanceRef,
		containerRef,
		initialFocusRef,
		positionRef,
	} = props;
	const fallbackPositions =
		props.fallbackPositions === false || forcePosition ? [] : props.fallbackPositions;
	const onOpenRef = useHandlerRef(onOpen);
	const onCloseRef = useHandlerRef(onClose);
	const active = disabled === true ? false : passedActive;
	const prevActive = usePrevious(active);
	const parentFlyoutContext = useFlyoutContext();
	const { elRef: parentTriggerRef } = useFlyoutTriggerContext() || {};
	const { elRef: parentContentRef } = useFlyoutContentContext() || {};

	const isSubmenu =
		parentFlyoutContext.trapFocusMode === "action-menu" ||
		parentFlyoutContext.trapFocusMode === "content-menu";

	const internalTriggerElRef = React.useRef<HTMLButtonElement>(null);

	/**
	 * Reuse the parent trigger ref in case we render nested triggers
	 * For example, when we apply tooltip and popover to the same button
	 *
	 * Resolving the same inside another Flyout.Content should reset the inheritance
	 * For example, if you have a tooltip -> popover inside another popover.content, tooltip shouldn't use its parent context anymore
	 */
	const isParentTriggerInsideFlyout =
		!!parentTriggerRef?.current && parentContentRef?.current?.contains(parentTriggerRef.current);
	const tryParentTrigger = !parentContentRef || isParentTriggerInsideFlyout;

	const triggerElRef = (tryParentTrigger && parentTriggerRef) || internalTriggerElRef;
	const flyoutElRef = React.useRef<HTMLDivElement>(null);
	const id = useElementId(passedId);
	const timerRef = React.useRef<ReturnType<typeof setTimeout>>(null);
	const trapFocusRef = React.useRef<TrapFocus | null>(null);
	const lockedRef = React.useRef(false);
	// Lock blur event while pressing anywhere inside the flyout content
	const lockedBlurEffects = React.useRef(false);
	// Focus shouldn't return back to the trigger when user intentionally clicks outside the flyout
	const shouldReturnFocusRef = React.useRef(true);
	// Touch devices trigger onMouseEnter but we don't need to apply regular hover timeouts
	// So we're saving a flag on touch start and then change the mouse enter behavior
	const hoverTriggeredWithTouchEventRef = React.useRef(false);
	// Cleanup function for safe area tracking
	const safeAreaRef = React.useRef<{ origin: G.Coordinates; cleanup: () => void } | null>(null);

	const originCoordinatesRef = React.useRef<G.Coordinates | null>(originCoordinates ?? null);
	originCoordinatesRef.current = originCoordinates ?? null;

	const flyout = useFlyout({
		triggerElRef: positionRef ?? triggerElRef,
		flyoutElRef,
		triggerCoordinatesRef: originCoordinatesRef,
		width,
		position: passedPosition,
		defaultActive: active,
		container: containerRef?.current,
		fallbackPositions,
		fallbackAdjustLayout,
		fallbackMinHeight,
		contentGap,
		contentShift,
		onClose: onCloseRef.current,
	});
	const { status, updatePosition, render, hide, remove, show } = flyout;
	const isRendered = status !== "idle";

	// Don't create dismissible queue for hover flyout because they close all together on mouseout
	const isDismissible = useIsDismissible({
		active: isRendered && triggerType !== "hover",
		contentRef: flyoutElRef,
		triggerRef: triggerElRef,
	});

	const clearTimer = React.useCallback(() => {
		if (timerRef.current) clearTimeout(timerRef.current);
	}, []);

	/**
	 * Disable all triggers while mouse is moving over the safe area
	 */
	const disableTriggers = React.useCallback(() => {
		if (triggerType !== "hover") return;

		document.querySelectorAll("[data-rs-flyout-active]").forEach((el) => {
			if (el === triggerElRef.current) return;
			(el as HTMLElement).style.pointerEvents = "none";
		});
	}, [triggerElRef, triggerType]);

	const enableTriggers = React.useCallback(() => {
		if (triggerType !== "hover") return;

		document.querySelectorAll("[data-rs-flyout-active]").forEach((el) => {
			(el as HTMLElement).style.removeProperty("pointer-events");
		});
	}, [triggerType]);

	/**
	 * Component open/close handlers
	 * Called from the internal actions
	 */
	const handleOpen = React.useCallback(() => {
		if (lockedRef.current) return;
		if (isRendered && triggerType !== "hover") return;

		onOpenRef.current?.();
		disableTriggers();
	}, [onOpenRef, isRendered, triggerType, disableTriggers]);

	const handleClose = React.useCallback<T.ContextProps["handleClose"]>(
		(options) => {
			const isLocked = triggerType === "click" && !isDismissible();
			const canClose = !isLocked && (isRendered || disabled);

			if (!canClose) return;

			onCloseRef.current?.({ reason: options.reason });
			enableTriggers();

			if (options?.closeParents) {
				parentFlyoutContext?.handleClose?.({ closeParents: true, reason: options.reason });
			}
		},
		[
			isRendered,
			isDismissible,
			triggerType,
			onCloseRef,
			disabled,
			parentFlyoutContext,
			enableTriggers,
		]
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

			handleClose({});
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

	const handleContentMouseEnter = React.useCallback(() => {
		clearTimer();

		if (hoverTriggeredWithTouchEventRef.current) {
			handleOpen();
			hoverTriggeredWithTouchEventRef.current = false;
		} else {
			if (groupTimeouts) cooldown.warm();

			timerRef.current = setTimeout(
				() => {
					handleOpen();
				},
				groupTimeouts && cooldown.status === "warming" ? timeouts.mouseEnter : 0
			);
		}
	}, [clearTimer, handleOpen, groupTimeouts]);

	const handleTriggerMouseEnter = React.useCallback(
		(e: React.MouseEvent) => {
			if (e.currentTarget === triggerElRef.current) {
				safeAreaRef.current?.cleanup();
			}

			handleContentMouseEnter();
		},
		[triggerElRef, handleContentMouseEnter]
	);

	const handleMouseLeave = React.useCallback(
		(e: React.MouseEvent) => {
			if (
				e.relatedTarget === flyoutElRef.current ||
				(e.relatedTarget instanceof Node && flyoutElRef.current?.contains(e.relatedTarget))
			)
				return;
			if (
				e.relatedTarget === triggerElRef.current ||
				(e.relatedTarget instanceof Node && triggerElRef.current?.contains(e.relatedTarget))
			)
				return;

			cooldown.cool();
			clearTimer();

			safeAreaRef.current?.cleanup();

			if (triggerType === "hover" && isRendered) {
				// Safe area coordinates are defined based on the trigger mouse out, even when returning mouse from content to trigger
				const origin =
					e.currentTarget === flyoutElRef.current && safeAreaRef.current?.origin
						? safeAreaRef.current.origin
						: { x: e.clientX, y: e.clientY };
				const cleanup = createSafeArea({
					contentRef: flyoutElRef,
					triggerRef: triggerElRef,
					position: flyout.position,
					onClose: () => handleClose({}),
					origin,
				});

				safeAreaRef.current = { origin, cleanup };
			} else {
				handleClose({});
			}
		},
		[clearTimer, handleClose, triggerElRef, flyoutElRef, triggerType, isRendered, flyout.position]
	);

	const handleTriggerClick = React.useCallback(() => {
		if (!isRendered) {
			handleOpen();
		} else {
			handleClose({});
		}
	}, [isRendered, handleOpen, handleClose]);

	const handleContentMouseDown = () => {
		lockedBlurEffects.current = true;
		hoverTriggeredWithTouchEventRef.current = true;
	};
	const handleContentMouseUp = () => {
		lockedBlurEffects.current = false;
	};

	const handleTransitionEnd = React.useCallback(
		(e: React.TransitionEvent) => {
			if (flyoutElRef.current !== e.currentTarget || e.propertyName !== "transform") return;
			if (status === "hidden") remove();
		},
		[remove, status]
	);

	/**
	 * Control the display based on the props
	 */
	useIsomorphicLayoutEffect(() => {
		if (active) {
			render();
			return;
		}

		if (disabled) cooldown.cool();

		// Prevent calling hide on component mount
		if (prevActive === active) return;

		if (
			checkTransitions() &&
			!disableHideAnimation &&
			(cooldown.status === "cooling" || !groupTimeouts)
		) {
			hide();
		} else {
			// In case transitions are disabled globally - remove from the DOM immediately
			remove();
		}
	}, [active, prevActive, render, hide, remove, disableHideAnimation, disabled, groupTimeouts]);

	useIsomorphicLayoutEffect(() => {
		if (status === "rendered") show();
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
		if (trapFocusMode === false) return;

		const initialFocusEl = (
			!autoFocus
				? flyoutElRef.current.querySelector("[role][tabindex='-1']")
				: initialFocusRef?.current
		) as FocusableElement | undefined;

		trapFocusRef.current = new TrapFocus();
		trapFocusRef.current.trap(flyoutElRef.current, {
			mode: trapFocusMode,
			initialFocusEl,
			includeTrigger: triggerType === "hover" && trapFocusMode !== "dialog" && !isSubmenu,
			onRelease: () => {
				handleClose({});
			},
		});
	}, [status, triggerType, trapFocusMode, autoFocus]);

	React.useEffect(() => {
		if (!disableHideAnimation && status !== "hidden") return;
		if (disableHideAnimation && isRendered) return;

		if (trapFocusRef.current?.trapped) {
			/* Locking the popover to not open it again on trigger focus */
			if (triggerType === "hover" && checkKeyboardMode()) {
				lockedRef.current = true;
				setTimeout(() => {
					lockedRef.current = false;
				}, 100);
			}

			trapFocusRef.current.release({ withoutFocusReturn: !shouldReturnFocusRef.current });
			shouldReturnFocusRef.current = true;
		}
	}, [status, isRendered, triggerType, disableHideAnimation]);

	/**
	 * Release focus trapping on unmount
	 */
	React.useEffect(() => {
		return () => trapFocusRef.current?.release();
	}, []);

	/**
	 * Clean up safe polygon tracking on unmount or when flyout closes
	 */
	React.useEffect(() => {
		if (!isRendered) safeAreaRef.current?.cleanup();
		return () => safeAreaRef.current?.cleanup();
	}, [isRendered]);

	/**
	 * Imperative methods for controlling Flyout
	 */
	React.useImperativeHandle(
		instanceRef,
		() => ({
			open: handleOpen,
			close: () => handleClose({}),
			updatePosition: () => updatePosition(),
		}),
		[handleOpen, handleClose, updatePosition]
	);

	useHotkeys({ Escape: () => handleClose({ reason: "escape-key" }) }, [handleClose]);

	useOnClickOutside(
		[flyoutElRef, triggerElRef],
		() => {
			// Clicking outside changes focused element so we don't need to set it back ourselves
			shouldReturnFocusRef.current = false;
			handleClose({ reason: "outside-click" });
		},
		{
			disabled: !isRendered || disableCloseOnOutsideClick,
		}
	);

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
				handleTriggerMouseEnter,
				handleContentMouseEnter,
				handleMouseLeave,
				handleTouchStart,
				handleTransitionEnd,
				handleClick: handleTriggerClick,
				handleContentMouseDown,
				handleContentMouseUp,
				triggerType,
				trapFocusMode,
				contentZIndex,
				contentClassName,
				contentAttributes,
				contentGap,
				contentMaxHeight,
				contentMaxWidth,
				containerRef,
				disableContentHover,
				autoFocus,
				isSubmenu,
			}}
		>
			{children}
		</Provider>
	);
};

FlyoutControlled.displayName = "FlyoutControlled";

export default FlyoutControlled;
