"use client";

import React from "react";
import { classNames } from "@reshaped/utilities";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { onNextFrame, checkTransitions } from "@/utilities/animation";
import * as T from "./Expandable.types";
import s from "./Expandable.module.css";

const Expandable: React.FC<T.ContentProps> = (props) => {
	const { children, active, attributes } = props;
	const rootRef = React.useRef<HTMLDivElement>(null);
	const mountedRef = React.useRef(false);
	const animatedActiveRef = React.useRef(active);
	const frameRef = React.useRef<number | null>(null);
	const [animatedHeight, setAnimatedHeight] = React.useState<React.CSSProperties["height"] | null>(
		active ? "auto" : null
	);
	const contentClassNames = classNames(
		s.root,

		mountedRef.current && animatedHeight !== "auto" && s["--animated"]
	);

	const handleTransitionEnd = (e: React.TransitionEvent) => {
		if (e.propertyName !== "height" || e.target !== rootRef.current) return;

		setAnimatedHeight(active ? "auto" : null);
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
			rootEl.style.height = "";
			setAnimatedHeight(active ? "auto" : null);
		};

		if (!mountedRef.current || !checkTransitions()) {
			settle();
			return;
		}

		const currentHeight = rootEl.clientHeight;

		if (active) rootEl.style.height = "auto";
		const targetHeight = active ? rootEl.clientHeight : 0;

		if (targetHeight === currentHeight) {
			settle();
			return;
		}

		rootEl.style.height = `${currentHeight}px`;

		frameRef.current = requestAnimationFrame(() => {
			frameRef.current = null;
			setAnimatedHeight(targetHeight);
		});
	}, [active]);

	return (
		<div
			{...attributes}
			className={contentClassNames}
			ref={rootRef}
			style={
				animatedHeight !== null
					? { height: animatedHeight, overflow: animatedHeight === "auto" ? "visible" : undefined }
					: undefined
			}
			onTransitionEnd={handleTransitionEnd}
			// oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
			role="region"
			hidden={!active && animatedHeight === null}
		>
			{children}
		</div>
	);
};

Expandable.displayName = "Expandable";

export default Expandable;
