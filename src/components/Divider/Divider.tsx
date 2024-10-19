import type React from "react";
import { classNames, responsiveClassNames } from "utilities/helpers";
import Text from "components/Text";
import type * as T from "./Divider.types";
import s from "./Divider.module.css";

const Divider = (props: T.Props) => {
	const { vertical, blank, children, contentPosition = "center", className, attributes } = props;
	const rootClassNames = classNames(
		s.root,
		className,
		blank && s["--blank"],
		children ? s[`--content-position-${contentPosition}`] : undefined,
		...responsiveClassNames(s, "--vertical", vertical)
	);

	// Only support aria-orientation for non-responsive dividers
	let ariaOrientation: React.AriaAttributes["aria-orientation"];
	if (typeof vertical === "boolean" || vertical === undefined) {
		ariaOrientation = vertical ? "vertical" : "horizontal";
	}

	return (
		<div
			{...attributes}
			role="separator"
			aria-orientation={ariaOrientation}
			className={rootClassNames}
		>
			{children && (
				<Text color="neutral-faded" variant="caption-1" className={s.label}>
					{children}
				</Text>
			)}
		</div>
	);
};

export default Divider;
