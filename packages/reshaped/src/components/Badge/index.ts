import Badge from "./Badge.js";
import BadgeContainer from "./BadgeContainer.js";

const BadgeRoot = Badge as typeof Badge & {
	Container: typeof BadgeContainer;
};

BadgeRoot.Container = BadgeContainer;

export default BadgeRoot;
export type { Props as BadgeProps } from "./Badge.types.js";
