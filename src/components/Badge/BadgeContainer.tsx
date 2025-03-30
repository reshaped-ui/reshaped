import { classNames } from "utilities/helpers";
import type * as T from "./Badge.types";
import s from "./Badge.module.css";

const BadgeContainer = (props: T.ContainerProps) => {
	const { children, position = "top-end", overlap, className, attributes } = props;
	const rootClassNames = classNames(
		s.container,
		className,
		overlap && s["--container-overlap"],
		position && s[`--container-position-${position}`]
	);

	return (
		<div {...attributes} className={rootClassNames}>
			{children}
		</div>
	);
};

BadgeContainer.displayName = "Badge.Container";

export default BadgeContainer;
