"use client";

import React from "react";

import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import { onNextFrame } from "utilities/animation";
import { classNames } from "utilities/props";

import s from "./Expandable.module.css";
import * as T from "./Expandable.types";

const Expandable: React.FC<T.ContentProps> = (props) => {
	const { children, active, attributes } = props;
	const rootRef = React.useRef<HTMLDivElement>(null);
	const mountedRef = React.useRef(false);
	const [animatedHeight, setAnimatedHeight] = React.useState<React.CSSProperties["height"] | null>(
		active ? "auto" : null
	);
	const contentClassNames = classNames(
		s.root,
		// eslint-disable-next-line react-hooks/refs
		mountedRef.current && animatedHeight !== "auto" && s["--animated"]
	);

	const handleTransitionEnd = (e: React.TransitionEvent) => {
		if (e.propertyName !== "height") return;

		setAnimatedHeight(active ? "auto" : null);
	};

	// Avoid animations happening if component is active by default
	// onNextFrame lets us wait for the component to render first
	React.useEffect(() => {
		onNextFrame(() => {
			mountedRef.current = true;
		});
	}, []);

	useIsomorphicLayoutEffect(() => {
		const rootEl = rootRef.current;
		if (!rootEl || !mountedRef.current) return;

		if (active) {
			rootEl.style.height = "auto";

			requestAnimationFrame(() => {
				const targetHeight = rootEl.clientHeight;
				rootEl.style.height = "0";

				requestAnimationFrame(() => {
					setAnimatedHeight(targetHeight);
				});
			});
		} else {
			rootEl.style.height = `${rootEl.clientHeight}px`;

			requestAnimationFrame(() => {
				setAnimatedHeight(0);
			});
		}
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
			role="region"
			hidden={!active && animatedHeight === null}
		>
			{children}
		</div>
	);
};

Expandable.displayName = "Expandable";

export default Expandable;
