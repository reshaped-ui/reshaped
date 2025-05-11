import { classNames } from "utilities/props";
import View from "components/View";
import type * as T from "./ActionBar.types";
import s from "./ActionBar.module.css";

const ActionBar: React.FC<T.Props> = (props) => {
	const {
		position = "bottom",
		padding,
		paddingBlock = 3,
		paddingInline = 4,
		children,
		elevated,
		className,
		attributes,
	} = props;
	const rootClassNames = classNames(
		s.root,
		elevated && s["--elevated"],
		position && s[`--position-${position}`],
		className
	);

	return (
		<View
			className={rootClassNames}
			attributes={attributes}
			paddingBlock={padding || paddingBlock}
			paddingInline={padding || paddingInline}
		>
			{children}
		</View>
	);
};

ActionBar.displayName = "ActionBar";

export default ActionBar;
