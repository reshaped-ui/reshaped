/**
 * dialog: Completely trap the focus inside for tab navigation until content is closed
 * example: Modal
 *
 * action-menu: Trap the arrow navigation, while tab moves the focus to
 * the next element on the page after the trigger
 * example: Dropdown Menu
 *
 * action-bar: Same as action-menu but with horizontal keyboard arrow navigation
 *
 * content-menu: Include dropdown content into the tab navigation flow and move the focus to
 * the next element on the page after the trigger after navigation through the trapped content
 * example: Header navigation dropdowns
 *
 * selection-menu: Keep the focus on the trigger and enable arrow key navigation with pseudo focusing with data-attributes
 * without moving the focus away from the trigger
 * example: Autocomplete
 */
export type TrapMode = "dialog" | "action-menu" | "action-bar" | "content-menu" | "selection-menu";

export type FocusableElement = HTMLButtonElement | HTMLInputElement;

export type FocusableOptions = {
	additionalElement?: FocusableElement | null;
	includeNegativeTabIndex?: boolean;
};
