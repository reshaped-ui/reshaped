import { hexToRgbString } from "../../../utilities/color";
import type * as T from "./shadow.types";
import { Transformer } from "../types";

const transformedToken: Transformer<T.Token> = (name, token, theme) => [
	{
		name,
		tokenType: "shadow",
		type: "variable",
		value: token
			.map((value) => {
				const blur = value.blurRadius ? ` ${value.blurRadius}px` : "";
				const spread = value.spreadRadius ? ` ${value.spreadRadius}px` : "";
				const colorRef = theme.color[value.colorToken];
				const color = `rgba(${hexToRgbString(colorRef.hex)}, ${value.opacity || 1})`;

				return `${value.offsetX}px ${value.offsetY}px${blur}${spread} ${color}`;
			})
			.join(", "),
	},
];

export default transformedToken;
