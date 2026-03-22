import align from "@/styles/resolvers/align";
import aspectRatio from "@/styles/resolvers/aspectRatio";
import bleed from "@/styles/resolvers/bleed";
import border, {
	borderBlock,
	borderBottom,
	borderColor,
	borderEnd,
	borderInline,
	borderStart,
	borderTop,
} from "@/styles/resolvers/border";
import height from "@/styles/resolvers/height";
import inset, {
	insetBlock,
	insetBottom,
	insetEnd,
	insetInline,
	insetStart,
	insetTop,
} from "@/styles/resolvers/inset";
import justify from "@/styles/resolvers/justify";
import maxHeight from "@/styles/resolvers/maxHeight";
import maxWidth from "@/styles/resolvers/maxWidth";
import minHeight from "@/styles/resolvers/minHeight";
import minWidth from "@/styles/resolvers/minWidth";
import padding, {
	paddingBlock,
	paddingBottom,
	paddingEnd,
	paddingInline,
	paddingStart,
	paddingTop,
} from "@/styles/resolvers/padding";
import position from "@/styles/resolvers/position";
import radius from "@/styles/resolvers/radius";
import shadow from "@/styles/resolvers/shadow";
import textAlign from "@/styles/resolvers/textAlign";
import width from "@/styles/resolvers/width";

import type { Mixin } from "@/styles/types";
import type { ClassName } from "@reshaped/headless";

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

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore - too complex to resolve inference without manual typing every method
		const result = mixin(value);

		if (result.variables) output.variables = { ...output.variables, ...result.variables };
		if (result.classNames) output.classNames.push(result.classNames);
	});

	return output;
};
