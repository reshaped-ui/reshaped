import type { DropdownMenuInstance, DropdownMenuProps } from "@/components/DropdownMenu";

export type Instance = DropdownMenuInstance;
export type Props = Omit<DropdownMenuProps, "active" | "defaultActive">;
