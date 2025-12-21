import View from "components/View";
import { classNames } from "utilities/props";

import s from "./Skeleton.module.css";
import * as T from "./Skeleton.types";

const Skeleton: React.FC<T.Props> = (props) => {
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
