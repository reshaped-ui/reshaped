"use client";

import React from "react";
import { disableUserSelect, enableUserSelect, disableScroll, enableScroll } from "utilities/dom";
import useToggle from "hooks/useToggle";

const useDrag = <
	TriggerElement extends HTMLElement = HTMLDivElement,
	ContainerElement extends HTMLElement = HTMLDivElement,
>(
	cb: (args: { x: number; y: number }) => void,
	options?: {
		disabled?: boolean;
		onDragStart?: () => void;
		onDragEnd?: () => void;
		containerRef?: React.RefObject<ContainerElement | null>;
	}
) => {
	const { disabled, onDragStart, onDragEnd, containerRef: passedContainerRef } = options || {};
	const toggle = useToggle();
	const triggerRef = React.useRef<TriggerElement | null>(null);
	const internalContainerRef = React.useRef<ContainerElement | null>(null);
	const containerRef = passedContainerRef || internalContainerRef;
	const triggerCompensationRef = React.useRef({ x: 0, y: 0 });

	React.useEffect(() => {
		const triggerEl = triggerRef.current;
		if (!triggerEl) return;
		if (!toggle.active) return;

		const handleDrag = (event: MouseEvent | TouchEvent) => {
			const resolvedEvent = event instanceof MouseEvent ? event : event.changedTouches[0];

			const container = containerRef.current ?? document.body;
			const containerRect = container.getBoundingClientRect();
			const triggerRect = triggerEl.getBoundingClientRect();

			// Calculate position relative to the container
			const relativeX = resolvedEvent.clientX - containerRect.x - triggerCompensationRef.current.x;
			const relativeY = resolvedEvent.clientY - containerRect.y - triggerCompensationRef.current.y;

			cb({
				x: Math.max(0, Math.min(relativeX, containerRect.width - triggerRect.width)),
				y: Math.max(0, Math.min(relativeY, containerRect.height - triggerRect.height)),
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
