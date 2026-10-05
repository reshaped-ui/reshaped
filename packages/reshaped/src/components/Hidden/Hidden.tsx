import { classNames } from "@reshaped/utilities";

import { responsiveClassNames } from "@/utilities/props.js";
import type * as T from "./Hidden.types.js";
import s from "./Hidden.module.css";

const Hidden: React.FC<T.Props> = (props) => {
	const { as: TagName = "div", children, visibility, hide } = props;
	const rootClassNames = classNames(
		s.root,
		...responsiveClassNames(s, "--hidden", hide),
		visibility && s["--visibility"]
	);

	return <TagName className={rootClassNames}>{children}</TagName>;
};

Hidden.displayName = "Hidden";

export default Hidden;
