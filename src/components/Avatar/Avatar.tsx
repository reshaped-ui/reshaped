import { classNames, responsivePropDependency } from "utilities/helpers";
import getHeightStyles from "styles/height";
import Icon from "components/Icon";
import View from "components/View";
import type * as T from "./Avatar.types";
import s from "./Avatar.module.css";

const Avatar = (props: T.Props) => {
	const {
		color = "neutral",
		variant,
		src,
		size = 12,
		squared,
		initials,
		icon,
		className,
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
	const heightStyles = getHeightStyles(size);
	const rootClassNames = classNames(
		s.root,
		className,
		heightStyles?.classNames,
		color && s[`--color-${color}`],
		variant && s[`--variant-${variant}`]
	);

	const renderContent = () => {
		if (src)
			return (
				<img
					{...imageAttributes}
					role={!alt ? "presentation" : undefined}
					src={src}
					alt={alt}
					className={s.img}
				/>
			);
		if (icon)
			return (
				<Icon svg={icon} size={responsivePropDependency(size, (size) => Math.ceil(size * 0.4))} />
			);
		return initials;
	};

	return (
		<View
			borderRadius={radius}
			attributes={{ ...attributes, style: { ...heightStyles?.variables } }}
			backgroundColor={variant === "faded" ? `${color}-${variant}` : color}
			className={rootClassNames}
		>
			{renderContent()}
		</View>
	);
};

Avatar.displayName = "Avatar";

export default Avatar;
