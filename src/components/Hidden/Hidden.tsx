import { classNames, responsiveClassNames } from "utilities/helpers";
import type * as T from "./Hidden.types";
import s from "./Hidden.module.css";

const Hidden = (props: T.Props) => {
	const { as: TagName = "div", children, visibility, hide } = props;
	console.log(children);
	const rootClassNames = classNames(
		s.root,
		...responsiveClassNames(s, "--hidden", hide),
		visibility && s["--visibility"]
	);

	return <TagName className={rootClassNames}>{children}</TagName>;
};

export default Hidden;
