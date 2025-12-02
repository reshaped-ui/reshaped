import { classNames, responsiveClassNames } from "utilities/props";

import s from "./Hidden.module.css";

import type * as T from "./Hidden.types";

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
