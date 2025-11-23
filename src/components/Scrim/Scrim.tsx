import View from "components/View";
import { classNames } from "utilities/props";

import s from "./Scrim.module.css";

import type * as T from "./Scrim.types";

const Scrim: React.FC<T.Props> = (props) => {
	const {
		children,
		backgroundSlot,
		position = "cover",
		paddingInline,
		paddingBlock,
		padding,
		borderRadius,
		attributes,
		className,
		scrimClassName,
	} = props;
	const rootClassNames = classNames(s.root, position && s[`--position-${position}`], className);
	const scrimClassNames = classNames(s.scrim, scrimClassName);

	return (
		<View
			borderRadius={borderRadius}
			attributes={attributes}
			className={rootClassNames}
			position={backgroundSlot ? "relative" : "absolute"}
			inset={backgroundSlot ? undefined : 0}
			overflow="hidden"
		>
			{backgroundSlot}
			<div className={scrimClassNames}>
				<View
					paddingInline={paddingInline ?? padding ?? 4}
					paddingBlock={paddingBlock ?? padding ?? 3}
					zIndex={5}
					height={["start", "end"].includes(position) ? "100%" : undefined}
					width={["top", "bottom", "cover"].includes(position) ? "100%" : undefined}
					textAlign={position === "cover" ? "center" : undefined}
				>
					{children}
				</View>
			</div>
		</View>
	);
};

Scrim.displayName = "Scrim";

export default Scrim;
