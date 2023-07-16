import type { TextFieldProps } from "components/TextField";
import type { MenuItemProps } from "components/MenuItem";

export type Props = TextFieldProps & {
	onItemSelect?: (args: { value: string }) => void;
	children: React.ReactNode;
};

export type ItemProps = MenuItemProps & { value: string };

export type Context = {
	onItemClick: (args: { value: string }) => void;
};
