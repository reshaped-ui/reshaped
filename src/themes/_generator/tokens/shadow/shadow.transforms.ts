import { hexToRgb } from "../../utilities/color";
import type { Transformer } from "../types";
import type * as T from "./shadow.types";

const transformedToken: Transformer<T.Token> = (name, token, theme) => [
	{
		name,
		tokenType: "shadow",
		type: "variable",
		value: token
			.map((value) => {
				const blur = ` ${value.blurRadius || 0}px`;
				const spread = ` ${value.spreadRadius || 0}px`;
				const colorRef = theme.color[value.colorToken];
				const rgb = hexToRgb(colorRef.hex);
				const rgbString = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
				const color = `rgba(${rgbString}, ${value.opacity || 1})`;

				return `${value.offsetX}px ${value.offsetY}px${blur}${spread} ${color}`;
			})
			.join(", "),
	},
];

export default transformedToken;
