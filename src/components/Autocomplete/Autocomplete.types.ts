import type { TextFieldProps } from "components/TextField";
import type { MenuItemProps } from "components/MenuItem";
import type { DropdownMenuProps, DropdownMenuInstance } from "components/DropdownMenu";

type SelectArgs = { value: string; data?: unknown };

export type Props = TextFieldProps &
	Pick<DropdownMenuProps, "containerRef" | "instanceRef" | "active" | "onOpen" | "onClose"> & {
		onInput?: TextFieldProps["onChange"];
		onItemSelect?: (args: SelectArgs) => void;
		onBackspace?: () => void;
		onEnter?: () => void;
		children: React.ReactNode;
	};

export type ItemProps = MenuItemProps & SelectArgs;

export type Context = {
	onItemClick: (args: SelectArgs) => void;
};

export type Instance = DropdownMenuInstance;
