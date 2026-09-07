"use client";

import React from "react";
import { classNames } from "@reshaped/utilities";

import Presence from "@/components/_private/Presence";
import type * as T from "./ContentToggle.types";
import s from "./ContentToggle.module.css";

const ContentToggle: React.FC<T.Props> = (props) => {
	const { children, id, direction = "end", className, attributes } = props;
	const rootClassName = classNames(s.root, s[`--direction-${direction}`], className);

	return (
		<Presence
			as="div"
			itemKey={id}
			className={rootClassName}
			attributes={attributes}
			enterClassName={s["--enter"]}
			exitClassName={s["--exit"]}
		>
			{children}
		</Presence>
	);
};

ContentToggle.displayName = "ContentToggle";

export default ContentToggle;
