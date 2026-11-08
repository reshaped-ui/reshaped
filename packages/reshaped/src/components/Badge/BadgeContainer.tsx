"use client";

import React from "react";
import { classNames } from "@reshaped/utilities";

import BadgeContainerContext from "./Badge.context";
import type * as T from "./Badge.types";
import s from "./Badge.module.css";

const BadgeContainer: React.FC<T.ContainerProps> = (props) => {
	const { children, position = "top-end", overlap, className, attributes } = props;
	const containerRef = React.useRef<HTMLDivElement>(null);
	const rootClassNames = classNames(
		s.container,
		className,
		overlap && s["--container-overlap"],
		position && s[`--container-position-${position}`]
	);

	return (
		<BadgeContainerContext.Provider value={containerRef}>
			<div {...attributes} ref={containerRef} className={rootClassNames}>
				{children}
			</div>
		</BadgeContainerContext.Provider>
	);
};

BadgeContainer.displayName = "Badge.Container";

export default BadgeContainer;
