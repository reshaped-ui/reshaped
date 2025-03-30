import Text from "components/Text";
import Link from "components/Link";
import type * as T from "./Breadcrumbs.types";

const BreadcrumbsItem = (props: T.ItemProps) => {
	const { children, onClick, href, icon, disabled } = props;

	if (!href && !onClick && !disabled) {
		return (
			<Text variant="body-3" weight="medium" color="neutral">
				{children}
			</Text>
		);
	}

	return (
		<Link
			onClick={onClick}
			href={href}
			icon={icon}
			disabled={disabled}
			variant="plain"
			color="inherit"
		>
			{children}
		</Link>
	);
};

BreadcrumbsItem.displayName = "Breadcrumbs.Item";

export default BreadcrumbsItem;
