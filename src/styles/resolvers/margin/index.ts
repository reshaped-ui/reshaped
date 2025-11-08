import * as T from "styles/types";
import { responsiveVariables } from "utilities/props";
import "./margin.css";

const margin: T.StyleResolver<T.Margin> = (value) => {
	if (!value) return {};
	return { variables: responsiveVariables("--rs-m", value) };
};

export const marginTop: T.StyleResolver<T.Margin> = (value) => {
	if (value === undefined) return {};
	return { variables: responsiveVariables("--rs-m-top", value) };
};

export const marginBottom: T.StyleResolver<T.Margin> = (value) => {
	if (value === undefined) return {};
	return { variables: responsiveVariables("--rs-m-bottom", value) };
};

export const marginStart: T.StyleResolver<T.Margin> = (value) => {
	if (value === undefined) return {};
	return { variables: responsiveVariables("--rs-m-start", value) };
};

export const marginEnd: T.StyleResolver<T.Margin> = (value) => {
	if (value === undefined) return {};
	return { variables: responsiveVariables("--rs-m-end", value) };
};

export const marginInline: T.StyleResolver<T.Margin> = (value) => {
	if (value === undefined) return {};
	return { variables: responsiveVariables("--rs-m-inline", value) };
};

export const marginBlock: T.StyleResolver<T.Margin> = (value) => {
	if (value === undefined) return {};
	return { variables: responsiveVariables("--rs-m-block", value) };
};

export default margin;
