import type { DropdownMenuInstance, DropdownMenuProps } from "@/components/DropdownMenu/index.js";
import type { MenuItemProps } from "@/components/MenuItem/index.js";
import type { TextFieldProps } from "@/components/TextField/index.js";
import type * as G from "@/types/global.js";

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
		| "onAfterOpen"
		| "onAfterClose"
		| "fallbackAdjustLayout"
		| "fallbackMinHeight"
		| "contentMaxHeight"
		| "contentZIndex"
	> & {
		/** Callback for when value changes from user input */
		onInput?: G.ChangeHandler<string, React.InputEvent<HTMLInputElement>>;
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
