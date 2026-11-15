import type { IconProps } from "@/components/Icon";

export type Props = IconProps & {
	/** Identity of the currently rendered icon, animating the change whenever it changes.
	 * Changing `svg` without changing the `id` replaces the icon without an animation
	 */
	id?: string | number | boolean;
};
