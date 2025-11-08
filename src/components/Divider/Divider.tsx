import Text from "components/Text";
import { classNames, responsiveClassNames } from "utilities/props";

import s from "./Divider.module.css";

import type * as T from "./Divider.types";
import type React from "react";
import type * as G from "types/global";

const Divider: React.FC<T.Props> = (props) => {
	const {
		vertical,
		blank,
		children,
		contentPosition = "center",
		color,
		offset,
		className,
		attributes,
	} = props;
	const rootClassNames = classNames(
		s.root,
		className,
		blank && s["--blank"],
		color && s[`--color-${color}`],
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
			style={{ ...attributes?.style, "--rs-divider-offset": offset } as G.StyleAttribute}
		>
			{children && (
				<Text color="neutral-faded" variant="caption-1" className={s.label}>
					{children}
				</Text>
			)}
		</div>
	);
};

Divider.displayName = "Divider";

export default Divider;
