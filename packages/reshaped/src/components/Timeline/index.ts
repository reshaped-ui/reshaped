import Timeline, { TimelineItem } from "./Timeline";

const TimelineRoot = Timeline as typeof Timeline & {
	Item: typeof TimelineItem;
};

TimelineRoot.Item = TimelineItem;

export default TimelineRoot;
export type { ItemProps as TimelineItemProps, Props as TimelineProps } from "./Timeline.types";
