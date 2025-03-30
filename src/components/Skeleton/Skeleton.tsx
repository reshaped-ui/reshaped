import { classNames } from "utilities/helpers";
import View from "components/View";
import * as T from "./Skeleton.types";
import s from "./Skeleton.module.css";

const Skeleton = (props: T.Props) => {
	const { borderRadius = "small", width, height, className, attributes } = props;
	const rootClassNames = classNames(s.root, className);

	return (
		<View
			backgroundColor="disabled"
			width={width}
			height={height}
			borderRadius={borderRadius}
			className={rootClassNames}
			attributes={attributes}
		/>
	);
};

Skeleton.displayName = "Skeleton";

export default Skeleton;
