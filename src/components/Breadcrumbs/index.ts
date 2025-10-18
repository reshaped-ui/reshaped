import Breadcrumbs from "./Breadcrumbs";
import BreadcrumbsItem from "./BreadcrumbsItem";

const BreadcrumbsRoot = Breadcrumbs as typeof Breadcrumbs & {
	Item: typeof BreadcrumbsItem;
};

BreadcrumbsRoot.Item = BreadcrumbsItem;

export default BreadcrumbsRoot;
export type { Props as BreadcrumbsProps } from "./Breadcrumbs.types";
