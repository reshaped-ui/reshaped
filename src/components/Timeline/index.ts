import Timeline, { TimelineItem } from "./Timeline";

const TimelineRoot = Timeline as typeof Timeline & {
	Item: typeof TimelineItem;
};

TimelineRoot.Item = TimelineItem;

export default TimelineRoot;
export type { Props as TimelineProps, ItemProps as TimelineItemProps } from "./Timeline.types";
