import type * as T from "./HiddenVisually.types";
import s from "./HiddenVisually.module.css";

const HiddenVisually: React.FC<T.Props> = (props) => {
	const { children } = props;

	return <div className={s.root}>{children}</div>;
};

HiddenVisually.displayName = "HiddenVisually";

export default HiddenVisually;
