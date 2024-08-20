import type { TextFieldProps } from "components/TextField";
import type { MenuItemProps } from "components/MenuItem";
import type { DropdownMenuProps, DropdownMenuInstance } from "components/DropdownMenu";

export type Props = TextFieldProps &
	Pick<DropdownMenuProps, "containerRef" | "instanceRef"> & {
		onInput?: TextFieldProps["onChange"];
		onItemSelect?: (args: { value: string }) => void;
		onBackspace?: () => void;
		children: React.ReactNode;
	};

export type ItemProps = MenuItemProps & { value: string };

export type Context = {
	onItemClick: (args: { value: string }) => void;
};

export type Instance = DropdownMenuInstance;
