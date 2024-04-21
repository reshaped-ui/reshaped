"use client";

import React from "react";
import * as T from "./Expandable.types";
import s from "./Expandable.module.css";
import { classNames } from "utilities/helpers";
import { onNextFrame } from "utilities/animation";

const Expandable = (props: T.ContentProps) => {
	const { children, active, attributes } = props;
	const [rendered, setRendered] = React.useState(active);
	const rootClassNames = classNames(
		s.root,
		active && rendered && s["--active"],
		!active && !rendered && s["--hidden"]
	);

	const handleTransitionEnd = (e: React.TransitionEvent) => {
		if (e.propertyName !== "height") return;
		if (active) return;

		onNextFrame(() => {
			setRendered(false);
		});
	};

	React.useEffect(() => {
		if (!active) return;
		setRendered(active);
	}, [active]);

	return (
		<div
			{...attributes}
			className={rootClassNames}
			onTransitionEnd={handleTransitionEnd}
			role="region"
			hidden={!active}
		>
			<div className={s.inner}>{children}</div>
		</div>
	);
};

export default Expandable;
