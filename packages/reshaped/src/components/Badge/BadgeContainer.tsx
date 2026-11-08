"use client";

import React from "react";
import { classNames } from "@reshaped/utilities";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import type * as T from "./Badge.types";
import s from "./Badge.module.css";

const BadgeContainer: React.FC<T.ContainerProps> = (props) => {
	const { children, position = "top-end", overlap, cutout, className, attributes } = props;
	const containerRef = React.useRef<HTMLDivElement>(null);
	const resizeObserverRef = React.useRef<ResizeObserver | null>(null);
	const rootClassNames = classNames(
		s.container,
		className,
		overlap && s["--container-overlap"],
		cutout && s["--container-cutout"],
		position && s[`--container-position-${position}`]
	);

	/**
	 * Css can't read the size of a sibling element, so the badge size is passed to the cutout mask.
	 * Border box size ignores the badge transforms, the rest of the cutout geometry is resolved in css.
	 */
	useIsomorphicLayoutEffect(() => {
		const containerEl = containerRef.current;
		if (!cutout || !containerEl) return;

		const resizeObserver = new ResizeObserver(([entry]) => {
			const { inlineSize, blockSize } = entry.borderBoxSize[0];

			containerEl.style.setProperty("--rs-badge-width", `${inlineSize}px`);
			containerEl.style.setProperty("--rs-badge-height", `${blockSize}px`);
		});

		resizeObserverRef.current = resizeObserver;

		return () => {
			resizeObserver.disconnect();
			resizeObserverRef.current = null;
			containerEl.style.removeProperty("--rs-badge-width");
			containerEl.style.removeProperty("--rs-badge-height");
		};
	}, [cutout]);

	// Badge can be conditionally rendered, so the observed element is synced on every render
	useIsomorphicLayoutEffect(() => {
		const badgeEl = containerRef.current?.querySelector(`:scope > .${s.root}`);
		if (badgeEl) resizeObserverRef.current?.observe(badgeEl);
	});

	return (
		<div {...attributes} ref={containerRef} className={rootClassNames}>
			{children}
		</div>
	);
};

BadgeContainer.displayName = "Badge.Container";

export default BadgeContainer;
