import { classNames } from "utilities/props";
import View from "components/View";
import type * as T from "./Container.types";
import s from "./Container.module.css";

const Container: React.FC<T.Props> = (props) => {
	const {
		children,
		padding = 4,
		width,
		align,
		justify,
		height,
		maxHeight,
		className,
		attributes,
	} = props;
	const rootClassNames = classNames(s.root, className);

	return (
		<View
			attributes={attributes}
			className={rootClassNames}
			paddingInline={padding}
			align={align}
			justify={justify}
			height={height}
			maxHeight={maxHeight}
			width={width}
			maxWidth="100%"
		>
			{children}
		</View>
	);
};

Container.displayName = "Container";

export default Container;
