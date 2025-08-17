import { classNames, responsivePropDependency } from "utilities/props";
import { resolveMixin } from "styles/mixin";
import Icon from "components/Icon";
import View from "components/View";
import type * as T from "./Avatar.types";
import s from "./Avatar.module.css";

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
		imageAttributes: passedImageAttributes,
		attributes,
	} = props;
	const alt = props.alt || passedImageAttributes?.alt;
	const radius = squared
		? responsivePropDependency(size, (size) => {
				if (size >= 24) return "large";
				if (size >= 12) return "medium";
				return "small";
			})
		: "circular";
	const mixinStyles = resolveMixin({ height: size });
	const rootClassNames = classNames(
		s.root,
		className,
		mixinStyles?.classNames,
		color && s[`--color-${color}`],
		variant && s[`--variant-${variant}`]
	);

	const renderContent = () => {
		if (src) {
			/**
			 * Not all img attributes might be supported by custom Image components
			 * Here is an example from Next: https://nextjs.org/docs/pages/api-reference/components/image#required-props
			 */
			const imageAttributes = {
				...passedImageAttributes,
				role: !alt ? "presentation" : undefined,
				src: src ?? "",
				alt: alt ?? "",
				className: s.img,
			};

			// eslint-disable-next-line jsx-a11y/alt-text
			return renderImage ? renderImage(imageAttributes) : <img {...imageAttributes} />;
		}

		if (icon) {
			return (
				<Icon svg={icon} size={responsivePropDependency(size, (size) => Math.ceil(size * 0.4))} />
			);
		}
		return initials;
	};

	return (
		<View
			borderRadius={radius}
			attributes={{ ...attributes, style: { ...mixinStyles?.variables } }}
			backgroundColor={variant === "faded" ? `${color}-${variant}` : color}
			className={rootClassNames}
		>
			{renderContent()}
		</View>
	);
};

Avatar.displayName = "Avatar";

export default Avatar;
