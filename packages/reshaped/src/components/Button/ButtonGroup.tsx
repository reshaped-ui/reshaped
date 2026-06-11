import { classNames } from "@reshaped/utilities";

import type * as T from "./Button.types";
import s from "./Button.module.css";

const ButtonGroup: React.FC<T.GroupProps> = (props) => {
	const { children, className, attributes } = props;
	const groupClassNames = classNames(s.group, className);

	return (
		// oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
		<div {...attributes} className={groupClassNames} role="group">
			{children}
		</div>
	);
};

ButtonGroup.displayName = "Button.Group";

export default ButtonGroup;
