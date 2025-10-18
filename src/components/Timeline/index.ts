import Timeline, { TimelineItem } from "./Timeline";
import type * as T from "./Timeline.types";

const TimelineRoot = Timeline as React.FC<T.Props> & {
	Item: typeof TimelineItem;
};

TimelineRoot.Item = TimelineItem;

export default TimelineRoot;
export type { Props as TimelineProps, ItemProps as TimelineItemProps } from "./Timeline.types";
