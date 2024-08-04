"use client";

import React from "react";
import { disableUserSelect, enableUserSelect, disableScroll, enableScroll } from "utilities/dom";
import useToggle from "hooks/useToggle";
import useHotkeys from "hooks/useHotkeys";
import * as keys from "constants/keys";

export type UseDragCallbackArgs = { x: number; y: number; triggerX: number; triggerY: number };

const useDrag = <
	TriggerElement extends HTMLElement = HTMLButtonElement,
	ContainerElement extends HTMLElement = HTMLDivElement,
>(
	cb: (args: UseDragCallbackArgs) => void,
	options?: {
		disabled?: boolean;
		onDragStart?: () => void;
		onDragEnd?: () => void;
		containerRef?: React.RefObject<ContainerElement>;
		triggerRef?: React.RefObject<TriggerElement>;
		orientation?: "horizontal" | "vertical" | "all";
	}
) => {
	const {
		disabled,
		onDragStart,
		onDragEnd,
		containerRef: passedContainerRef,
		triggerRef: passedTriggerRef,
		orientation = "all",
	} = options || {};
	const toggle = useToggle();
	const internalTriggerRef = React.useRef<TriggerElement | null>(null);
	const triggerRef = passedTriggerRef || internalTriggerRef;
	const internalContainerRef = React.useRef<ContainerElement | null>(null);
	const containerRef = passedContainerRef || internalContainerRef;
	const triggerCompensationRef = React.useRef({ x: 0, y: 0 });
	const isVertical = orientation === "vertical" || orientation === "all";
	const isHorizontal = orientation === "horizontal" || orientation === "all";

	const handleKeyboard = (x: number, y: number) => {
		const triggerEl = triggerRef.current;

		if (!triggerEl) return;

		const container = containerRef.current ?? document.body;
		const containerRect = container.getBoundingClientRect();
		const triggerRect = triggerEl?.getBoundingClientRect();
		const nextArgs = { x: 0, y: 0, triggerX: 0, triggerY: 0 };

		if (isVertical) {
			const relativeY = Math.round(triggerRect.y) - containerRect.y + y;
			nextArgs.y = Math.max(0, Math.min(relativeY, containerRect.height - triggerRect!.height));
			nextArgs.triggerY = triggerRect.y - containerRect.y;
		}

		if (isHorizontal) {
			const relativeX = Math.round(triggerRect.x) - containerRect.x + x;
			nextArgs.x = Math.max(0, Math.min(relativeX, containerRect.width - triggerRect!.width));
			nextArgs.triggerX = triggerRect.x - containerRect.x;
		}

		cb(nextArgs);
	};

	useHotkeys<TriggerElement>(
		{
			[keys.LEFT]: () => isHorizontal && handleKeyboard(-20, 0),
			[keys.RIGHT]: () => isHorizontal && handleKeyboard(20, 0),
			[keys.UP]: () => isVertical && handleKeyboard(0, -20),
			[keys.DOWN]: () => isVertical && handleKeyboard(0, 20),
		},
		[],
		{
			ref: triggerRef,
			disabled,
		}
	);

	React.useEffect(() => {
		const triggerEl = triggerRef.current;
		if (!triggerEl) return;
		if (!toggle.active) return;

		const handleDrag = (event: MouseEvent | TouchEvent) => {
			const resolvedEvent = event instanceof MouseEvent ? event : event.changedTouches[0];

			const container = containerRef.current ?? document.body;
			const containerRect = container.getBoundingClientRect();
			const triggerRect = triggerEl.getBoundingClientRect();

			const triggerX = resolvedEvent.clientX - containerRect.x;
			const triggerY = resolvedEvent.clientY - containerRect.y;

			// Calculate position relative to the container
			const relativeX = triggerX - triggerCompensationRef.current.x;
			const relativeY = triggerY - triggerCompensationRef.current.y;

			cb({
				x: Math.max(0, Math.min(relativeX, containerRect.width - triggerRect.width)),
				y: Math.max(0, Math.min(relativeY, containerRect.height - triggerRect.height)),
				triggerX: triggerRect.x - containerRect.x,
				triggerY: triggerRect.y - containerRect.y,
			});
		};

		const handleDragEnd = () => {
			triggerCompensationRef.current = { x: 0, y: 0 };
			toggle.deactivate();
			enableUserSelect();
			enableScroll();
			onDragEnd?.();
		};

		document.addEventListener("touchmove", handleDrag, { passive: true });
		document.addEventListener("touchend", handleDragEnd, { passive: true });
		document.addEventListener("mousemove", handleDrag, { passive: true });
		document.addEventListener("mouseup", handleDragEnd, { passive: true });

		return () => {
			document.removeEventListener("touchmove", handleDrag);
			document.removeEventListener("touchend", handleDragEnd);
			document.removeEventListener("mousemove", handleDrag);
			document.removeEventListener("mouseup", handleDragEnd);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [toggle]);

	React.useEffect(() => {
		const triggerEl = triggerRef.current;
		if (!triggerEl || disabled) return;

		const handleStart = (event: MouseEvent | TouchEvent) => {
			const resolvedEvent = event instanceof MouseEvent ? event : event.changedTouches[0];

			// Find the coordinate of the event inside the trigger
			const triggerRect = triggerEl.getBoundingClientRect();
			triggerCompensationRef.current = {
				x: resolvedEvent.clientX - triggerRect.x,
				y: resolvedEvent.clientY - triggerRect.y,
			};

			toggle.activate();
			disableUserSelect();
			disableScroll();
			onDragStart?.();
		};

		triggerEl.addEventListener("touchstart", handleStart, { passive: true });
		triggerEl.addEventListener("mousedown", handleStart, { passive: true });

		return () => {
			triggerEl.removeEventListener("touchstart", handleStart);
			triggerEl.removeEventListener("mousedown", handleStart);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [toggle, disabled]);

	return { ref: triggerRef, containerRef, active: toggle.active };
};

export default useDrag;
