import type { ClassName } from "@reshaped/utilities";

import align from "@/styles/resolvers/align/index.js";
import aspectRatio from "@/styles/resolvers/aspectRatio/index.js";
import bleed from "@/styles/resolvers/bleed/index.js";
import border, {
	borderBlock,
	borderBottom,
	borderColor,
	borderEnd,
	borderInline,
	borderStart,
	borderTop,
} from "@/styles/resolvers/border/index.js";
import height from "@/styles/resolvers/height/index.js";
import inset, {
	insetBlock,
	insetBottom,
	insetEnd,
	insetInline,
	insetStart,
	insetTop,
} from "@/styles/resolvers/inset/index.js";
import justify from "@/styles/resolvers/justify/index.js";
import maxHeight from "@/styles/resolvers/maxHeight/index.js";
import maxWidth from "@/styles/resolvers/maxWidth/index.js";
import minHeight from "@/styles/resolvers/minHeight/index.js";
import minWidth from "@/styles/resolvers/minWidth/index.js";
import padding, {
	paddingBlock,
	paddingBottom,
	paddingEnd,
	paddingInline,
	paddingStart,
	paddingTop,
} from "@/styles/resolvers/padding/index.js";
import position from "@/styles/resolvers/position/index.js";
import radius from "@/styles/resolvers/radius/index.js";
import shadow from "@/styles/resolvers/shadow/index.js";
import textAlign from "@/styles/resolvers/textAlign/index.js";
import width from "@/styles/resolvers/width/index.js";
import zIndex from "@/styles/resolvers/zIndex/index.js";
import type { Mixin } from "@/styles/types.js";

const mixinMap = {
	align,
	aspectRatio,
	bleed,
	border,
	borderTop,
	borderBottom,
	borderStart,
	borderEnd,
	borderInline,
	borderBlock,
	borderColor,
	height,
	padding,
	paddingTop,
	paddingBottom,
	paddingStart,
	paddingEnd,
	paddingInline,
	paddingBlock,
	inset,
	insetTop,
	insetBottom,
	insetStart,
	insetEnd,
	insetInline,
	insetBlock,
	justify,
	maxHeight,
	maxWidth,
	minHeight,
	minWidth,
	position,
	radius,
	textAlign,
	width,
	shadow,
	zIndex,
};

export const resolveMixin = (mixin: Mixin) => {
	const output = {
		variables: {} as React.CSSProperties,
		classNames: [] as ClassName[],
	};
	const entries = Object.entries(mixin);
	entries.forEach(([key, value]) => {
		if (value === undefined) return;
		const mixin = mixinMap[key as keyof typeof mixinMap];

		// @ts-ignore - too complex to resolve inference without manual typing every method
		const result = mixin(value);

		if (result.variables) output.variables = { ...output.variables, ...result.variables };
		if (result.classNames) output.classNames.push(result.classNames);
	});

	return output;
};
