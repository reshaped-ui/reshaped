import View, { ViewItem } from "./View";

const ViewRoot = View as typeof View & {
	Item: typeof ViewItem;
};

ViewRoot.Item = ViewItem;

export default ViewRoot;
export type { Props as ViewProps, ItemProps as ViewItemProps } from "./View.types";
