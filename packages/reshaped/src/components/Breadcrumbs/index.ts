import Breadcrumbs from "./Breadcrumbs.js";
import BreadcrumbsItem from "./BreadcrumbsItem.js";

const BreadcrumbsRoot = Breadcrumbs as typeof Breadcrumbs & {
	Item: typeof BreadcrumbsItem;
};

BreadcrumbsRoot.Item = BreadcrumbsItem;

export default BreadcrumbsRoot;
export type { Props as BreadcrumbsProps } from "./Breadcrumbs.types.js";
