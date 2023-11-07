import BreadcrumbsInternal from "./Breadcrumbs";
import BreadcrumbsItem from "./BreadcrumbsItem";

// Compound components throw errors in Next.js RSC client component so we keep it in the index file for now
type CompoundComponent = typeof Breadcrumbs & { Item: typeof BreadcrumbsItem };
const Breadcrumbs = BreadcrumbsInternal;
(Breadcrumbs as CompoundComponent).Item = BreadcrumbsItem;

export type { Props as BreadcrumbsProps } from "./Breadcrumbs.types";
export default Breadcrumbs as CompoundComponent;
