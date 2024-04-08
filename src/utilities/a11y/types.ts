/**
 * dialog: Completely trap the focus inside for tab navigation until content is closed
 * example: Modal
 *
 * action-menu: Trap the arrow navigation, while tab moves the focus to
 * the next element on the page after the trigger
 * example: Dropdown Menu
 *
 * content-menu: Include dropdown content into the tab navigation flow and move the focus to
 * the next element on the page after the trigger after navigation through the trapped content
 * example: Header navigation dropdowns
 *
 * selection-menu: Keep the focus on the trigger and enable arrow key navigation with pseudo focusing with data-attributes
 * without moving the focus away from the trigger
 * example: Autocomplete
 */
export type TrapMode = "dialog" | "action-menu" | "content-menu" | "selection-menu";

export type FocusableElement = HTMLButtonElement | HTMLInputElement;
