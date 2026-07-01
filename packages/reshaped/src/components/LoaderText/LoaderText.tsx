import { classNames } from "@reshaped/utilities";

import Text from "@/components/Text";
import Icon from "../Icon";
import type * as T from "./LoaderText.types";
import s from "./LoaderText.module.css";

const LoaderText: React.FC<T.Props> = (props) => {
	const { children, completedText, icon, completed = false, className, ...textProps } = props;

	return (
		<Text
			color="neutral-faded"
			className={[s.root, className, !completed && s["--loading"]]}
			{...textProps}
		>
			{icon && <Icon svg={icon} />}
			<span className={s.container}>
				<span className={classNames(s.text, completed && !!completedText && s["--hidden"])}>
					{children}
				</span>
				{completedText && (
					<span className={classNames(s.completedText, !completed && s["--hidden"])}>
						{completedText}
					</span>
				)}
			</span>
		</Text>
	);
};

LoaderText.displayName = "LoaderText";

export default LoaderText;
