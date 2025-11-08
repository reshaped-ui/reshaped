import * as T from "styles/types";
import { responsiveVariables } from "utilities/props";
import "./inset.css";

const inset: T.StyleResolver<T.Inset> = (value) => {
	if (value === undefined) return {};
	return { variables: responsiveVariables("--rs-inset", value) };
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

export const insetInline: T.StyleResolver<T.Inset> = (value) => {
	if (value === undefined) return {};
	return { variables: responsiveVariables("--rs-inset-inline", value) };
};

export const insetBlock: T.StyleResolver<T.Inset> = (value) => {
	if (value === undefined) return {};
	return { variables: responsiveVariables("--rs-inset-block", value) };
};

export default inset;
