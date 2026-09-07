"use client";

import React from "react";
import { classNames } from "@reshaped/utilities";

import useHandlerRef from "@/hooks/useHandlerRef";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { onNextFrame, checkTransitions } from "@/utilities/animation";
import type * as T from "./Expandable.types";
import s from "./Expandable.module.css";

const Expandable: React.FC<T.Props> = (props) => {
	const { children, active, orientation = "vertical", onAfterClose, className, attributes } = props;
	const horizontal = orientation === "horizontal";
	const sizeProperty = horizontal ? ("width" as const) : ("height" as const);
	// Horizontal expanding is based on the content width, since auto would resolve to the available one
	const autoSize = horizontal ? "max-content" : "auto";
	const rootRef = React.useRef<HTMLDivElement>(null);
	const mountedRef = React.useRef(false);
	const animatedActiveRef = React.useRef(active);
	const frameRef = React.useRef<number | null>(null);
	const onAfterCloseRef = useHandlerRef(onAfterClose);
	const [animatedSize, setAnimatedSize] = React.useState<React.CSSProperties["height"] | null>(
		active ? autoSize : null
	);
	// Landmark roles have to be labelled, otherwise they pollute the page landmark navigation
	const labelled = Boolean(attributes?.["aria-label"] || attributes?.["aria-labelledby"]);
	const rootClassNames = classNames(
		s.root,
		s[`--orientation-${orientation}`],
		animatedSize !== null && animatedSize !== 0 && s["--visible"],
		mountedRef.current && animatedSize !== autoSize && s["--animated"],
		className
	);

	const handleTransitionEnd = (e: React.TransitionEvent) => {
		if (e.propertyName !== sizeProperty || e.target !== rootRef.current) return;

		setAnimatedSize(active ? autoSize : null);
		if (!active) onAfterCloseRef.current?.();
	};

	// Avoid animations happening if component is active by default
	// onNextFrame lets us wait for the component to render first
	React.useEffect(() => {
		onNextFrame(() => {
			mountedRef.current = true;
		});
	}, []);

	// Animating only on the active prop change keeps React from replaying the animation
	// when it tears down and sets up the effects of the mounted component again
	useIsomorphicLayoutEffect(() => {
		const rootEl = rootRef.current;
		const activeChanged = animatedActiveRef.current !== active;

		animatedActiveRef.current = active;

		if (!rootEl || !activeChanged) return;

		if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
		frameRef.current = null;

		const settle = () => {
			rootEl.style[sizeProperty] = "";
			setAnimatedSize(active ? autoSize : null);
			if (!active) onAfterCloseRef.current?.();
		};

		if (!mountedRef.current || !checkTransitions()) {
			settle();
			return;
		}

		const measure = () => (horizontal ? rootEl.clientWidth : rootEl.clientHeight);
		const currentSize = measure();

		if (active) rootEl.style[sizeProperty] = autoSize;
		const targetSize = active ? measure() : 0;

		if (targetSize === currentSize) {
			settle();
			return;
		}

		rootEl.style[sizeProperty] = `${currentSize}px`;

		frameRef.current = requestAnimationFrame(() => {
			frameRef.current = null;
			setAnimatedSize(targetSize);
		});
	}, [active, horizontal, sizeProperty, autoSize, onAfterCloseRef]);

	return (
		<div
			{...attributes}
			className={rootClassNames}
			ref={rootRef}
			style={
				animatedSize !== null
					? {
							width: horizontal ? animatedSize : undefined,
							height: horizontal ? undefined : animatedSize,
							overflow: animatedSize === autoSize ? "visible" : undefined,
						}
					: undefined
			}
			onTransitionEnd={handleTransitionEnd}
			// oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
			role={labelled ? "region" : undefined}
			hidden={!active && animatedSize === null}
		>
			{horizontal ? <div className={s.content}>{children}</div> : children}
		</div>
	);
};

Expandable.displayName = "Expandable";

export default Expandable;
