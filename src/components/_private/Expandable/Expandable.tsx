"use client";

import React from "react";
import * as T from "./Expandable.types";
import s from "./Expandable.module.css";
import { classNames } from "utilities/helpers";
import { onNextFrame } from "utilities/animation";

const Expandable = (props: T.ContentProps) => {
	const { children, active, attributes } = props;
	const [animated, setAnimated] = React.useState(false);
	const rootClassNames = classNames(s.root, active && s["--active"]);

	const handleTransitionEnd = (e: React.TransitionEvent) => {
		if (e.propertyName !== "height") return;
		onNextFrame(() => {
			setAnimated(false);
		});
	};

	React.useEffect(() => {
		setAnimated(active || false);
	}, [active]);

	return (
		<div
			{...attributes}
			className={rootClassNames}
			onTransitionEnd={handleTransitionEnd}
			role="region"
			hidden={!active && !animated}
		>
			<div className={s.inner}>{children}</div>
		</div>
	);
};

export default Expandable;
