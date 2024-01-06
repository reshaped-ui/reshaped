import type * as T from "./HiddenVisually.types";
import s from "./HiddenVisually.module.css";

const HiddenVisually = (props: T.Props) => {
	const { children } = props;

	return <div className={s.root}>{children}</div>;
};

export default HiddenVisually;
