import * as T from "styles/types";
import {
	responsiveClassNames,
	responsivePropDependency,
	responsiveVariables,
} from "utilities/props";

import s from "./border.module.css";
import "./borderWidth.css";

const border: T.StyleResolver<T.Border> = (value) => {
	if (!value) return {};
	return {
		variables: responsiveVariables(
			"--rs-border-w",
			responsivePropDependency(value, (value) => {
				return value ? "1px" : "0px";
			})
		),
	};
};

export const borderTop: T.StyleResolver<T.Border> = (value) => {
	if (!value) return {};
	return {
		variables: responsiveVariables(
			"--rs-border-w-top",
			responsivePropDependency(value, (value) => {
				return value ? "1px" : "0px";
			})
		),
	};
};

export const borderBottom: T.StyleResolver<T.Border> = (value) => {
	if (!value) return {};
	return {
		variables: responsiveVariables(
			"--rs-border-w-bottom",
			responsivePropDependency(value, (value) => {
				return value ? "1px" : "0px";
			})
		),
	};
};

export const borderStart: T.StyleResolver<T.Border> = (value) => {
	if (!value) return {};
	return {
		variables: responsiveVariables(
			"--rs-border-w-start",
			responsivePropDependency(value, (value) => {
				return value ? "1px" : "0px";
			})
		),
	};
};

export const borderEnd: T.StyleResolver<T.Border> = (value) => {
	if (!value) return {};
	return {
		variables: responsiveVariables(
			"--rs-border-w-end",
			responsivePropDependency(value, (value) => {
				return value ? "1px" : "0px";
			})
		),
	};
};

export const borderBlock: T.StyleResolver<T.Border> = (value) => {
	if (!value) return {};
	return {
		variables: responsiveVariables(
			"--rs-border-w-block",
			responsivePropDependency(value, (value) => {
				return value ? "1px" : "0px";
			})
		),
	};
};

export const borderInline: T.StyleResolver<T.Border> = (value) => {
	if (!value) return {};
	return {
		variables: responsiveVariables(
			"--rs-border-w-inline",
			responsivePropDependency(value, (value) => {
				return value ? "1px" : "0px";
			})
		),
	};
};

export const borderColor: T.StyleResolver<T.BorderColor> = (value) => {
	if (!value) return {};

	return {
		classNames: responsiveClassNames(s, "--border", value),
	};
};

export default border;
