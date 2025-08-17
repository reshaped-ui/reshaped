import React from "react";
import { classNames } from "utilities/props";
import { resolveMixin } from "styles/mixin";
import type * as T from "./Icon.types";
import s from "./Icon.module.css";

const Icon: React.FC<T.Props> = (props) => {
	const { svg: Component, className, color, size = "1em", autoWidth, attributes } = props;
	const mixinStyles = resolveMixin({ height: size });
	const rootClassName = classNames(
		s.root,
		className,
		mixinStyles.classNames,
		color && s[`--color-${color}`],
		autoWidth && s["--auto"]
	);

	const icon = React.isValidElement(Component) ? Component : <Component />;
	const style = { ...attributes?.style, ...mixinStyles.variables };

	return (
		// All icons are decorative, a11y attributes should be set for buttons wrapping them
		<span {...attributes} aria-hidden="true" className={rootClassName} style={style}>
			{React.cloneElement(icon, { focusable: false })}
		</span>
	);
};

Icon.displayName = "Icon";

export default Icon;
