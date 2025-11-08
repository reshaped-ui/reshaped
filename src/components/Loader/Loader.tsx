import { classNames, responsiveClassNames } from "utilities/props";

import s from "./Loader.module.css";

import type * as T from "./Loader.types";

const Loader: React.FC<T.Props> = (props) => {
	const { size = "small", color = "primary", className, attributes } = props;
	const ariaLabel = props.ariaLabel || attributes?.["aria-label"];
	const rootClassNames = classNames(
		s.root,
		className,
		responsiveClassNames(s, "--size", size),
		color && s[`--color-${color}`]
	);

	return (
		<span
			{...attributes}
			role="progressbar"
			aria-live={ariaLabel ? "assertive" : undefined}
			aria-label={ariaLabel}
			className={rootClassNames}
		>
			<span className={s.inner} />
		</span>
	);
};

Loader.displayName = "Loader";

export default Loader;
