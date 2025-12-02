import { hexToOklch, oklchToRgb } from "../color/utilities/convert";

import type { Transformer } from "../types";
import type * as T from "./shadow.types";

const transformToken: Transformer<T.Token> = (name, token, { theme }) => [
	{
		name,
		tokenType: "shadow",
		type: "variable",
		value: token
			.map((value) => {
				const blur = ` ${value.blurRadius || 0}px`;
				const spread = ` ${value.spreadRadius || 0}px`;
				const colorRef = theme.color[value.colorToken];
				const rgb = oklchToRgb(hexToOklch(colorRef?.hex || "#000000"));
				const rgbString = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
				const color = `rgba(${rgbString}, ${value.opacity || 1})`;

				return `${value.offsetX}px ${value.offsetY}px${blur}${spread} ${color}`;
			})
			.join(", "),
	},
];

export default transformToken;
