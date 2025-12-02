import Badge from "./Badge";
import BadgeContainer from "./BadgeContainer";

const BadgeRoot = Badge as typeof Badge & {
	Container: typeof BadgeContainer;
};

BadgeRoot.Container = BadgeContainer;

export default BadgeRoot;
export type { Props as BadgeProps } from "./Badge.types";
