"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import { onNextFrame } from "utilities/animation";
import * as T from "./Expandable.types";
import s from "./Expandable.module.css";

const Expandable = (props: T.ContentProps) => {
	const { children, active, attributes } = props;
	const rootRef = React.useRef<HTMLDivElement>(null);
	const mountedRef = React.useRef(false);
	const [animatedHeight, setAnimatedHeight] = React.useState<React.CSSProperties["height"] | null>(
		active ? "auto" : null
	);
	const contentClassNames = classNames(
		s.root,
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

	React.useEffect(() => {
		const rootEl = rootRef.current;
		if (!rootEl || !mountedRef.current) return;

		let targetHeight: React.CSSProperties["height"] = 0;

		if (active) {
			rootEl.style.height = "auto";
			targetHeight = rootEl.clientHeight;
			rootEl.style.height = "0";
		}

		if (!active) {
			rootEl.style.height = `${rootEl.clientHeight}px`;
		}

		setAnimatedHeight(targetHeight);
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

export default Expandable;
