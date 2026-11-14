"use client";

import React from "react";
import { TrapFocus } from "@reshaped/utilities";
import {
	checkKeyboardMode,
	type Coordinates,
	type FocusableElement,
} from "@reshaped/utilities/internal";

import usePrevious from "@/hooks/_internal/usePrevious";
import useElementId from "@/hooks/useElementId";
import useHandlerRef from "@/hooks/useHandlerRef";
import useHotkeys from "@/hooks/useHotkeys";
import useIsDismissible from "@/hooks/useIsDismissible";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { checkTransitions } from "@/utilities/animation";
import * as timeouts from "./Flyout.constants";
import {
	Provider,
	useFlyoutContentContext,
	useFlyoutContext,
	useFlyoutTriggerContext,
} from "./Flyout.context";
import type * as T from "./Flyout.types";
import useFlyout from "./useFlyout";
import cooldown from "./utilities/cooldown";
import { createSafeArea } from "./utilities/safeArea";

const FlyoutControlled: React.FC<T.ControlledProps & T.DefaultProps> = (props) => {
	const {
		triggerType = "click",
		groupTimeouts,
		onOpen,
		onClose,
		onAfterOpen,
		onAfterClose,
		children,
		disabled,
		fallbackAdjustLayout,
		fallbackMinHeight,
		trapFocusMode = "dialog",
		width,
		disableHideAnimation,
		disableContentHover,
		disableCloseOnOutsideClick,
		disableTouchTrigger,
		autoFocus = true,
		originCoordinates,
		contentGap = 2,
		contentShift,
		contentMaxHeight,
		contentMaxWidth,
		fallbackPositions,
		contentZIndex,
		contentClassName,
		contentAttributes,
		scrollableClassName,
		scrollableAttributes,
		position: passedPosition,
		active: passedActive,
		id: passedId,
		instanceRef,
		containerRef,
		initialFocusRef,
		positionRef,
	} = props;
	const onOpenRef = useHandlerRef(onOpen);
	const onCloseRef = useHandlerRef(onClose);
	const onAfterOpenRef = useHandlerRef(onAfterOpen);
	const onAfterCloseRef = useHandlerRef(onAfterClose);
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
	const lockedTimerRef = React.useRef<ReturnType<typeof setTimeout>>(null);
	const trapFocusRef = React.useRef<TrapFocus | null>(null);
	const lockedRef = React.useRef(false);
	// Open was requested but the content might not be rendered yet, so it still has to be closable
	const openRequestedRef = React.useRef(false);
	// Lock blur event while pressing anywhere inside the flyout content
	const lockedBlurEffects = React.useRef(false);
	// Focus shouldn't return back to the trigger when user intentionally clicks outside the flyout
	const shouldReturnFocusRef = React.useRef(true);
	// Touch devices trigger onMouseEnter but we don't need to apply regular hover timeouts
	// So we're saving a flag on touch start and then change the mouse enter behavior
	const hoverTriggeredWithTouchEventRef = React.useRef(false);
	// Mouse enter emulated after a touch should be ignored when touch interactions are disabled
	const ignoreTouchMouseEnterRef = React.useRef(false);
	// Other triggers got pointer-events disabled by this flyout and still have to be restored
	const triggersDisabledRef = React.useRef(false);
	// Interaction started inside the content React tree, including nested flyouts portaled outside of the content element
	const interactionInsideContentRef = React.useRef(false);
	// Cleanup function for safe area tracking
	const safeAreaRef = React.useRef<{ origin: Coordinates; cleanup: () => void } | null>(null);

	const originCoordinatesRef = React.useRef<Coordinates | null>(originCoordinates ?? null);
	originCoordinatesRef.current = originCoordinates ?? null;

	const flyout = useFlyout({
		triggerElRef: positionRef ?? triggerElRef,
		flyoutElRef,
		triggerCoordinatesRef: originCoordinatesRef,
		width,
		position: passedPosition,
		defaultActive: active,
		container: containerRef?.current,
		fallbackPositions: fallbackPositions === false ? [] : fallbackPositions,
		fallbackAdjustLayout,
		fallbackMinHeight,
		contentGap,
		contentShift,
		onClose: onCloseRef.current,
	});
	const { status, updatePosition, render, hide, remove, show } = flyout;
	const isRendered = status !== "idle";
	// Hover content that can be reached by the pointer, which keeps it open while moving towards it
	const hasSafeArea = triggerType === "hover" && !disableContentHover;
	const isDismissible = useIsDismissible({
		active: isRendered,
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
		if (!hasSafeArea) return;

		triggersDisabledRef.current = true;
		document.querySelectorAll("[data-rs-flyout-active=true]").forEach((el) => {
			if (el === triggerElRef.current) return;
			(el as HTMLElement).style.pointerEvents = "none";
		});
	}, [triggerElRef, hasSafeArea]);

	const enableTriggers = React.useCallback(() => {
		if (triggerType !== "hover") return;

		triggersDisabledRef.current = false;
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

		openRequestedRef.current = true;
		onOpenRef.current?.();
		disableTriggers();
	}, [onOpenRef, isRendered, triggerType, disableTriggers]);

	const handleClose = React.useCallback<T.ContextProps["handleClose"]>(
		(options) => {
			const isLocked = triggerType === "click" && !options.closeParents && !isDismissible();
			const canClose = !isLocked && (isRendered || openRequestedRef.current || disabled);

			if (!canClose) return;

			openRequestedRef.current = false;
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

		if (disableTouchTrigger) {
			ignoreTouchMouseEnterRef.current = true;
			return;
		}

		hoverTriggeredWithTouchEventRef.current = true;
	}, [triggerType, disableTouchTrigger]);

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
			if (ignoreTouchMouseEnterRef.current) {
				ignoreTouchMouseEnterRef.current = false;
				return;
			}

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

			if (hasSafeArea && isRendered) {
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
		[clearTimer, handleClose, triggerElRef, flyoutElRef, hasSafeArea, isRendered, flyout.position]
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
		interactionInsideContentRef.current = true;
	};
	const handleContentMouseUp = () => {
		lockedBlurEffects.current = false;
	};
	const handleContentKeyDown = () => {
		interactionInsideContentRef.current = true;
	};

	const finishHide = React.useCallback(() => {
		remove();
		onAfterCloseRef.current?.();
	}, [remove, onAfterCloseRef]);

	const handleTransitionEnd = React.useCallback(
		(e: React.TransitionEvent) => {
			if (flyoutElRef.current !== e.currentTarget || e.propertyName !== "transform") return;

			if (status === "visible") {
				onAfterOpenRef.current?.();
			}

			if (status === "hidden") finishHide();
		},
		[finishHide, status, onAfterOpenRef]
	);

	/**
	 * Control the display based on the props
	 */
	useIsomorphicLayoutEffect(() => {
		openRequestedRef.current = !!active;

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
			finishHide();
		}
	}, [active, prevActive, render, hide, finishHide, disableHideAnimation, disabled, groupTimeouts]);

	useIsomorphicLayoutEffect(() => {
		if (status === "rendered") show();
	}, [status, show]);

	// Content can be reopened at new coordinates without closing in between
	useIsomorphicLayoutEffect(() => {
		if (!originCoordinates || !isRendered) return;
		updatePosition();
		// oxlint-disable-next-line react-hooks/exhaustive-deps
	}, [originCoordinates?.x, originCoordinates?.y]);

	useIsomorphicLayoutEffect(() => {
		if (status !== "hidden") return;

		// Closing before the open transition starts cancels it instead of reversing,
		// so there is no transitionend to wait for
		if (!flyoutElRef.current?.firstElementChild?.getAnimations?.().length) {
			finishHide();
			return;
		}

		// Grouped flyouts switch without animations, so the hide animation is cut short
		// once another flyout from the group gets hovered
		if (groupTimeouts) return cooldown.onRewarm(finishHide);
	}, [status, groupTimeouts, finishHide]);

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
		// Release when the hide animation starts or right away when the content is removed without it
		if (status !== "hidden" && isRendered) return;

		if (trapFocusRef.current?.trapped) {
			/* Locking the popover to not open it again on trigger focus */
			if (triggerType === "hover" && checkKeyboardMode()) {
				lockedRef.current = true;
				if (lockedTimerRef.current) clearTimeout(lockedTimerRef.current);
				lockedTimerRef.current = setTimeout(() => {
					lockedRef.current = false;
				}, 100);
			}

			trapFocusRef.current.release({ withoutFocusReturn: !shouldReturnFocusRef.current });
			shouldReturnFocusRef.current = true;
		}
	}, [status, isRendered, triggerType]);

	/**
	 * Nested flyouts are portaled outside of the parent content element but are still rendered inside its React tree.
	 * React events bubble through portals, so content handlers mark the interactions coming from the nested flyouts too
	 * and the flag gets reset in the capture phase before every new interaction
	 */
	React.useEffect(() => {
		if (!isRendered || disableCloseOnOutsideClick) return;

		const events = ["mousedown", "touchstart", "keydown"] as const;
		const resetInteraction = () => {
			interactionInsideContentRef.current = false;
		};

		events.forEach((event) => {
			document.addEventListener(event, resetInteraction, { capture: true, passive: true });
		});

		return () => {
			events.forEach((event) => {
				document.removeEventListener(event, resetInteraction, { capture: true });
			});
		};
	}, [isRendered, disableCloseOnOutsideClick]);

	/**
	 * Clean up safe polygon tracking on unmount or when flyout closes
	 */
	React.useEffect(() => {
		if (!isRendered) return;
		return () => safeAreaRef.current?.cleanup();
	}, [isRendered]);

	/**
	 * Restore the triggers disabled on open when the content goes away without handleClose,
	 * for example when the flyout unmounts while open or gets hidden with active/disabled props
	 */
	React.useEffect(() => {
		if (!isRendered) return;
		return () => {
			if (triggersDisabledRef.current) enableTriggers();
		};
	}, [isRendered, enableTriggers]);

	/**
	 * Release focus trapping on unmount
	 */
	React.useEffect(() => {
		return () => trapFocusRef.current?.release();
	}, []);

	/**
	 * Clean up pending timers on unmount to avoid running callbacks
	 * after the component (or test environment) is torn down
	 */
	React.useEffect(() => {
		return () => {
			clearTimer();
			if (lockedTimerRef.current) clearTimeout(lockedTimerRef.current);
		};
	}, [clearTimer]);

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

	useHotkeys(
		{
			Escape: () => {
				// Nested flyouts are closed one by one, starting from the latest opened one
				if (!isDismissible()) return;
				handleClose({ reason: "escape-key" });
			},
		},
		[handleClose, isDismissible]
	);

	useOnClickOutside(
		[flyoutElRef, triggerElRef],
		() => {
			// Clicks inside nested flyouts are not considered outside clicks
			if (interactionInsideContentRef.current) return;

			// Clicking outside changes focused element so we don't need to set it back ourselves
			shouldReturnFocusRef.current = false;
			handleClose({ reason: "outside-click" });
		},
		{
			disabled: !isRendered || disableCloseOnOutsideClick,
			// Content of components like DropdownMenu can stop the click propagation
			capture: true,
		}
	);

	return (
		<Provider
			value={{
				id,
				active: !!active,
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
				handleContentKeyDown,
				triggerType,
				trapFocusMode,
				contentZIndex,
				contentClassName,
				contentAttributes,
				scrollableClassName,
				scrollableAttributes,
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
