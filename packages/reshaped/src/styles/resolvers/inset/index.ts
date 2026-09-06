import { responsiveClassNames, responsiveVariables } from "@/utilities/props";
import * as T from "@/styles/types";
import s from "./inset.module.css";
import "./inset.css";

const inset: T.StyleResolver<T.InsetAxis> = (value) => {
	if (value === undefined) return {};
	// Insetting all sides is sugar for insetting both axes, which also lets
	// `inset="center"` reuse the per-axis centering classes for both directions
	const inlineClassNames = responsiveClassNames(
		s,
		(value) => (value === "center" ? "--inline-center" : "--inline-unit"),
		value,
		{ excludeValueFromClassName: true }
	);
	const blockClassNames = responsiveClassNames(
		s,
		(value) => (value === "center" ? "--block-center" : "--block-unit"),
		value,
		{ excludeValueFromClassName: true }
	);

	return {
		classNames: [s.root, inlineClassNames, blockClassNames],
		variables: {
			...responsiveVariables("--rs-inset-inline", value),
			...responsiveVariables("--rs-inset-block", value),
		},
	};
};

export const insetTop: T.StyleResolver<T.Inset> = (value) => {
	if (value === undefined) return {};
	return { variables: responsiveVariables("--rs-inset-top", value) };
};

export const insetBottom: T.StyleResolver<T.Inset> = (value) => {
	if (value === undefined) return {};
	return { variables: responsiveVariables("--rs-inset-bottom", value) };
};

export const insetStart: T.StyleResolver<T.Inset> = (value) => {
	if (value === undefined) return {};
	return { variables: responsiveVariables("--rs-inset-start", value) };
};

export const insetEnd: T.StyleResolver<T.Inset> = (value) => {
	if (value === undefined) return {};
	return { variables: responsiveVariables("--rs-inset-end", value) };
};

export const insetInline: T.StyleResolver<T.InsetAxis> = (value) => {
	if (value === undefined) return {};
	const classNames = responsiveClassNames(
		s,
		(value) => (value === "center" ? "--inline-center" : "--inline-unit"),
		value,
		{ excludeValueFromClassName: true }
	);

	return {
		classNames: [s.root, classNames],
		variables: responsiveVariables("--rs-inset-inline", value),
	};
};

export const insetBlock: T.StyleResolver<T.InsetAxis> = (value) => {
	if (value === undefined) return {};
	const classNames = responsiveClassNames(
		s,
		(value) => (value === "center" ? "--block-center" : "--block-unit"),
		value,
		{ excludeValueFromClassName: true }
	);

	return {
		classNames: [s.root, classNames],
		variables: responsiveVariables("--rs-inset-block", value),
	};
};

export default inset;
