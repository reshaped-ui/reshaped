import Badge from "./Badge";
import BadgeContainer from "./BadgeContainer";
import type * as T from "./Badge.types";

const BadgeRoot = Badge as unknown as React.FC<T.Props> & {
	Container: typeof BadgeContainer;
};

BadgeRoot.Container = BadgeContainer;

export default BadgeRoot;
export type { Props as BadgeProps } from "./Badge.types";
