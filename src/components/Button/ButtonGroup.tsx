import { classNames } from "utilities/helpers";
import type * as T from "./Button.types";
import s from "./Button.module.css";

const ButtonGroup = (props: T.GroupProps) => {
	const { children, className, attributes } = props;
	const groupClassNames = classNames(s.group, className);

	return (
		<div {...attributes} className={groupClassNames} role="group">
			{children}
		</div>
	);
};

export default ButtonGroup;
