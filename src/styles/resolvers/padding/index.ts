import * as T from "styles/types";
import { responsiveVariables } from "utilities/props";
import "./padding.css";

const padding: T.StyleResolver<T.Padding> = (value) => {
	if (!value) return {};
	return { variables: responsiveVariables("--rs-p", value) };
};

export const paddingTop: T.StyleResolver<T.Padding> = (value) => {
	if (value === undefined) return {};
	return { variables: responsiveVariables("--rs-p-top", value) };
};

export const paddingBottom: T.StyleResolver<T.Padding> = (value) => {
	if (value === undefined) return {};
	return { variables: responsiveVariables("--rs-p-bottom", value) };
};

export const paddingStart: T.StyleResolver<T.Padding> = (value) => {
	if (value === undefined) return {};
	return { variables: responsiveVariables("--rs-p-start", value) };
};

export const paddingEnd: T.StyleResolver<T.Padding> = (value) => {
	if (value === undefined) return {};
	return { variables: responsiveVariables("--rs-p-end", value) };
};

export const paddingInline: T.StyleResolver<T.Padding> = (value) => {
	if (value === undefined) return {};
	return { variables: responsiveVariables("--rs-p-inline", value) };
};

export const paddingBlock: T.StyleResolver<T.Padding> = (value) => {
	if (value === undefined) return {};
	return { variables: responsiveVariables("--rs-p-block", value) };
};

export default padding;
