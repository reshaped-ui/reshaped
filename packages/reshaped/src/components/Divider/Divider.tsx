import type React from "react";
import { classNames } from "@reshaped/utilities";

import Text from "@/components/Text/index.js";
import { responsiveClassNames, responsivePropDependency } from "@/utilities/props.js";
import { resolveMixin } from "@/styles/mixin.js";
import type { StyleAttribute } from "@/types/global.js";
import type * as T from "./Divider.types.js";
import s from "./Divider.module.css";

const Divider: React.FC<T.Props> = (props) => {
	const {
		vertical,
		blank,
		children,
		contentPosition = "center",
		color,
		inset,
		className,
		attributes,
	} = props;
	const paddingDirection = responsivePropDependency(vertical, (value) =>
		value ? "paddingBlock" : "paddingInline"
	);
	const mixinStyles = resolveMixin({ [paddingDirection]: inset });

	const rootClassNames = classNames(
		s.root,
		className,
		blank && s["--blank"],
		color && s[`--color-${color}`],
		children ? s[`--content-position-${contentPosition}`] : undefined,
		...mixinStyles.classNames,
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
			// oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
			role="separator"
			aria-orientation={ariaOrientation}
			className={rootClassNames}
			style={{ ...attributes?.style, ...mixinStyles.variables } as StyleAttribute}
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
