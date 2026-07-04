import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import * as T from "@/styles/types";
import "./zIndex.css";

const zIndex: (value?: T.ZIndex) => {
	variables?: React.CSSProperties;
	classNames?: ClassName;
} = (value) => {
	if (value === undefined) return {};

	return {
		variables: {
			"--rs-z": typeof value === "number" ? value : `var(--rs-z-index-${value})`,
		} as React.CSSProperties,
	};
};

export default zIndex;
