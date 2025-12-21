import React, { isValidElement } from "react";

import View from "components/View";
import { classNames } from "utilities/props";

import s from "./Timeline.module.css";

import type * as T from "./Timeline.types";

export const TimelineItem: React.FC<T.ItemProps> = (props) => {
	const { children, markerSlot, className, attributes } = props;
	const hasMarker = markerSlot !== null;
	const itemClassNames = classNames(s.item, !hasMarker && s["item--full-width"], className);

	return (
		<View
			as="li"
			direction="row"
			align="stretch"
			gap={3}
			attributes={attributes}
			className={itemClassNames}
		>
			{hasMarker && <span className={s.marker}>{markerSlot}</span>}
			<View.Item grow>{children}</View.Item>
		</View>
	);
};

const Timeline: React.FC<T.Props> = (props) => {
	const { children, className, attributes } = props;
	const rootClassNames = classNames(className);

	return (
		<ul {...attributes} className={rootClassNames}>
			{React.Children.map(children, (child, index) => {
				return isValidElement(child) && child.type === TimelineItem ? (
					child
				) : (
					<TimelineItem key={index}>{child}</TimelineItem>
				);
			})}
		</ul>
	);
};

Timeline.displayName = "Timeline";
TimelineItem.displayName = "Timeline.Item";

export default Timeline;
