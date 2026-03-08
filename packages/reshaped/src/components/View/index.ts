import View, { ViewItem } from "./View";

const ViewRoot = View as typeof View & {
	Item: typeof ViewItem;
};

ViewRoot.Item = ViewItem;

export default ViewRoot;
export type { ItemProps as ViewItemProps, Props as ViewProps } from "./View.types";
