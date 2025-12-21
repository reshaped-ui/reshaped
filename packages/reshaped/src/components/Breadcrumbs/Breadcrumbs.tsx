"use client";

import React from "react";

import Button from "components/Button";
import Icon from "components/Icon";
import Text from "components/Text";
import View from "components/View";
import IconChevronRight from "icons/ChevronRight";
import IconDotsHorizontal from "icons/DotsHorizontal";
import { classNames } from "utilities/props";

import * as T from "./Breadcrumbs.types";

const Breadcrumbs: React.FC<T.Props> = (props) => {
	const {
		children,
		separator,
		color,
		defaultVisibleItems,
		expandAriaLabel,
		disableExpand,
		ariaLabel,
		className,
		attributes,
	} = props;
	const visibleItems = defaultVisibleItems && defaultVisibleItems >= 2 ? defaultVisibleItems : null;
	const [expanded, setExpanded] = React.useState(false);
	const rootClassNames = classNames(className);
	const childrenLength = React.Children.count(children);
	let renderIndex = 0;

	const handleExpand = () => {
		setExpanded(true);
	};

	return (
		<nav
			{...attributes}
			aria-label={ariaLabel || attributes?.["aria-label"]}
			className={rootClassNames}
		>
			<View as="ol" direction="row" gap={2} align="center">
				{React.Children.map(children, (child, index) => {
					if (!child) return null;

					const lastCollapsedIndex = childrenLength - (visibleItems || 0);
					const isBeforeCollapse = renderIndex === 0;
					const isAfterCollapse = renderIndex > lastCollapsedIndex;
					const isDisplayed = !visibleItems || isBeforeCollapse || isAfterCollapse || expanded;
					const isCollapseButton = renderIndex === lastCollapsedIndex;
					// eslint-disable-next-line react-hooks/immutability
					renderIndex += 1;

					let itemNode = null;

					if (isDisplayed) {
						itemNode = child;
					} else if (isCollapseButton) {
						itemNode = disableExpand ? (
							<Icon svg={IconDotsHorizontal} size={4} />
						) : (
							<Button.Aligner>
								<Button
									variant="ghost"
									size="small"
									icon={IconDotsHorizontal}
									onClick={handleExpand}
									attributes={{ "aria-label": expandAriaLabel }}
								/>
							</Button.Aligner>
						);
					}

					if (itemNode === null) return null;

					return (
						<View as="li" key={index} gap={2} direction="row" align="center">
							{index > 0 && (isDisplayed || isCollapseButton) && (
								<Text color="neutral-faded">
									{separator || <Icon svg={IconChevronRight} size={3} />}
								</Text>
							)}
							<Text variant="body-3" color={color === "primary" ? "primary" : "neutral-faded"}>
								{itemNode}
							</Text>
						</View>
					);
				})}
			</View>
		</nav>
	);
};

Breadcrumbs.displayName = "Breadcrumbs";

export default Breadcrumbs;
