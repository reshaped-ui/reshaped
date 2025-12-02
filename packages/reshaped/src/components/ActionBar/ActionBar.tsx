import View from "components/View";
import { classNames, responsiveVariables } from "utilities/props";

import s from "./ActionBar.module.css";

import type * as T from "./ActionBar.types";

const fullWidthPositions: T.Props["position"][] = ["top", "bottom"];

const ActionBar: React.FC<T.Props> = (props) => {
	const {
		position = "bottom",
		positionType: passedPositionType,
		offset: passedOffset,
		padding,
		paddingBlock = 3,
		paddingInline = 4,
		children,
		elevated,
		active = true,
		className,
		attributes,
	} = props;
	const positionType =
		passedPositionType ??
		(passedOffset ? "absolute" : fullWidthPositions.includes(position) ? "relative" : "absolute");
	const offset = passedOffset ?? (positionType === "relative" ? undefined : 4);
	const offsetVariables = offset && responsiveVariables("--rs-action-bar-offset", offset);
	const rootClassNames = classNames(
		s.root,
		(elevated || !!offsetVariables) && s["--elevated"],
		position && s[`--position-${position}`],
		active && s["--active"],
		className
	);

	return (
		<View
			className={rootClassNames}
			attributes={{
				...attributes,
				style: { ...attributes?.style, ...offsetVariables },
			}}
			position={positionType}
			paddingBlock={padding || paddingBlock}
			paddingInline={padding || paddingInline}
		>
			{children}
		</View>
	);
};

ActionBar.displayName = "ActionBar";

export default ActionBar;
