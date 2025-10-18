import View, { ViewItem } from "./View";
import type * as T from "./View.types";

const ViewRoot = View as React.FC<T.Props> & {
	Item: typeof ViewItem;
};

ViewRoot.Item = ViewItem;

export default ViewRoot;
export type { Props as ViewProps, ItemProps as ViewItemProps } from "./View.types";
