"use client";

import React from "react";

import { focusableSelector } from "utilities/a11y";
import { classNames } from "utilities/props";

import ToastContext from "./Toast.context";
import s from "./Toast.module.css";
import * as T from "./Toast.types";
import ToastContainer from "./ToastContainer";

const ToastRegion: React.FC<T.RegionProps> = (props) => {
	const { position, nested } = props;
	const { queues, options } = React.useContext(ToastContext);
	const [inspecting, setInspecting] = React.useState(false);
	const ignoreHoverRef = React.useRef(false);
	const rootRef = React.useRef<HTMLUListElement>(null);
	const queue = queues[position];
	const { width, expanded } = options?.[position] || {};
	const regionClassNames = classNames(
		s.region,
		s[`region--position-${position}`],
		nested && s["region--nested"]
	);
	const filteredLength = queue.filter((item) => item.status === "entered").length;
	let hiddenCount = 0;

	// If touch event was triggered – ignore hover events
	const handleTouchStart = () => {
		ignoreHoverRef.current = true;
	};

	const handleClick = (e: React.MouseEvent) => {
		let currentEl = e.target as Element | null;
		let isFocusable = false;

		while (currentEl && currentEl !== rootRef.current && !isFocusable) {
			isFocusable = currentEl.matches(focusableSelector);
			currentEl = currentEl.parentElement;
		}

		// Change inspecting mode when clicking on static content
		if (!isFocusable) {
			setInspecting((prevInspecting) => !prevInspecting);
		}

		// Click is called last so we reset our hover events ignore
		ignoreHoverRef.current = false;
	};

	const handleMouseEnter = () => {
		if (ignoreHoverRef.current) return;
		setInspecting(true);
	};

	const handleMouseLeave = () => {
		if (ignoreHoverRef.current) return;
		setInspecting(false);
	};

	React.useEffect(() => {
		if (queue.length === 0) setInspecting(false);
	}, [queue.length]);

	if (!queue.length) return null;

	return (
		// We only use onClick for touch devices since touchend is not supported
		// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
		<ul
			role="region"
			aria-live="polite"
			className={regionClassNames}
			ref={rootRef}
			onTouchStart={handleTouchStart}
			onClick={handleClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{ width }}
		>
			{queue.map((data, index) => {
				const visibleIndex = filteredLength - index + hiddenCount - 1;
				// eslint-disable-next-line react-hooks/immutability
				if (data.status !== "entered") hiddenCount += 1;

				return (
					<ToastContainer
						key={data.id}
						{...data}
						index={visibleIndex}
						inspected={inspecting || !!expanded}
					/>
				);
			})}
		</ul>
	);
};

ToastRegion.displayName = "ToastRegion";

export default ToastRegion;
