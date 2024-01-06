import { classNames } from "utilities/helpers";
import View from "components/View";
import type * as T from "./Container.types";
import s from "./Container.module.css";

const Container = (props: T.Props) => {
	const { children, padding = 4, width, className, attributes } = props;
	const rootClassNames = classNames(s.root, className);

	return (
		<View
			attributes={attributes}
			className={rootClassNames}
			paddingInline={padding}
			width={width}
			maxWidth="100%"
		>
			{children}
		</View>
	);
};

export default Container;
