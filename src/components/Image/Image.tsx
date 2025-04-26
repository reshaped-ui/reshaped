"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import * as T from "./Image.types";
import s from "./Image.module.css";
import getRadiusStyles from "styles/radius";
import getWidthStyles from "styles/width";
import getHeightStyles from "styles/height";

const Image: React.FC<T.Props> = (props) => {
	const {
		src,
		alt,
		width,
		height,
		onLoad,
		onError,
		fallback,
		displayMode = "cover",
		borderRadius,
		className,
		attributes,
		imageAttributes: passedImageAttributes,
		renderImage,
	} = props;
	const [status, setStatus] = React.useState("loading");
	const radiusStyles = getRadiusStyles(borderRadius);
	const widthStyles = getWidthStyles(width);
	const heightStyles = getHeightStyles(height);
	const baseClassNames = classNames(
		s.root,
		radiusStyles?.classNames,
		widthStyles?.classNames,
		heightStyles?.classNames,
		displayMode && s[`--display-mode-${displayMode}`],
		className
	);
	const imgClassNames = classNames(s.image, baseClassNames);
	const fallbackClassNames = classNames(s.fallback, baseClassNames);
	const isFallback = (status === "error" || !src) && !!fallback;
	const style = {
		...attributes?.style,
		...widthStyles?.variables,
		...heightStyles?.variables,
	} as React.CSSProperties;

	const handleLoad = (e: React.SyntheticEvent) => {
		setStatus("success");
		onLoad?.(e);
	};

	const handleError = (e: React.SyntheticEvent) => {
		setStatus("error");
		onError?.(e);
	};

	React.useEffect(() => {
		setStatus("loading");
	}, [src]);

	if (isFallback) {
		if (typeof fallback === "string") {
			const imageAttributes = {
				...attributes,
				src: fallback ?? "",
				alt: alt ?? "",
				role: alt ? undefined : "presentation",
				className: fallbackClassNames,
				style,
			};

			// eslint-disable-next-line jsx-a11y/alt-text
			return renderImage ? renderImage(imageAttributes) : <img {...imageAttributes} />;
		}

		return (
			<div {...attributes} className={fallbackClassNames} style={style}>
				{fallback}
			</div>
		);
	}

	const imageAttributes = {
		...attributes,
		...passedImageAttributes,
		src: src ?? "",
		alt: alt ?? "",
		role: alt ? undefined : "presentation",
		onLoad: handleLoad,
		onError: handleError,
		className: imgClassNames,
		style,
	};

	// eslint-disable-next-line jsx-a11y/alt-text
	return renderImage ? renderImage(imageAttributes) : <img {...imageAttributes} />;
};

Image.displayName = "Image";

export default Image;
