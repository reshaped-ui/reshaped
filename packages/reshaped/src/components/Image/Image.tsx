"use client";

import React from "react";
import { classNames } from "@reshaped/utilities";

import { resolveMixin } from "@/styles/mixin";
import * as T from "./Image.types";
import s from "./Image.module.css";

const Image: React.FC<T.Props> = (props) => {
	const {
		src,
		alt,
		width,
		maxWidth,
		height,
		aspectRatio,
		onLoad,
		onError,
		fallback,
		outline,
		displayMode = "cover",
		borderRadius,
		className,
		attributes,
		imageAttributes: passedImageAttributes,
		renderImage,
	} = props;
	const [status, setStatus] = React.useState("loading");
	// Image attributes are merged on top of the root attributes when rendering the image element
	const passedImageRef = passedImageAttributes?.ref ?? attributes?.ref;
	const mixinStyles = resolveMixin({ radius: borderRadius, width, height, maxWidth, aspectRatio });
	const rootClassNames = classNames(
		s.root,
		mixinStyles.classNames,
		outline && s["--outline"],
		className
	);
	const imageClassNames = classNames([
		s.image,
		displayMode && s[`image--display-mode-${displayMode}`],
	]);
	const isFallback = (status === "error" || !src) && !!fallback;
	const style = {
		...attributes?.style,
		...mixinStyles.variables,
	} as React.CSSProperties;

	const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		setStatus("success");
		onLoad?.(e);
		passedImageAttributes?.onLoad?.(e);
	};

	const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		setStatus("error");
		onError?.(e);
		passedImageAttributes?.onError?.(e);
	};

	const handleImageRef = React.useCallback(
		(el: HTMLImageElement | null) => {
			if (typeof passedImageRef === "function") passedImageRef(el);
			else if (passedImageRef) passedImageRef.current = el;

			// Server rendered images start loading before React hydrates,
			// so their error event can fire before the error handler gets attached
			if (!el || !src || !el.complete || el.naturalWidth > 0) return;

			// Images without intrinsic dimensions, like svg with a viewBox only,
			// are decoded successfully, while broken images reject the promise
			el.decode().catch(() => setStatus("error"));
		},
		[passedImageRef, src]
	);

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
				className: rootClassNames,
				style,
			};

			// oxlint-disable-next-line jsx_a11y/alt-text
			return renderImage ? renderImage(imageAttributes) : <img {...imageAttributes} />;
		}

		return (
			<div {...attributes} className={classNames([s.fallback, rootClassNames])} style={style}>
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
		ref: handleImageRef,
		className: outline ? imageClassNames : classNames([imageClassNames, rootClassNames]),
		style,
	};

	// eslint-disable-next-line jsx-a11y/alt-text
	const imageNode = renderImage ? renderImage(imageAttributes) : <img {...imageAttributes} />;

	return outline ? (
		<div {...attributes} className={rootClassNames} style={style}>
			{imageNode}
		</div>
	) : (
		imageNode
	);
};

Image.displayName = "Image";

export default Image;
