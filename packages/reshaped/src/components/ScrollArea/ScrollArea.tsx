"use client";

import React, { forwardRef } from "react";

import useHandlerRef from "hooks/useHandlerRef";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import { resolveMixin } from "styles/mixin";
import { classNames } from "utilities/props";
import { disableScroll, enableScroll } from "utilities/scroll";

import s from "./ScrollArea.module.css";

import type * as T from "./ScrollArea.types";

const ScrollAreaBar: React.FC<T.BarProps> = (props) => {
	const { ratio, position, vertical, onThumbMove } = props;
	const onThumbMoveRef = useHandlerRef(onThumbMove);
	const [dragging, setDragging] = React.useState(false);
	const dragStartPositionRef = React.useRef(0);
	const barRef = React.useRef<HTMLDivElement>(null);
	const barClassNames = classNames(
		s.scrollbar,
		vertical ? s["--scrollbar-y"] : s["--scrollbar-x"],
		dragging && s["--scrollbar-dragging"]
	);

	const handleClick = (e: React.MouseEvent) => {
		const elBar = barRef.current;
		const isDirty = dragStartPositionRef.current;

		dragStartPositionRef.current = 0;
		if (isDirty) return;
		if (!elBar || e.currentTarget !== elBar) return;

		const rect = elBar.getBoundingClientRect();
		const diff = vertical ? e.pageY - rect.top : e.pageX - rect.left;
		const total = vertical ? elBar.clientHeight : elBar.clientWidth;

		// Move the center of the thumb to the clicked coordinates
		onThumbMove({ value: diff / total - ratio / 2, type: "absolute" });
	};

	const handleDrag = React.useCallback(
		(e: MouseEvent) => {
			if (!dragStartPositionRef.current) {
				dragStartPositionRef.current = vertical ? e.pageY : e.pageX;
			}

			const elBar = barRef.current;
			if (!elBar) return;
			if (!dragging) return;

			const diff = vertical ? e.movementY : e.movementX;
			const total = vertical ? elBar.scrollHeight : elBar.scrollWidth;

			onThumbMoveRef.current?.({ value: diff / total, type: "relative" });
		},
		[vertical, dragging, onThumbMoveRef]
	);

	const handleDragStart = () => {
		setDragging(true);
		disableScroll();
	};

	const handleDragEnd = React.useCallback(() => {
		setDragging(false);
		enableScroll();
	}, []);

	React.useEffect(() => {
		if (!dragging) return;

		document.addEventListener("mousemove", handleDrag);
		document.addEventListener("mouseup", handleDragEnd);

		return () => {
			document.removeEventListener("mousemove", handleDrag);
			document.removeEventListener("mouseup", handleDragEnd);
		};
	}, [handleDrag, handleDragEnd, dragging]);

	return (
		<div
			className={barClassNames}
			style={
				{
					"--rs-scroll-area-ratio": ratio,
					"--rs-scroll-area-position": position,
				} as React.CSSProperties
			}
			ref={barRef}
			onClick={handleClick}
			onMouseDown={handleDragStart}
			aria-hidden="true"
		>
			<div className={s.thumb} />
		</div>
	);
};

const ScrollArea = forwardRef<HTMLDivElement, T.Props>((props, ref) => {
	const {
		children,
		height,
		maxHeight,
		scrollbarDisplay = "hover",
		onScroll,
		className,
		attributes,
	} = props;
	const [scrollRatio, setScrollRatio] = React.useState({ x: 1, y: 1 });
	const [scrollPosition, setScrollPosition] = React.useState({ x: 0, y: 0 });
	const scrollableRef = React.useRef<HTMLDivElement>(null);
	const rootRef = React.useRef<HTMLDivElement>(null);
	const mixinStyles = resolveMixin({ height, maxHeight });
	const rootClassNames = classNames(
		s.root,
		scrollbarDisplay && s[`--display-${scrollbarDisplay}`],
		className
	);
	const contentClassNames = classNames(s.content, mixinStyles.classNames);

	const updateScroll = React.useCallback(() => {
		const scrollableEl = scrollableRef.current;
		if (!scrollableEl) return;

		setScrollRatio({
			x: scrollableEl.clientWidth / scrollableEl.scrollWidth,
			y: scrollableEl.clientHeight / scrollableEl.scrollHeight,
		});
	}, []);

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const { scrollLeft, scrollTop, clientWidth, clientHeight, scrollWidth, scrollHeight } =
			e.currentTarget;

		setScrollPosition({
			x: scrollLeft / scrollWidth,
			y: scrollTop / scrollHeight,
		});
		onScroll?.({
			x: scrollWidth === clientWidth ? 0 : scrollLeft / (scrollWidth - clientWidth),
			y: scrollHeight === clientHeight ? 0 : scrollTop / (scrollHeight - clientHeight),
		});
	};

	const handleThumbYMove: T.BarProps["onThumbMove"] = (args) => {
		const scrollableEl = scrollableRef.current;
		if (!scrollableEl) return;

		const value = scrollableEl.scrollHeight * args.value;

		if (args.type === "absolute") {
			scrollableEl.scrollTop = value;
		} else {
			scrollableEl.scrollTop += value;
		}
	};

	const handleThumbXMove: T.BarProps["onThumbMove"] = (args) => {
		const scrollableEl = scrollableRef.current;
		if (!scrollableEl) return;

		const value = scrollableEl.scrollWidth * args.value;

		if (args.type === "absolute") {
			scrollableEl.scrollLeft = value;
		} else {
			scrollableEl.scrollLeft += value;
		}
	};

	React.useImperativeHandle(ref, () => scrollableRef.current!);

	useIsomorphicLayoutEffect(() => {
		updateScroll();
	}, [updateScroll]);

	useIsomorphicLayoutEffect(() => {
		const rootEl = rootRef.current;
		if (!rootEl) return;

		const observer = new ResizeObserver(updateScroll);

		observer.observe(rootEl);
		return () => observer.disconnect();
	}, [updateScroll]);

	return (
		<div {...attributes} ref={rootRef} className={rootClassNames}>
			<div className={s.scrollable} ref={scrollableRef} onScroll={handleScroll}>
				<div className={contentClassNames} style={{ ...mixinStyles.variables }}>
					{children}
				</div>
			</div>
			{scrollRatio.y < 1 && scrollbarDisplay !== "hidden" && (
				<ScrollAreaBar
					vertical
					onThumbMove={handleThumbYMove}
					ratio={scrollRatio.y}
					position={scrollPosition.y}
				/>
			)}
			{scrollRatio.x < 1 && scrollbarDisplay !== "hidden" && (
				<ScrollAreaBar
					onThumbMove={handleThumbXMove}
					ratio={scrollRatio.x}
					position={scrollPosition.x}
				/>
			)}
		</div>
	);
});

ScrollArea.displayName = "ScrollArea";

export default ScrollArea;
