"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import { onNextFrame } from "utilities/animation";
import AccordionContext from "./Accordion.context";
import * as T from "./Accordion.types";
import s from "./Accordion.module.css";

const AccordionContent = (props: T.ContentProps) => {
	const { children } = props;
	const { active, triggerId, contentId } = React.useContext(AccordionContext);
	const contentRef = React.useRef<HTMLDivElement>(null);
	const mountedRef = React.useRef(false);
	const [animatedHeight, setAnimatedHeight] = React.useState<React.CSSProperties["height"] | null>(
		active ? "auto" : null
	);
	const contentClassNames = classNames(
		s.content,
		mountedRef.current && animatedHeight !== "auto" && s["content--animated"],
		active && s["content--active"]
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
		const contentEl = contentRef.current;
		if (!contentEl || !mountedRef.current) return;

		let targetHeight: React.CSSProperties["height"] = 0;

		if (active) {
			contentEl.style.height = "auto";
			targetHeight = contentEl.clientHeight;
			contentEl.style.height = "0";
		}

		if (!active) {
			contentEl.style.height = `${contentEl.clientHeight}px`;
		}

		setAnimatedHeight(targetHeight);
	}, [active]);

	return (
		<div
			className={contentClassNames}
			ref={contentRef}
			style={
				animatedHeight !== null
					? { height: animatedHeight, overflow: animatedHeight === "auto" ? "visible" : undefined }
					: undefined
			}
			onTransitionEnd={handleTransitionEnd}
			aria-labelledby={triggerId}
			id={contentId}
			role="region"
			hidden={!active && animatedHeight === null}
		>
			{children}
		</div>
	);
};

export default AccordionContent;
