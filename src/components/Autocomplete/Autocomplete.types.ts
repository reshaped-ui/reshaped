import type { DropdownMenuProps, DropdownMenuInstance } from "components/DropdownMenu";
import type { MenuItemProps } from "components/MenuItem";
import type { TextFieldProps } from "components/TextField";

type SelectArgs = {
	/** Value that will be passed to the input on selection */
	value: string;
	/** Additional data that will be passed to the onItemSelect callback */
	data?: unknown;
};

export type Props = TextFieldProps &
	Pick<
		DropdownMenuProps,
		| "containerRef"
		| "instanceRef"
		| "active"
		| "onOpen"
		| "onClose"
		| "fallbackAdjustLayout"
		| "fallbackMinWidth"
		| "fallbackMinHeight"
		| "contentMaxHeight"
	> & {
		/** Callback for when value changes from user input */
		onInput?: TextFieldProps["onChange"];
		/** Callback for when an item is selected in the dropdown */
		onItemSelect?: (args: SelectArgs) => void;
		/** Callback for when the backspace key is pressed while the input is focused */
		onBackspace?: () => void;
		/** Callback for when the enter key is pressed while the input is focused */
		onEnter?: () => void;
		/** Slot for rendering the Autocomplete.Item components */
		children: React.ReactNode;
	};

export type ItemProps = MenuItemProps & SelectArgs;

export type Context = {
	onItemClick: (args: SelectArgs) => void;
	highlightedId?: string;
	setHighlightedId: (value?: string) => void;
};

export type Instance = DropdownMenuInstance;
