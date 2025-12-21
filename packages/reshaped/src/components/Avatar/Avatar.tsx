import Icon from "components/Icon";
import Image, { type ImageProps } from "components/Image";
import View from "components/View";
import { resolveMixin } from "styles/mixin";
import { classNames, responsivePropDependency } from "utilities/props";

import s from "./Avatar.module.css";

import type * as T from "./Avatar.types";

const Avatar: React.FC<T.Props> = (props) => {
	const {
		color = "neutral",
		variant,
		src,
		size = 12,
		squared,
		initials,
		icon,
		className,
		renderImage,
		imageAttributes,
		attributes,
	} = props;
	const alt = props.alt || imageAttributes?.alt;
	const radius = squared
		? responsivePropDependency(size, (size) => {
				if (size >= 24) return "large";
				if (size >= 12) return "medium";
				return "small";
			})
		: "circular";

	if (src) {
		return (
			<Image
				src={src}
				alt={alt}
				renderImage={renderImage}
				outline
				borderRadius={radius}
				width={size}
				aspectRatio={1}
				className={className}
				attributes={attributes as ImageProps["attributes"]}
				imageAttributes={imageAttributes}
			/>
		);
	}

	const mixinStyles = resolveMixin({ height: size });
	const rootClassNames = classNames(
		s.root,
		className,
		mixinStyles?.classNames,
		color && s[`--color-${color}`],
		variant && s[`--variant-${variant}`]
	);

	return (
		<View
			borderRadius={radius}
			attributes={{ ...attributes, style: { ...mixinStyles?.variables } }}
			backgroundColor={variant === "faded" ? `${color}-${variant}` : color}
			className={rootClassNames}
		>
			{icon ? (
				<Icon svg={icon} size={responsivePropDependency(size, (size) => Math.ceil(size * 0.4))} />
			) : (
				initials
			)}
		</View>
	);
};

Avatar.displayName = "Avatar";

export default Avatar;
