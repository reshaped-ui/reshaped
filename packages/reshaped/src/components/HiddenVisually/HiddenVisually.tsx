import s from "./HiddenVisually.module.css";

import type * as T from "./HiddenVisually.types";

const HiddenVisually: React.FC<T.Props> = (props) => {
	const { children } = props;

	return <div className={s.root}>{children}</div>;
};

HiddenVisually.displayName = "HiddenVisually";

export default HiddenVisually;
