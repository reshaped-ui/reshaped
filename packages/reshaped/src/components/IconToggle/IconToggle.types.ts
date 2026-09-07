import type { IconProps } from "@/components/Icon";

export type Props = IconProps & {
	/** Identity of the currently rendered icon, animating the change whenever it changes */
	id?: string | number | boolean;
};
