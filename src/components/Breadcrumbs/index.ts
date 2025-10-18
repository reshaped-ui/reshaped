import Breadcrumbs from "./Breadcrumbs";
import BreadcrumbsItem from "./BreadcrumbsItem";
import type * as T from "./Breadcrumbs.types";

const BreadcrumbsRoot = Breadcrumbs as React.FC<T.Props> & {
	Item: typeof BreadcrumbsItem;
};

BreadcrumbsRoot.Item = BreadcrumbsItem;

export default BreadcrumbsRoot;
export type { Props as BreadcrumbsProps } from "./Breadcrumbs.types";
