import type React from "react";

import type { DropdownMenuInstance, DropdownMenuProps } from "@/components/DropdownMenu";

export type Instance = DropdownMenuInstance;
export type Props = Omit<
	DropdownMenuProps,
	"active" | "defaultActive" | "onOpen" | "disableHideAnimation"
> & {
	/** Disable the menu hide animation, matching the native context menu behavior
	 * @default true
	 */
	disableHideAnimation?: boolean;
	/** Element that opens the menu on right click, used when it's rendered outside of the ContextMenu.
	 * By default the menu is opened by a right click on any of the ContextMenu children
	 */
	triggerRef?: React.RefObject<HTMLElement | null>;
	/** Callback when the menu is opened, receives the contextmenu event that opened it */
	onOpen?: (args: { event: MouseEvent }) => void;
};
