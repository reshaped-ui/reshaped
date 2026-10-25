"use client";

import React from "react";
import { classNames, TrapFocus } from "@reshaped/utilities";
import { checkKeyboardMode } from "@reshaped/utilities/internal";

import { onNextFrame, checkTransitions } from "@/utilities/animation";
import Toast from "./Toast";
import { timeouts, toastWidths } from "./Toast.constants";
import ToastContext from "./Toast.context";
import type * as T from "./Toast.types";
import s from "./Toast.module.css";

const isWidthPreset = (width: T.ShowProps["width"]): width is T.WidthPreset =>
	width === "short" || width === "long";

const resolveWidth = (width?: T.ShowProps["width"]) => {
	if (isWidthPreset(width)) return toastWidths[width];
	return width;
};

const ToastContainer: React.FC<T.ContainerProps> = (props) => {
	const { toastProps, id, status, inspected, index, collapsedWidth } = props;
	const { timeout = "short", width } = toastProps;
	const { show, hide, remove } = React.useContext(ToastContext);
	const [toastHeight, setToastHeight] = React.useState<number>();
	const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(null);
	// Time left before hiding the toast, preserved when the timer gets paused
	const remainingTimeRef = React.useRef<number | null>(null);
	const timerStartRef = React.useRef(0);
	const rootRef = React.useRef<HTMLLIElement>(null);
	const resizingRef = React.useRef(false);
	const wrapperRef = React.useRef<HTMLDivElement>(null);
	const visible = status === "entered";
	const containerClassNames = classNames(
		s.container,
		visible && s[`container--visible`],
		index === 0 && s[`container--index-${index}`],
		!inspected && (index === 1 || index === 2) && s[`container--index-${index}`],
		!inspected && index >= 3 && s["container--index-overflow"]
	);
	const resolvedWidth = resolveWidth(inspected ? width : (collapsedWidth ?? width));

	const stopTimer = React.useCallback(() => {
		if (!timeoutRef.current) return;
		clearTimeout(timeoutRef.current);
		timeoutRef.current = null;

		if (remainingTimeRef.current !== null) {
			remainingTimeRef.current -= Date.now() - timerStartRef.current;
		}
	}, []);

	const startTimer = React.useCallback(() => {
		stopTimer();

		const timeoutValue = typeof timeout === "string" ? timeouts[timeout] : timeout;
		if (timeout === 0) return;

		// Resume the paused timer instead of starting it over
		remainingTimeRef.current = Math.max(
			0,
			remainingTimeRef.current ?? timeoutValue ?? timeouts.short
		);
		timerStartRef.current = Date.now();
		timeoutRef.current = setTimeout(() => {
			if (!checkTransitions()) {
				remove(id);
				return;
			}

			hide(id);
		}, remainingTimeRef.current);
	}, [hide, id, remove, timeout, stopTimer]);

	React.useEffect(() => stopTimer, [stopTimer]);

	const handleTransitionEnd = (e: React.TransitionEvent) => {
		if (e.propertyName !== "height") return;

		if (visible) return;
		remove(id);
	};

	/**
	 * Height transition might be missing, e.g. when it's removed with custom styles,
	 * so there won't be a transitionend event to remove the toast after hiding it
	 */
	React.useEffect(() => {
		if (status !== "exiting") return;

		onNextFrame(() => {
			const animations = rootRef.current?.getAnimations?.() ?? [];
			const hasHeightTransition = animations.some(
				(animation) => (animation as CSSTransition).transitionProperty === "height"
			);

			if (!hasHeightTransition) remove(id);
		});
	}, [status, id, remove]);

	const handleBlur = () => {
		// Region is still hovered, so the timer resumes once the mouse leaves it
		if (inspected) return;
		startTimer();
	};

	React.useEffect(() => {
		if (!visible) return;

		if (inspected) {
			stopTimer();
		} else {
			startTimer();
		}
	}, [inspected, startTimer, stopTimer, visible]);

	React.useEffect(() => {
		if (wrapperRef.current) {
			setToastHeight(wrapperRef.current.clientHeight);
		}

		show(id);
		startTimer();
	}, [show, id, startTimer]);

	React.useEffect(() => {
		if (!wrapperRef.current || !visible) return;

		const trapFocus = new TrapFocus();
		trapFocus.trap(wrapperRef.current, {
			includeTrigger: true,
			mode: "content-menu",
		});

		return () => trapFocus.release({ withoutFocusReturn: !checkKeyboardMode() });
	}, [visible]);

	React.useEffect(() => {
		if (!visible || index > 0) return;

		const handleResize = () => {
			resizingRef.current = true;
			onNextFrame(() => {
				resizingRef.current = false;
			});

			if (wrapperRef.current) {
				setToastHeight(wrapperRef.current.clientHeight);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [visible, index]);

	return (
		// oxlint-disable-next-line no-noninteractive-element-interactions
		<li
			ref={rootRef}
			className={containerClassNames}
			style={{
				width: resolvedWidth,
				maxWidth: "100%",
				// Height + padding + borders
				height: status === "entered" ? `calc(${toastHeight}px + var(--rs-unit-x2))` : 0,
				// Disable transition when height of the toast can change

				transitionDuration: resizingRef.current ? "0s" : undefined,
			}}
			onTransitionEnd={handleTransitionEnd}
			onFocus={stopTimer}
			onBlur={handleBlur}
		>
			<span className={s.wrapper}>
				<Toast
					{...toastProps}
					collapsed={index > 0 && !inspected}
					attributes={{ ...toastProps.attributes, ref: wrapperRef }}
				/>
			</span>
		</li>
	);
};

ToastContainer.displayName = "ToastContainer";

export default ToastContainer;
