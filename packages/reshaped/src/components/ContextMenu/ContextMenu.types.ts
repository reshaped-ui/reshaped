import type React from "react";

import type { DropdownMenuInstance, DropdownMenuProps } from "@/components/DropdownMenu";

export type Instance = DropdownMenuInstance;
export type Props = Omit<DropdownMenuProps, "active" | "defaultActive" | "onOpen"> & {
	/** Element that opens the menu on right click, used when it's rendered outside of the ContextMenu */
	triggerRef?: React.RefObject<HTMLElement | null>;
	/** Callback when the menu is opened, receives the contextmenu event that opened it */
	onOpen?: (args: { event: MouseEvent }) => void;
};
