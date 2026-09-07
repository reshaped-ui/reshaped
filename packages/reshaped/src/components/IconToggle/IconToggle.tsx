"use client";

import React from "react";
import { classNames } from "@reshaped/utilities";

import Presence from "@/components/_private/Presence";
import Icon from "@/components/Icon";
import type * as T from "./IconToggle.types";
import s from "./IconToggle.module.css";

const IconToggle: React.FC<T.Props> = (props) => {
	const { id, className, attributes, ...iconProps } = props;
	const rootClassName = classNames(s.root, className);

	return (
		<Presence
			itemKey={id}
			className={rootClassName}
			attributes={attributes}
			itemClassName={s.item}
			enterClassName={s["--enter"]}
			exitClassName={s["--exit"]}
		>
			<Icon {...iconProps} />
		</Presence>
	);
};

IconToggle.displayName = "IconToggle";

export default IconToggle;
