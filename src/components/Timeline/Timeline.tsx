import React from "react";
import { classNames } from "utilities/props";
import View from "components/View";
import type * as T from "./Timeline.types";
import s from "./Timeline.module.css";

const TimelineItem: React.FC<T.ItemProps> = (props) => {
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

const Timeline: React.FC<T.Props> & {
	Item: typeof TimelineItem;
} = (props) => {
	const { children, className, attributes } = props;
	const rootClassNames = classNames(className);

	return (
		<ul {...attributes} className={rootClassNames}>
			{React.Children.map(children, (child, index) => {
				return React.isValidElement(child) && child.type === TimelineItem ? (
					child
				) : (
					<TimelineItem key={index}>{child}</TimelineItem>
				);
			})}
		</ul>
	);
};

Timeline.Item = TimelineItem;

Timeline.displayName = "Timeline";
TimelineItem.displayName = "Timeline.Item";

export default Timeline;
