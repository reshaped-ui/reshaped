"use client";

import React from "react";
import { classNames } from "@reshaped/utilities";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import type * as T from "./Badge.types";
import s from "./Badge.module.css";

const cutoutProperties = [
	"--rs-badge-cutout-image",
	"--rs-badge-cutout-x",
	"--rs-badge-cutout-y",
	"--rs-badge-cutout-width",
	"--rs-badge-cutout-height",
] as const;

const getBadgeElement = (containerEl: HTMLElement) => {
	return Array.from(containerEl.children).find((el) => el.classList.contains(s.root)) as
		| HTMLElement
		| undefined;
};

const resetCutout = (containerEl: HTMLElement) => {
	cutoutProperties.forEach((property) => containerEl.style.removeProperty(property));
};

/**
 * Measures the badge and passes its shape to css as an svg mask layer,
 * so the content behind the badge gets a transparent gap around it
 */
const updateCutout = (containerEl: HTMLElement) => {
	const badgeEl = getBadgeElement(containerEl);

	if (!badgeEl) {
		resetCutout(containerEl);
		return;
	}

	const badgeStyle = getComputedStyle(badgeEl);
	// Registered as a <length> with @property, so it's always resolved to px
	const gap = parseFloat(getComputedStyle(containerEl).getPropertyValue("--rs-badge-cutout-size"));
	// Using layout size and position to ignore the badge scale transition
	const badgeWidth = badgeEl.offsetWidth;
	const badgeHeight = badgeEl.offsetHeight;
	const badgeRadius = Math.min(
		parseFloat(badgeStyle.borderTopLeftRadius) || 0,
		badgeWidth / 2,
		badgeHeight / 2
	);
	const translate =
		badgeStyle.transform && badgeStyle.transform !== "none"
			? new DOMMatrixReadOnly(badgeStyle.transform)
			: undefined;
	const width = badgeWidth + (gap || 0) * 2;
	const height = badgeHeight + (gap || 0) * 2;
	const radius = Math.min(badgeRadius + (gap || 0), width / 2, height / 2);
	const x = badgeEl.offsetLeft + badgeWidth / 2 + (translate?.e || 0);
	const y = badgeEl.offsetTop + badgeHeight / 2 + (translate?.f || 0);
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><rect width="${width}" height="${height}" rx="${radius}"/></svg>`;

	containerEl.style.setProperty(
		"--rs-badge-cutout-image",
		`url("data:image/svg+xml,${encodeURIComponent(svg)}")`
	);
	containerEl.style.setProperty("--rs-badge-cutout-x", `${x}px`);
	containerEl.style.setProperty("--rs-badge-cutout-y", `${y}px`);
	containerEl.style.setProperty("--rs-badge-cutout-width", `${width}px`);
	containerEl.style.setProperty("--rs-badge-cutout-height", `${height}px`);
};

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

	useIsomorphicLayoutEffect(() => {
		const containerEl = containerRef.current;
		if (!cutout || !containerEl) return;

		const resizeObserver = new ResizeObserver(() => updateCutout(containerEl));
		resizeObserver.observe(containerEl);
		resizeObserverRef.current = resizeObserver;

		return () => {
			resizeObserver.disconnect();
			resizeObserverRef.current = null;
			resetCutout(containerEl);
		};
	}, [cutout]);

	// Sync on every render to pick up badge changes that don't affect its size, like rounded or position
	useIsomorphicLayoutEffect(() => {
		const containerEl = containerRef.current;
		if (!cutout || !containerEl) return;

		const badgeEl = getBadgeElement(containerEl);
		if (badgeEl) resizeObserverRef.current?.observe(badgeEl);

		updateCutout(containerEl);
	});

	return (
		<div {...attributes} ref={containerRef} className={rootClassNames}>
			{children}
		</div>
	);
};

BadgeContainer.displayName = "Badge.Container";

export default BadgeContainer;
