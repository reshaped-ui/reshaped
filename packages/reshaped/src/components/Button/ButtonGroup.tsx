import { classNames } from "utilities/props";

import s from "./Button.module.css";

import type * as T from "./Button.types";

const ButtonGroup: React.FC<T.GroupProps> = (props) => {
	const { children, className, attributes } = props;
	const groupClassNames = classNames(s.group, className);

	return (
		<div {...attributes} className={groupClassNames} role="group">
			{children}
		</div>
	);
};

ButtonGroup.displayName = "Button.Group";

export default ButtonGroup;
