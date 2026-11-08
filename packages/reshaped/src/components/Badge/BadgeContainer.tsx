"use client";

import React from "react";
import { classNames } from "@reshaped/utilities";

import BadgeCutoutContext from "./Badge.context";
import type * as T from "./Badge.types";
import s from "./Badge.module.css";

const BadgeContainer: React.FC<T.ContainerProps> = (props) => {
	const { children, position = "top-end", overlap, cutout, className, attributes } = props;
	const containerRef = React.useRef<HTMLDivElement>(null);
	const rootClassNames = classNames(
		s.container,
		className,
		overlap && s["--container-overlap"],
		cutout && s["--container-cutout"],
		position && s[`--container-position-${position}`]
	);

	return (
		<BadgeCutoutContext.Provider value={cutout ? containerRef : null}>
			<div {...attributes} ref={containerRef} className={rootClassNames}>
				{children}
			</div>
		</BadgeCutoutContext.Provider>
	);
};

BadgeContainer.displayName = "Badge.Container";

export default BadgeContainer;
