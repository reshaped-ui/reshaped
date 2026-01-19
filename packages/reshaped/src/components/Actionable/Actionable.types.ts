import type { ActionableProps as UnstyledActionableProps } from "@reshaped/headless";

export type Props = UnstyledActionableProps & {
	/** Enable a minimum required touch hitbox */
	touchHitbox?: boolean;
	/** Take up the full width of its parent */
	fullWidth?: boolean;
	/** Enable a focus ring inside the element bounds */
	insetFocus?: boolean;
	/** Don't show a focus ring on focus, can be used when it is within a container with a focus ring */
	disableFocusRing?: boolean;
	/** Apply the focus ring to the child and rely on its border radius */
	borderRadius?: "inherit";
};
