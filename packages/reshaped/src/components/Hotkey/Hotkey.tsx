import Text from "components/Text";
import { classNames } from "utilities/props";

import s from "./Hotkey.module.css";

import type * as T from "./Hotkey.types";

const Hotkey: React.FC<T.Props> = (props) => {
	const { children, active, className, attributes } = props;
	const rootClassNames = classNames(s.root, active && s["--active"], className);

	return (
		<Text
			as="kbd"
			variant="caption-1"
			weight="medium"
			color="neutral-faded"
			className={rootClassNames}
			attributes={attributes}
		>
			{children}
		</Text>
	);
};

Hotkey.displayName = "Hotkey";

export default Hotkey;
