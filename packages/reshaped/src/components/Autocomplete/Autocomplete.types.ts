import type { DropdownMenuInstance, DropdownMenuProps } from "@/components/DropdownMenu";
import type { MenuItemProps } from "@/components/MenuItem";
import type { TextFieldProps } from "@/components/TextField";
import type * as G from "@/types/global";

type SelectArgs = {
	/** Value passed to onChange and onItemSelect when the item is selected.
	 * The field only displays it when its value is controlled and updated in onChange
	 */
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
		| "onAfterOpen"
		| "onAfterClose"
		| "fallbackAdjustLayout"
		| "fallbackMinHeight"
		| "contentMaxHeight"
		| "contentZIndex"
	> & {
		/** Callback for when value changes from user input. It's not called when an item is selected,
		 * while onChange is called both for the user input and for the item selection
		 */
		onInput?: G.ChangeHandler<string, React.InputEvent<HTMLInputElement>>;
		/** Callback for when an item is selected in the dropdown, called after onChange with the value and data of the item */
		onItemSelect?: (args: SelectArgs) => void;
		/** Callback for when the backspace key is pressed while the input is focused, also called while the input has a value.
		 * Can be used to remove the last selected item rendered in startSlot once the input is empty
		 */
		onBackspace?: () => void;
		/** Callback for when the enter key is pressed while the input is focused.
		 * When an item is highlighted, which is the first item by default, it gets selected before the callback is called
		 */
		onEnter?: () => void;
		/** Slot for rendering the Autocomplete.Item components. Items are not filtered automatically, render only the items
		 * matching the current value. The dropdown is not displayed when there are no children
		 */
		children: React.ReactNode;
	};

export type ItemProps = Omit<MenuItemProps, "focusIndicator"> & SelectArgs;

export type Context = {
	disabled: boolean;
	onItemClick: (args: SelectArgs) => void;
	highlightedId?: string;
	setHighlightedId: (value?: string) => void;
};

export type Instance = DropdownMenuInstance;
